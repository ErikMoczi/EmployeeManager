class AllDurandal<T> implements DurandalActivator<T> {
    [key: string]: any;
    settings: DurandalActivatorSettings;
    isActivating: KnockoutObservable<boolean>;
    canDeactivateItem(item: T, close: boolean): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    deactivateItem(item: T, close: boolean): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    canActivateItem(newItem: T, activationData?: any): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    activateItem(newItem: T, activationData?: any): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    canActivate(): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    activate(): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    canDeactivate(close: boolean): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    deactivate(close: boolean): DurandalPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    includeIn(includeIn: any): void {
        throw new Error("Method not implemented.");
    }
    forItems(items: any[]): DurandalActivator<T> {
        throw new Error("Method not implemented.");
    }
    fn: KnockoutComputedFunctions<any>;
    dispose(): void {
        throw new Error("Method not implemented.");
    }
    isActive(): boolean {
        throw new Error("Method not implemented.");
    }
    getDependenciesCount(): number {
        throw new Error("Method not implemented.");
    }
    extend(requestedExtenders: { [key: string]: any; }): KnockoutComputed<T> {
        throw new Error("Method not implemented.");
    }
    peek(): T {
        throw new Error("Method not implemented.");
    }
    valueHasMutated?: () => void;
    valueWillMutate?: () => void;
    subscribe(callback: (newValue: T) => void, target: any, event: "beforeChange"): KnockoutSubscription;
    subscribe(callback: (newValue: T) => void, target?: any, event?: "change"): KnockoutSubscription;
    subscribe<TEvent>(callback: (newValue: TEvent) => void, target: any, event: string): KnockoutSubscription;
    subscribe(callback: any, target?: any, event?: any) {
        throw new Error("Method not implemented.");
    }
    getSubscriptionsCount(): number {
        throw new Error("Method not implemented.");
    }
    notifySubscribers(valueToWrite?: T, event?: string): void {
        throw new Error("Method not implemented.");
    }
    equalityComparer(a: any, b: any): boolean {
        throw new Error("Method not implemented.");
    }

}