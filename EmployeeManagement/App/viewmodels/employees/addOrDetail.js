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
define(["require", "exports", "durandal/system", "services/logger", "models/employee", "models/position", "models/EmployeePosition", "./BaseEmployee", "../../repositories/PositionRepository", "../../repositories/EmployeePositionRepository"], function (require, exports, system, logger_1, employee_1, position_1, EmployeePosition_1, BaseEmployee_1, PositionRepository_1, EmployeePositionRepository_1) {
    "use strict";
    var EmployeeAddDetail = (function (_super) {
        __extends(EmployeeAddDetail, _super);
        function EmployeeAddDetail() {
            var _this = _super.call(this) || this;
            _this.activate = function (employeeId) {
                return system.defer(function (dfd) {
                    var initEmployee = new employee_1.Employee();
                    initEmployee.NewEmployeePosition().FromDate(new Date());
                    _this._employee(initEmployee);
                    if (employeeId && employeeId > 0) {
                        dfd.resolve(_this.loadEmployee(employeeId));
                        _this._AddOrDetail(true);
                    }
                    else {
                        _this._AddOrDetail(false);
                    }
                    dfd.resolve(_this.loadPositions());
                }).promise();
            };
            _this.add = function (employee) {
                var promise = _this.EmployeeRepository.create(employee);
                promise.then(function (response) {
                    var employeeId = response.Id;
                    system.defer(function (dfd) {
                        dfd.resolve(_this.createNewEmployeePosition(employee, employeeId));
                    }).then(function (response) {
                        logger_1.default.logSuccess('Employee ' + employee.FullName + ' created', employee, system.getModuleId(_this));
                        _this.navEmployees();
                    }, function (error, message) {
                        logger_1.default.logError('Problem with creating reference', message, system.getModuleId(_this));
                    });
                }, function (error, message) {
                    logger_1.default.logError('Problem with creating', employee, system.getModuleId(_this));
                });
            };
            _this.update = function (employee) {
                var promise = _this.EmployeeRepository.update(employee);
                promise.then(function (response) {
                    var employeeId = response.Id;
                    system.defer(function (dfd) {
                        dfd.resolve(_this.createNewEmployeePosition(employee, employeeId));
                    }).then(function (response) {
                        logger_1.default.logSuccess('Employee ' + employee.FullName + ' updated', employee, system.getModuleId(_this));
                        _this.navEmployees();
                    }, function (error, message) {
                        logger_1.default.logError('Problem with creating reference', message, system.getModuleId(_this));
                    });
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
                    _this._employee().fillData(response);
                    logger_1.default.logInfo('Retrieved Employee ' + _this._employee().FullName, _this._employee(), system.getModuleId(_this));
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading data', error, system.getModuleId(_this));
                });
            };
            _this.createNewEmployeePosition = function (employee, employeeId) {
                var promise;
                if (employee.NewPosition()) {
                    var position = employee.NewPosition();
                    var newEmployeePosition = new EmployeePosition_1.EmployeePosition();
                    newEmployeePosition.EmployeeId(employeeId);
                    newEmployeePosition.PositionId(position.Id());
                    if (employee.NewEmployeePosition()) {
                        var employeePosition = employee.NewEmployeePosition();
                        newEmployeePosition.FromDate(employeePosition.FromDate());
                        newEmployeePosition.ToDate(employeePosition.ToDate());
                    }
                    promise = _this._positionEmployeeRepository.create(newEmployeePosition);
                }
                return promise;
            };
            _this._employee = ko.observable();
            _this._positionRepository = new PositionRepository_1.PositionRepository();
            _this._positionEmployeeRepository = new EmployeePositionRepository_1.EmployeePositionRepository();
            _this._positions = ko.observableArray([]);
            _this._newPosition = ko.observable(new position_1.Position());
            _this._AddOrDetail = ko.observable(false);
            return _this;
        }
        Object.defineProperty(EmployeeAddDetail.prototype, "Employee", {
            get: function () {
                return this._employee;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmployeeAddDetail.prototype, "Positions", {
            get: function () {
                return this._positions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmployeeAddDetail.prototype, "NewPosition", {
            get: function () {
                return this._newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmployeeAddDetail.prototype, "AddOrDetail", {
            get: function () {
                return this._AddOrDetail;
            },
            enumerable: true,
            configurable: true
        });
        return EmployeeAddDetail;
    }(BaseEmployee_1.BaseEmployee));
    return new EmployeeAddDetail();
});
//# sourceMappingURL=addOrDetail.js.map