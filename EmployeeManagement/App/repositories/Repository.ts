import http = require('plugins/http');

import { IRepository } from './interfaces/IRepository';
import { IRawModel } from '../models/raw/IRawModel';
import { BaseModel } from '../models/baseModel';

export abstract class Repository<B extends IRawModel, T extends BaseModel <B>> implements IRepository<B, T> {
    protected baseUrl: string = '/api';

    protected abstract specificUrl(): string;

    protected apiUrl(): string {
        return this.baseUrl + '/' + this.specificUrl();
    }

    public get(): DurandalPromise<any> {
        return http.get(this.apiUrl());
    }

    public getById(id: number): DurandalPromise<any> {
        return http.get(this.apiUrl() + '/' + id);
    }

    public update(model: T): DurandalPromise<any> {
        return http.put(this.apiUrl() + '/' + model.Id(), model.getRawData());
    }

    public create(model: T): DurandalPromise<any> {
        return http.post(this.apiUrl(), model.getRawData());
    }

    public delete(model: T): DurandalPromise<any> {
        return http.remove(this.apiUrl() + '/' + model.Id());
    }
}