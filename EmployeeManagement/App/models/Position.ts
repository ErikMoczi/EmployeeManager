import { BaseModel } from './baseModel';
import { IRawPosition } from './raw/IRawPosition';

export class Position extends BaseModel<IRawPosition> {
    public Id: KnockoutObservable<number>;
    public Name: KnockoutObservable<string>;
    public EmployeePositions: KnockoutObservable<boolean>;

    constructor() {
        super();
        this.Id = ko.observable();
        this.Name = ko.observable();
        this.EmployeePositions = ko.observable(false);
    }

    public fillData(jsonData: any): this {
        this.Id(jsonData.Id);
        this.Name(jsonData.Name);

        if (jsonData.EmployeePositions.length > 0) {
            this.EmployeePositions(true);
        }

        return this;
    }

    public getRawData(): IRawPosition {
        return {
            Id: this.Id(),
            Name: this.Name()
        }
    }
}