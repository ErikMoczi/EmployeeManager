import * as moment from "moment";
import system = require('durandal/system');
import app = require('durandal/app');

import { BaseModel } from './baseModel';
import { Position as PositionModel } from "./Position";
import { IRawEmployee } from './raw/IRawEmployee';
import { EmployeePosition } from "./EmployeePosition";

export class Employee extends BaseModel<IRawEmployee>{
    public Id: KnockoutObservable<number>;
    public Name: KnockoutObservable<string>;
    public Surname: KnockoutObservable<string>;
    public Address: KnockoutObservable<string>;
    public BirthDate: KnockoutObservable<Date>;
    public EntryDate: KnockoutObservable<Date>;
    public Salary: KnockoutObservable<number>;
    public EmployeePositions: KnockoutObservableArray<EmployeePosition>;
    public NewPosition: KnockoutObservable<PositionModel>; 
    public ActiveEmployeePosition: KnockoutObservable<EmployeePosition>; 
    public NewEmployeePosition: KnockoutObservable<EmployeePosition>; 

    public get FullName(): string {
        return this.Name() + ' ' + this.Surname();
    }

    public get BirthDateFormated(): string {
        if (this.BirthDate()) {
            return moment(this.BirthDate()).format('YYYY-MM-DD');
        }

        return '';
    }

    public set BirthDateFormated(value: string) {
        if (value) {
            this.BirthDate(new Date(value));
        }
    }

    public get EntryDateFormated(): string {
        if (this.EntryDate()) {
            return moment(this.EntryDate()).format('YYYY-MM-DD');
        }

        return '';
    }

    public set EntryDateFormated(value: string) {
        if (value) {
            this.EntryDate(new Date(value));
        }
    }

    constructor() {
        super();
        this.Id = ko.observable();
        this.Name = ko.observable();
        this.Surname = ko.observable();
        this.Address = ko.observable();
        this.BirthDate = ko.observable();
        this.EntryDate = ko.observable();
        this.Salary = ko.observable();
        this.EmployeePositions = ko.observableArray([]);
        this.NewPosition = ko.observable(new PositionModel());
        this.ActiveEmployeePosition = ko.observable(new EmployeePosition());
        this.NewEmployeePosition = ko.observable(new EmployeePosition());
    }    

    public fillData(jsonData: any): this {
        this.Id(jsonData.Id);
        this.Name(jsonData.Name);
        this.Surname(jsonData.Surname);
        this.Address(jsonData.Address);

        if (jsonData.BirthDate) {
            this.BirthDate(new Date(jsonData.BirthDate));
        }

        if (jsonData.EntryDate) {
            this.EntryDate(new Date(jsonData.EntryDate));
        }

        this.Salary(jsonData.Salary);

        if (jsonData.EmployeePositions.length > 0) {
            let employeePositions: EmployeePosition[] = (ko.utils.arrayMap(jsonData.EmployeePositions, (currentItem: any): EmployeePosition => {
                return new EmployeePosition().fillData(currentItem);
            }));

            this.EmployeePositions(employeePositions);

            this.ActiveEmployeePosition(this.FindCurrentEmployeePosition(employeePositions));
        }

        return this;
    }

    public getRawData(): IRawEmployee {
        return {
            Id: this.Id(),
            Name: this.Name(),
            Surname: this.Surname(),
            Address: this.Address(),
            BirthDate: this.BirthDate(),
            EntryDate: this.EntryDate(),
            Salary: this.Salary()
        }
    }

    private FindCurrentEmployeePosition = (employeePositions: EmployeePosition[]): EmployeePosition | null => {
        return employeePositions.length > 0 ? employeePositions[employeePositions.length - 1] : null;
    }
}