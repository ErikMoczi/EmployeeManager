import router = require("plugins/router");

export abstract class BaseViewModel {
    public abstract baseViewUrl(): string;

    public navigate = (url: string): void => {
        router.navigate(url);
    }
}