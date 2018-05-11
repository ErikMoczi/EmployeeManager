export abstract class BaseEvent {
    protected abstract baseObject(): string;
    public create = (): string => { return this.baseObject() + ':create'; }
    public update = (): string => { return this.baseObject() + ':update'; }
    public delete = (): string => { return this.baseObject() + ':delete'; }
}