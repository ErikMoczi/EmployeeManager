import { IRawModel } from 'models/raw/IRawModel';

export interface IBaseModel<T extends IRawModel> {
    Id?: KnockoutObservable<number>;
    getRawData(): T,
    fillData(jsonData: any): void;
}