var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "durandal/system", "services/logger", "models/employee", "./BaseEmployee"], function (require, exports, system, logger_1, employee_1, BaseEmployee_1) {
    "use strict";
    var EmployeeShow = (function (_super) {
        __extends(EmployeeShow, _super);
        function EmployeeShow() {
            var _this = _super.call(this) || this;
            _this.activate = function () {
                return system.defer(function (dfd) {
                    dfd.resolve(_this.refresh());
                }).promise();
            };
            _this.edit = function (employee) {
                if (employee && employee.Id()) {
                    var url = _this.baseViewUrl() + '/' + employee.Id();
                    _this.navigate(url);
                }
            };
            _this.remove = function (employee) {
                if (employee && employee.Id()) {
                    var promise = _this.EmployeeRepository.delete(employee);
                    promise.then(function (response) {
                        logger_1.default.logSuccess('Employee ' + employee.FullName + ' deleted', employee, system.getModuleId(_this));
                        _this.refresh();
                    }, function (error, message) {
                        logger_1.default.logError('Problem with delete ' + employee.FullName, employee, system.getModuleId(_this));
                    });
                }
            };
            _this.refresh = function () {
                return _this.EmployeeRepository.get().then(function (response) {
                    var data = (ko.utils.arrayMap(response, function (currentItem) {
                        return new employee_1.Employee().fillData(currentItem);
                    }));
                    _this._employees(data);
                    logger_1.default.logInfo('Retrieved data', data, system.getModuleId(_this));
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading data', error, system.getModuleId(_this));
                });
            };
            _this._employees = ko.observableArray([]);
            return _this;
        }
        Object.defineProperty(EmployeeShow.prototype, "Employees", {
            get: function () {
                return this._employees;
            },
            enumerable: true,
            configurable: true
        });
        return EmployeeShow;
    }(BaseEmployee_1.BaseEmployee));
    return new EmployeeShow();
});
//# sourceMappingURL=show.js.map