import { Employee as EmployeeModel } from 'models/Employee';
import { Repository } from './repository';
import { IRawEmployee } from '../models/raw/IRawEmployee';
import { IEmployeeRepository } from './interfaces/IEmployeeRepository';

export class EmployeeRepository extends Repository<IRawEmployee, EmployeeModel> implements IEmployeeRepository {
    protected specificUrl(): string {
        return 'employee';
    }
}