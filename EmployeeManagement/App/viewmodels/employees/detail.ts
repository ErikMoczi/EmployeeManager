import system = require('durandal/system');
import app = require('durandal/app');

import logger from 'services/logger';
import { Employee as EmployeeModel } from 'models/employee';
import { Position as PositionModel } from 'models/position';
import { BaseEmployee } from "./BaseEmployee";
import { PositionRepository } from "../../repositories/PositionRepository";

class EmployeeDetail extends BaseEmployee {
    private _employee: KnockoutObservable<EmployeeModel>;
    private _positionRepository: PositionRepository;
    private _positions: KnockoutObservableArray<PositionModel>;
    private _positionName: KnockoutObservable<string>;

    public get Employee(): KnockoutObservable<EmployeeModel> {
        return this._employee;
    }

    public get Positions(): KnockoutObservableArray<PositionModel> {
        return this._positions;
    }

    public get PositionName(): KnockoutObservable<string> {
        return this._positionName;
    }

    constructor() {
        super();
        this._employee = ko.observable();
        this._positionRepository = new PositionRepository();        
        this._positions = ko.observableArray([]);
        this._positionName = ko.observable();      
    }

    public activate = (employeeId: number): DurandalPromise<any> => {
        return system.defer(
            (dfd: DurandalDeferred<any>): void => {
                this._employee(new EmployeeModel());
                dfd.resolve(this.loadPositions());
                dfd.resolve(this.loadEmployee(employeeId));
            }
        ).promise();
    }

    public update = (employee: EmployeeModel): void => {
        let promise: DurandalPromise<any> = this.EmployeeRepository.update(employee);

        promise.then(
            (response: any): void => {
                logger.logSuccess('Employee ' + employee.FullName + ' updated', employee, system.getModuleId(this));
                this.navEmployees();                
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
                let data: EmployeeModel = new EmployeeModel().fillData(response);

                this._employee(data);
                logger.logInfo('Retrieved Employee ' + data.FullName, data, system.getModuleId(this));
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading data', error, system.getModuleId(this));
            }
        );
    }
}

export = new EmployeeDetail();