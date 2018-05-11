define(["require", "exports", "durandal/system", "toastr"], function (require, exports, system, toastr) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Logger = (function () {
        function Logger() {
            var _this = this;
            this.logInfo = function (message, data, source, showToast) {
                if (showToast === void 0) { showToast = true; }
                _this.logIt(message, data, source, showToast, 'info');
            };
            this.logSuccess = function (message, data, source, showToast) {
                if (showToast === void 0) { showToast = true; }
                _this.logIt(message, data, source, showToast, 'success');
            };
            this.logWarning = function (message, data, source, showToast) {
                if (showToast === void 0) { showToast = true; }
                _this.logIt(message, data, source, showToast, 'warning');
            };
            this.logError = function (message, data, source, showToast) {
                if (showToast === void 0) { showToast = true; }
                _this.logIt(message, data, source, showToast, 'error');
            };
            this.logIt = function (message, data, source, showToast, toastType) {
                system.log(source);
                source = source ? '[' + source + '] ' : '';
                if (data) {
                    system.log(source, message, data);
                }
                else {
                    system.log(source, message);
                }
                if (showToast) {
                    if (toastType === 'error') {
                        toastr.error(message);
                    }
                    else if (toastType === 'success') {
                        toastr.success(message);
                    }
                    else if (toastType === 'warning') {
                        toastr.warning(message);
                    }
                    else {
                        toastr.info(message);
                    }
                }
            };
        }
        return Logger;
    }());
    exports.Logger = Logger;
    exports.default = new Logger();
});
//# sourceMappingURL=logger.js.map