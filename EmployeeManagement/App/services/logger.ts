import system = require('durandal/system');
import toastr = require('toastr');

export class Logger {
    public logInfo = (message: string, data: any, source: string, showToast: boolean = true): void => {
        this.logIt(message, data, source, showToast, 'info');
    }

    public logSuccess = (message: string, data: any, source: string, showToast: boolean = true): void => {
        this.logIt(message, data, source, showToast, 'success');
    }

    public logWarning = (message: string, data: any, source: string, showToast: boolean = true): void => {
        this.logIt(message, data, source, showToast, 'warning');
    }

    public logError = (message: string, data: any, source: string, showToast: boolean = true): void => {
        this.logIt(message, data, source, showToast, 'error');
    }

    public logIt = (message: string, data: any, source: string, showToast: boolean, toastType: ToastrType): void => {
        system.log(source);
        source = source ? '[' + source + '] ' : '';
        
        if (data) {
            system.log(source, message, data);
        } else {
            system.log(source, message);
        }

        if (showToast) {
            if (toastType === 'error') {
                toastr.error(message);
            } else if (toastType === 'success') {
                toastr.success(message);
            } else if (toastType === 'warning') {
                toastr.warning(message);
            } else {
                toastr.info(message);
            }
        }
    }    
}

export default new Logger();