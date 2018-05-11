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
define(["require", "exports", "repositories/employeeRepository", "viewmodels/BaseViewModel"], function (require, exports, employeeRepository_1, BaseViewModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseEmployee = (function (_super) {
        __extends(BaseEmployee, _super);
        function BaseEmployee() {
            var _this = _super.call(this) || this;
            _this.navEmployees = function () {
                _this.navigate(_this.baseViewUrl());
            };
            _this._employeeRepository = new employeeRepository_1.EmployeeRepository();
            return _this;
        }
        Object.defineProperty(BaseEmployee.prototype, "EmployeeRepository", {
            get: function () {
                return this._employeeRepository;
            },
            enumerable: true,
            configurable: true
        });
        BaseEmployee.prototype.baseViewUrl = function () {
            return 'employee';
        };
        return BaseEmployee;
    }(BaseViewModel_1.BaseViewModel));
    exports.BaseEmployee = BaseEmployee;
});
//# sourceMappingURL=BaseEmployee.js.map