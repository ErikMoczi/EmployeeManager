import { BaseModel } from "../../models/baseModel";
import { IRawModel } from "../../models/raw/IRawModel";

export interface IRepository<B extends IRawModel, T extends BaseModel<B>> {
    get(): DurandalPromise<T[]>;
    getById(id: number): DurandalPromise<T>;
    update(model: T): DurandalPromise<T>;
    create(model: T): DurandalPromise<T>;
    delete(model: T): DurandalPromise<T>;
}