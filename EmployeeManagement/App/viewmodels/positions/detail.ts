import system = require('durandal/system');
import app = require('durandal/app');

import logger from 'services/logger';
import { Position as PositionModel } from 'models/position';
import { BasePosition } from "./BasePosition";
import PositionEvent from 'events/PositionEvent';

class PositionDetail extends BasePosition {
    private _position: KnockoutObservable<PositionModel>;

    public get Position(): KnockoutObservable<PositionModel> {
        return this._position;
    }

    constructor() {
        super();
        this._position = ko.observable();
    }

    public activate = (employeeId: number): DurandalPromise<any> => {
        return system.defer(
            (dfd: DurandalDeferred<any>): void => {
                this.loadData(employeeId);
                dfd.resolve(true);
            }
        ).promise();
    }

    public update = (position: PositionModel): void => {
        let promise: DurandalPromise<any> = this.PositionRepository.update(position);

        promise.then(
            (response: any): void => {
                logger.logSuccess('Position ' + position.Name() + ' updated', position, system.getModuleId(this));
                app.trigger(PositionEvent.update(), position);
                this.navPositions();
            },
            (error: any, message: string): void => {
                logger.logError('Problem with update', position, system.getModuleId(this));
            }
        );
    }

    private loadData = (id: number): DurandalPromise<any> => {
        return this.PositionRepository.getById(id).then(
            (response: any): void => {
                let data: PositionModel = new PositionModel().fillData(response);

                this._position(data);
                logger.logInfo('Retrieved Position ' + data.Name(), data, system.getModuleId(this));
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading data', error, system.getModuleId(this));
            }
        );
    }
}

export = new PositionDetail();