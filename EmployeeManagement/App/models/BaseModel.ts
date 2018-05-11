import http = require('plugins/http');

import { IBaseModel } from './interfaces/IBaseModel';
import { IRawModel } from './raw/IRawModel';

export abstract class BaseModel<T extends IRawModel> implements IBaseModel<T>{
    public Id?: KnockoutObservable<number>;

    public abstract getRawData(): T;    
    public abstract fillData(jsonData: any): this;

    public parseAndResolve = (jsonData: any): any => {
        let refMap: object = {};

        return JSON.parse(http.toJSON(jsonData), function (key: any, value: any) {
            if (key === '$id') {
                refMap[value] = this;

                return void (0);
            }

            if (value && value.$ref) {
                return refMap[value.$ref];
            }

            return value;
        });
    }    
}