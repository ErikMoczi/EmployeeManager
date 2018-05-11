import system = require('durandal/system');
import app = require('durandal/app');

import logger from 'services/logger';
import { Position as PositionModel } from 'models/position';
import { BasePosition } from "./BasePosition";
import PositionEvent from 'events/PositionEvent';

class PositionShow extends BasePosition {
    private _positions: KnockoutObservableArray<PositionModel>;
    private _newPositionSubscription: DurandalEventSubscription;
    private _updatePositionSubscription: DurandalEventSubscription;
    private _deletePositionSubscription: DurandalEventSubscription;

    public get Positions(): KnockoutObservableArray<PositionModel> {
        return this._positions;
    }

    constructor() {
        super();
        this._positions = ko.observableArray([]);

        this._newPositionSubscription = app.on(PositionEvent.create()).then(
            (position: PositionModel): void => {
                this.addNewPosition(position);
            },
            this
        );
        this._updatePositionSubscription = app.on(PositionEvent.update()).then(
            (position: PositionModel): void => {
                this.updateNewPosition(position);
            },
            this
        );
        this._deletePositionSubscription = app.on(PositionEvent.delete()).then(
            (position: PositionModel): void => {
                this.deleteNewPosition(position);
            },
            this
        );
    }

    public activate = (): DurandalPromise<any> => {
        return system.defer(
            (dfd: DurandalDeferred<any>): void => {
                if (this._positions().length > 0) {
                    dfd.resolve();
                    return null;
                }

                dfd.resolve(this.refresh());
            }
        ).promise();
    }

    public edit = (position: PositionModel): void => {
        if (position && position.Id()) {
            let url: string = this.baseViewUrl() + '/' + position.Id();
            this.navigate(url);
        }
    }

    public remove = (position: PositionModel): void => {
        if (position && position.Id()) {
            let promise: DurandalPromise<any> = this.PositionRepository.delete(position);

            promise.then(
                (responsePosition: PositionModel): void => {
                    logger.logSuccess('Position ' + position.Name() + ' deleted', position, system.getModuleId(this));
                    app.trigger(PositionEvent.delete(), position);
                },
                (error: any, message: string): void => {
                    logger.logError('Problem with delete ' + position.Name(), position, system.getModuleId(this));
                }
            );
        }
    }

    public refresh = (): DurandalPromise<any> => {
        return this.PositionRepository.get().then(
            (response: any): void => {
                let data: PositionModel[] = (ko.utils.arrayMap(response, (currentItem: any): PositionModel => {
                    return new PositionModel().fillData(currentItem);
                }));

                this._positions(data);
                logger.logInfo('Retrieved data', data, system.getModuleId(this));
            },
            (error: any, message: string): void => {
                logger.logError('Problem with loading data', error, system.getModuleId(this));
            }
        );
    }

    private addNewPosition = (position: PositionModel): void => {
        this._positions.push(position);
    }

    private updateNewPosition = (position: PositionModel): void => {
        let index: number = this._positions.indexOf(
            ko.utils.arrayFirst(ko.utils.unwrapObservable(this._positions), function (searchPosition: PositionModel) {
                return ko.utils.unwrapObservable(searchPosition.Id()) == position.Id();
            })
        );
        this._positions.replace(this._positions()[index], position);
    }

    private deleteNewPosition = (position: PositionModel): void => {
        this._positions.remove(position);
    }
}

export = new PositionShow();