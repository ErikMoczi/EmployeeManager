import { BaseEvent } from "./BaseEvent";

export class EmployeeEvent extends BaseEvent {
    protected baseObject(): string {
        return 'employee';
    }
}

export default new EmployeeEvent();