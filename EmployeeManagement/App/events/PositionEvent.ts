import { BaseEvent } from "./BaseEvent";

export class PositionEvent extends BaseEvent {
    protected baseObject(): string {
        return 'position';
    }
}

export default new PositionEvent();