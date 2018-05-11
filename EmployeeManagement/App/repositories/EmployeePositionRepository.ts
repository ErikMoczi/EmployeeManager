import { EmployeePosition as EmployeePositionModel } from 'models/EmployeePosition';
import { Repository } from './repository';
import { IRawEmployeePosition } from '../models/raw/IRawEmployeePosition';
import { IEmployeePositionRepository } from './interfaces/IEmployeePositionRepository';

export class EmployeePositionRepository extends Repository<IRawEmployeePosition, EmployeePositionModel> implements IEmployeePositionRepository {
    protected specificUrl(): string {
        return 'employeeposition';
    }
}