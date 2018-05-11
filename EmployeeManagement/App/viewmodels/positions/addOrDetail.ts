import system = require('durandal/system');
import app = require('durandal/app');

import logger from 'services/logger';
import { Position as PositionModel } from 'models/position';
import { BasePosition } from "./BasePosition";
import PositionEvent from 'events/PositionEvent';

class PositionAddDetail extends BasePosition {
    private _position: KnockoutObservable<PositionModel>;
    private _AddOrDetail: KnockoutObservable<boolean>;

    public get Position(): KnockoutObservable<PositionModel> {
        return this._position;
    }

    public get AddOrDetail(): KnockoutObservable<boolean> {
        return this._AddOrDetail;
    }

    constructor() {
        super();
        this._AddOrDetail = ko.observable(false);
        this._position = ko.observable();
    }

    public activate = (employeeId: number): DurandalPromise<any> => {
        return system.defer(
            (dfd: DurandalDeferred<any>): void => {
                if (employeeId && employeeId > 0) {
                    system.log('asdfasfdsdf');
                    this.loadData(employeeId);
                    this._AddOrDetail(true);
                }
                else {
                    this._position(new PositionModel());
                    this._AddOrDetail(false);
                }

                dfd.resolve();
            }
        ).promise();
    }

    public add = (position: PositionModel): void => {
        let promise: DurandalPromise<any> = this.PositionRepository.create(position);

        promise.then(
            (response: any): void => {
                logger.logSuccess('Position ' + position.Name() + ' created', position, system.getModuleId(this));
                app.trigger(PositionEvent.create(), new PositionModel().fillData(response));
                this.navPositions();
            },
            (error: any, message: string): void => {
                logger.logError('Problem with creating', position, system.getModuleId(this));
            }
        );
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
                this._position().fillData(response);
                logger.logInfo('Retrieved Position ' + this._position().Name(), this._position(), system.getModuleId(this));
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading data', error, system.getModuleId(this));
            }
        );
    }
}

export = new PositionAddDetail();