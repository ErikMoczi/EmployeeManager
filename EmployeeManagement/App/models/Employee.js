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
define(["require", "exports", "moment", "./baseModel", "./Position", "./EmployeePosition"], function (require, exports, moment, baseModel_1, Position_1, EmployeePosition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Employee = (function (_super) {
        __extends(Employee, _super);
        function Employee() {
            var _this = _super.call(this) || this;
            _this.FindCurrentEmployeePosition = function (employeePositions) {
                return employeePositions.length > 0 ? employeePositions[employeePositions.length - 1] : null;
            };
            _this.Id = ko.observable();
            _this.Name = ko.observable();
            _this.Surname = ko.observable();
            _this.Address = ko.observable();
            _this.BirthDate = ko.observable();
            _this.EntryDate = ko.observable();
            _this.Salary = ko.observable();
            _this.EmployeePositions = ko.observableArray([]);
            _this.NewPosition = ko.observable(new Position_1.Position());
            _this.ActiveEmployeePosition = ko.observable(new EmployeePosition_1.EmployeePosition());
            _this.NewEmployeePosition = ko.observable(new EmployeePosition_1.EmployeePosition());
            return _this;
        }
        Object.defineProperty(Employee.prototype, "FullName", {
            get: function () {
                return this.Name() + ' ' + this.Surname();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Employee.prototype, "BirthDateFormated", {
            get: function () {
                if (this.BirthDate()) {
                    return moment(this.BirthDate()).format('YYYY-MM-DD');
                }
                return '';
            },
            set: function (value) {
                if (value) {
                    this.BirthDate(new Date(value));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Employee.prototype, "EntryDateFormated", {
            get: function () {
                if (this.EntryDate()) {
                    return moment(this.EntryDate()).format('YYYY-MM-DD');
                }
                return '';
            },
            set: function (value) {
                if (value) {
                    this.EntryDate(new Date(value));
                }
            },
            enumerable: true,
            configurable: true
        });
        Employee.prototype.fillData = function (jsonData) {
            this.Id(jsonData.Id);
            this.Name(jsonData.Name);
            this.Surname(jsonData.Surname);
            this.Address(jsonData.Address);
            if (jsonData.BirthDate) {
                this.BirthDate(new Date(jsonData.BirthDate));
            }
            if (jsonData.EntryDate) {
                this.EntryDate(new Date(jsonData.EntryDate));
            }
            this.Salary(jsonData.Salary);
            if (jsonData.EmployeePositions.length > 0) {
                var employeePositions = (ko.utils.arrayMap(jsonData.EmployeePositions, function (currentItem) {
                    return new EmployeePosition_1.EmployeePosition().fillData(currentItem);
                }));
                this.EmployeePositions(employeePositions);
                this.ActiveEmployeePosition(this.FindCurrentEmployeePosition(employeePositions));
            }
            return this;
        };
        Employee.prototype.getRawData = function () {
            return {
                Id: this.Id(),
                Name: this.Name(),
                Surname: this.Surname(),
                Address: this.Address(),
                BirthDate: this.BirthDate(),
                EntryDate: this.EntryDate(),
                Salary: this.Salary()
            };
        };
        return Employee;
    }(baseModel_1.BaseModel));
    exports.Employee = Employee;
});
//# sourceMappingURL=Employee.js.map