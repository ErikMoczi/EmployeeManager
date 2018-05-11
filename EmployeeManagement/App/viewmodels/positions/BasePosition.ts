import { PositionRepository } from 'repositories/positionRepository';
import { BaseViewModel } from 'viewmodels/BaseViewModel';

export abstract class BasePosition extends BaseViewModel {
    private _positionRepository: PositionRepository;

    protected get PositionRepository(): PositionRepository {
        return this._positionRepository
    }

    public constructor() {
        super();
        this._positionRepository = new PositionRepository();
    }

    public baseViewUrl(): string {
        return 'position';
    }

    public navPositions = (): void => {
        this.navigate(this.baseViewUrl());
    }
}