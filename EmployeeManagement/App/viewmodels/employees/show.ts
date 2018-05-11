import system = require('durandal/system');
import app = require('durandal/app');

import logger from 'services/logger';
import { Employee as EmployeeModel } from 'models/employee';
import { BaseEmployee } from "./BaseEmployee";

class EmployeeShow extends BaseEmployee {
    private _employees: KnockoutObservableArray<EmployeeModel>;

    public get Employees(): KnockoutObservableArray<EmployeeModel> {
        return this._employees;
    }

    constructor() {
        super();
        this._employees = ko.observableArray([]);
    }

    public activate = (): DurandalPromise<any> => {
        return system.defer(
            (dfd: DurandalDeferred<any>): void => {
                dfd.resolve(this.refresh());
            }
        ).promise();
    }

    public edit = (employee: EmployeeModel): void => {
        if (employee && employee.Id()) {
            let url: string = this.baseViewUrl() + '/' + employee.Id();
            this.navigate(url);
        }
    }

    public remove = (employee: EmployeeModel): void => {
        if (employee && employee.Id()) {
            let promise: DurandalPromise<any> = this.EmployeeRepository.delete(employee);

            promise.then(
                (response: any): void => {
                    logger.logSuccess('Employee ' + employee.FullName + ' deleted', employee, system.getModuleId(this));
                    this.refresh();
                },
                (error: any, message: string): void => {
                    logger.logError('Problem with delete ' + employee.FullName, employee, system.getModuleId(this));
                }
            );
        }
    }

    public refresh = (): DurandalPromise<any> => {
        return this.EmployeeRepository.get().then(
            (response: any): void => {
                let data: EmployeeModel[] = (ko.utils.arrayMap(response, (currentItem: any): EmployeeModel => {
                    return new EmployeeModel().fillData(currentItem);
                }));

                this._employees(data);
                logger.logInfo('Retrieved data', data, system.getModuleId(this));
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading data', error, system.getModuleId(this));
            }
        );
    }
}

export = new EmployeeShow();