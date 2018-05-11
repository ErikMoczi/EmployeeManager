import * as moment from "moment";

import { BaseModel } from './baseModel';
import { IRawEmployeePosition } from './raw/IRawEmployeePosition';
import { Position as PositionModel } from "./Position";

export class EmployeePosition extends BaseModel<IRawEmployeePosition>{
    public Id: KnockoutObservable<number>;
    public EmployeeId: KnockoutObservable<number>;
    public PositionId: KnockoutObservable<number>;
    public Position: KnockoutObservable<PositionModel>;
    public FromDate: KnockoutObservable<Date>;
    public ToDate?: KnockoutObservable<Date>;

    public get FromDateFormated(): string {
        if (this.FromDate()) {
            return moment(this.FromDate()).format('YYYY-MM-DD');
        }

        return '';
    }

    public set FromDateFormated(value: string) {
        if (value) {
            this.FromDate(new Date(value));
        }
    }

    public get ToDateFormated(): string {
        if (this.ToDate()) {
            return moment(this.ToDate()).format('YYYY-MM-DD');
        }

        return '';
    }

    public set ToDateFormated(value: string) {
        if (value) {
            this.ToDate(new Date(value));
        }        
    }

    constructor() {
        super();
        this.Id = ko.observable();
        this.EmployeeId = ko.observable();
        this.PositionId = ko.observable();
        this.Position = ko.observable();
        this.FromDate = ko.observable();
        this.ToDate = ko.observable();
    }

    public fillData(jsonData: any): this {
        this.Id(jsonData.Id);
        this.EmployeeId(jsonData.EmployeeId);
        this.PositionId(jsonData.PositionId);
        this.Position(new PositionModel().fillData(jsonData.Position));
        this.FromDate(new Date(jsonData.FromDate));
        if (jsonData.ToDate !== null) {
            this.ToDate(new Date(jsonData.ToDate));
        }

        return this;
    }

    public getRawData(): IRawEmployeePosition {
        return {
            Id: this.Id(),
            EmployeeId: this.EmployeeId(),
            PositionId: this.PositionId(),
            Position: this.Position(),
            FromDate: this.FromDate(),
            ToDate: this.ToDate()
        }
    }
}