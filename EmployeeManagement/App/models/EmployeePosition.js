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
define(["require", "exports", "moment", "./baseModel", "./Position"], function (require, exports, moment, baseModel_1, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmployeePosition = (function (_super) {
        __extends(EmployeePosition, _super);
        function EmployeePosition() {
            var _this = _super.call(this) || this;
            _this.Id = ko.observable();
            _this.EmployeeId = ko.observable();
            _this.PositionId = ko.observable();
            _this.Position = ko.observable();
            _this.FromDate = ko.observable();
            _this.ToDate = ko.observable();
            return _this;
        }
        Object.defineProperty(EmployeePosition.prototype, "FromDateFormated", {
            get: function () {
                if (this.FromDate()) {
                    return moment(this.FromDate()).format('YYYY-MM-DD');
                }
                return '';
            },
            set: function (value) {
                if (value) {
                    this.FromDate(new Date(value));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmployeePosition.prototype, "ToDateFormated", {
            get: function () {
                if (this.ToDate()) {
                    return moment(this.ToDate()).format('YYYY-MM-DD');
                }
                return '';
            },
            set: function (value) {
                if (value) {
                    this.ToDate(new Date(value));
                }
            },
            enumerable: true,
            configurable: true
        });
        EmployeePosition.prototype.fillData = function (jsonData) {
            this.Id(jsonData.Id);
            this.EmployeeId(jsonData.EmployeeId);
            this.PositionId(jsonData.PositionId);
            this.Position(new Position_1.Position().fillData(jsonData.Position));
            this.FromDate(new Date(jsonData.FromDate));
            if (jsonData.ToDate !== null) {
                this.ToDate(new Date(jsonData.ToDate));
            }
            return this;
        };
        EmployeePosition.prototype.getRawData = function () {
            return {
                Id: this.Id(),
                EmployeeId: this.EmployeeId(),
                PositionId: this.PositionId(),
                Position: this.Position(),
                FromDate: this.FromDate(),
                ToDate: this.ToDate()
            };
        };
        return EmployeePosition;
    }(baseModel_1.BaseModel));
    exports.EmployeePosition = EmployeePosition;
});
//# sourceMappingURL=EmployeePosition.js.map