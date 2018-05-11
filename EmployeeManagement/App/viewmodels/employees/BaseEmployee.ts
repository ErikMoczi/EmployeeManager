import { EmployeeRepository } from 'repositories/employeeRepository';
import { BaseViewModel } from 'viewmodels/BaseViewModel';

export class BaseEmployee extends BaseViewModel {
    private _employeeRepository: EmployeeRepository;

    protected get EmployeeRepository(): EmployeeRepository {
        return this._employeeRepository
    }

    public constructor() {
        super();
        this._employeeRepository = new EmployeeRepository();
    }

    public baseViewUrl(): string {
        return 'employee';
    }

    public navEmployees = (): void => {
        this.navigate(this.baseViewUrl());
    }
}