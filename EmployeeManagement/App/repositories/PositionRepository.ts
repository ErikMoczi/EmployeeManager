import { Repository } from './repository';
import { Position as PositionModel } from '../models/Position';
import { IRawPosition } from '../models/raw/IRawPosition';
import { IPositionRepository } from './interfaces/IPositionRepository';

export class PositionRepository extends Repository<IRawPosition, PositionModel> implements IPositionRepository {
    protected specificUrl(): string {
        return 'position';
    }
}