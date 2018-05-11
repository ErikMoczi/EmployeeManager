import { IRawModel } from './IRawModel';

export interface IRawEmployee extends IRawModel{
    Id?: number;
    Name: string;
    Surname: string;
    Address: string;
    BirthDate: Date;
    EntryDate: Date;
    Salary: number;
}