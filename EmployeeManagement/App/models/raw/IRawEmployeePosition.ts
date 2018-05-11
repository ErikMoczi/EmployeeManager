import { IRawModel } from './IRawModel';
import { Position as PositionModel } from '../Position';

export interface IRawEmployeePosition extends IRawModel {
    Id?: number;
    EmployeeId: number;
    PositionId: number;
    Position: PositionModel;
    FromDate: Date;
    ToDate?: Date;
}