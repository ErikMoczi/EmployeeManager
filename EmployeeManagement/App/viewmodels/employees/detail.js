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
define(["require", "exports", "durandal/system", "services/logger", "models/employee", "models/position", "./BaseEmployee", "../../repositories/PositionRepository"], function (require, exports, system, logger_1, employee_1, position_1, BaseEmployee_1, PositionRepository_1) {
    "use strict";
    var EmployeeDetail = (function (_super) {
        __extends(EmployeeDetail, _super);
        function EmployeeDetail() {
            var _this = _super.call(this) || this;
            _this.activate = function (employeeId) {
                return system.defer(function (dfd) {
                    _this._employee(new employee_1.Employee());
                    dfd.resolve(_this.loadPositions());
                    dfd.resolve(_this.loadEmployee(employeeId));
                }).promise();
            };
            _this.update = function (employee) {
                var promise = _this.EmployeeRepository.update(employee);
                promise.then(function (response) {
                    logger_1.default.logSuccess('Employee ' + employee.FullName + ' updated', employee, system.getModuleId(_this));
                    _this.navEmployees();
                }, function (error, message) {
                    logger_1.default.logError('Problem with update', employee, system.getModuleId(_this));
                });
            };
            _this.loadPositions = function () {
                return _this._positionRepository.get().then(function (response) {
                    var data = (ko.utils.arrayMap(response, function (currentItem) {
                        return new position_1.Position().fillData(currentItem);
                    }));
                    _this._positions(data);
                    logger_1.default.logInfo('Retrieved position data', data, system.getModuleId(_this), false);
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading positions', error, system.getModuleId(_this));
                });
            };
            _this.loadEmployee = function (id) {
                return _this.EmployeeRepository.getById(id).then(function (response) {
                    var data = new employee_1.Employee().fillData(response);
                    _this._employee(data);
                    logger_1.default.logInfo('Retrieved Employee ' + data.FullName, data, system.getModuleId(_this));
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading data', error, system.getModuleId(_this));
                });
            };
            _this._employee = ko.observable();
            _this._positionRepository = new PositionRepository_1.PositionRepository();
            _this._positions = ko.observableArray([]);
            _this._positionName = ko.observable();
            return _this;
        }
        Object.defineProperty(EmployeeDetail.prototype, "Employee", {
            get: function () {
                return this._employee;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmployeeDetail.prototype, "Positions", {
            get: function () {
                return this._positions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmployeeDetail.prototype, "PositionName", {
            get: function () {
                return this._positionName;
            },
            enumerable: true,
            configurable: true
        });
        return EmployeeDetail;
    }(BaseEmployee_1.BaseEmployee));
    return new EmployeeDetail();
});
//# sourceMappingURL=detail.js.map