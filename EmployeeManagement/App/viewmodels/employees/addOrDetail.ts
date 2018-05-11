import system = require('durandal/system');
import app = require('durandal/app');

import logger from 'services/logger';
import { Employee as EmployeeModel } from 'models/employee';
import { Position as PositionModel } from 'models/position';
import { EmployeePosition as EmployeePositionModel } from 'models/EmployeePosition';
import { BaseEmployee } from "./BaseEmployee";
import { PositionRepository } from "../../repositories/PositionRepository";
import { EmployeePositionRepository } from "../../repositories/EmployeePositionRepository";

class EmployeeAddDetail extends BaseEmployee {
    private _employee: KnockoutObservable<EmployeeModel>;
    private _positionRepository: PositionRepository;
    private _positionEmployeeRepository: EmployeePositionRepository;
    private _positions: KnockoutObservableArray<PositionModel>;
    private _newPosition: KnockoutObservable<PositionModel>;
    private _AddOrDetail: KnockoutObservable<boolean>;

    public get Employee(): KnockoutObservable<EmployeeModel> {
        return this._employee;
    }

    public get Positions(): KnockoutObservableArray<PositionModel> {
        return this._positions;
    }

    public get NewPosition(): KnockoutObservable<PositionModel> {
        return this._newPosition;
    }

    public get AddOrDetail(): KnockoutObservable<boolean> {
        return this._AddOrDetail;
    }

    constructor() {
        super();
        this._employee = ko.observable();
        this._positionRepository = new PositionRepository();        
        this._positionEmployeeRepository = new EmployeePositionRepository();        
        this._positions = ko.observableArray([]);
        this._newPosition = ko.observable(new PositionModel());      
        this._AddOrDetail = ko.observable(false);
    }

    public activate = (employeeId: number): DurandalPromise<any> => {
        return system.defer(
            (dfd: DurandalDeferred<any>): void => {
                let initEmployee: EmployeeModel = new EmployeeModel();
                initEmployee.NewEmployeePosition().FromDate(new Date());
                this._employee(initEmployee);

                if (employeeId && employeeId > 0) {
                    dfd.resolve(this.loadEmployee(employeeId));
                    this._AddOrDetail(true);
                }
                else {
                    this._AddOrDetail(false);
                }
                
                dfd.resolve(this.loadPositions());
            }
        ).promise();        
    }

    public add = (employee: EmployeeModel): void => {
        let promise: DurandalPromise<any> = this.EmployeeRepository.create(employee);

        promise.then(
            (response: any): void => {
                let employeeId: number = response.Id;

                system.defer((dfd: DurandalDeferred<any>): void => {
                    dfd.resolve(this.createNewEmployeePosition(employee, employeeId));
                }).then(
                    (response: any): void => {
                        logger.logSuccess('Employee ' + employee.FullName + ' created', employee, system.getModuleId(this));
                        this.navEmployees();
                    },
                    (error: any, message: string): void => {
                        logger.logError('Problem with creating reference', message, system.getModuleId(this));
                    }
                );
            },
            (error: any, message: string): void => {
                logger.logError('Problem with creating', employee, system.getModuleId(this));
            }
        );
    }   

    public update = (employee: EmployeeModel): void => {
        let promise: DurandalPromise<any> = this.EmployeeRepository.update(employee);

        promise.then(
            (response: any): void => {
                let employeeId: number = response.Id;

                system.defer((dfd: DurandalDeferred<any>): void => {
                    dfd.resolve(this.createNewEmployeePosition(employee, employeeId));
                }).then(
                    (response: any): void => {
                        logger.logSuccess('Employee ' + employee.FullName + ' updated', employee, system.getModuleId(this));
                        this.navEmployees();
                    },
                    (error: any, message: string): void => {
                        logger.logError('Problem with creating reference', message, system.getModuleId(this));
                    }
                    );
            },
            (error: any, message: string): void => {
                logger.logError('Problem with update', employee, system.getModuleId(this));
            }
        );
    }

    private loadPositions = (): DurandalPromise<any> => {
        return this._positionRepository.get().then(
            (response: any): void => {
                let data: PositionModel[] = (ko.utils.arrayMap(response, (currentItem: any): PositionModel => {
                    return new PositionModel().fillData(currentItem);
                }));

                this._positions(data);
                logger.logInfo('Retrieved position data', data, system.getModuleId(this), false);
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading positions', error, system.getModuleId(this));
            }
        );
    }

    private loadEmployee = (id: number): DurandalPromise<any> => {
        return this.EmployeeRepository.getById(id).then(
            (response: any): void => {
                this._employee().fillData(response);
                logger.logInfo('Retrieved Employee ' + this._employee().FullName, this._employee(), system.getModuleId(this));
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading data', error, system.getModuleId(this));
            }
        );
    }

    private createNewEmployeePosition = (employee: EmployeeModel, employeeId: number): DurandalPromise<any> => {
        let promise: DurandalPromise<any>;

        if (employee.NewPosition()) {
            let position: PositionModel = employee.NewPosition();
            let newEmployeePosition: EmployeePositionModel = new EmployeePositionModel();
            newEmployeePosition.EmployeeId(employeeId);
            newEmployeePosition.PositionId(position.Id());

            if (employee.NewEmployeePosition()) {
                let employeePosition: EmployeePositionModel = employee.NewEmployeePosition();
                newEmployeePosition.FromDate(employeePosition.FromDate());
                newEmployeePosition.ToDate(employeePosition.ToDate());
            }

            promise = this._positionEmployeeRepository.create(newEmployeePosition);
        }

        return promise;
    }
}

export = new EmployeeAddDetail();