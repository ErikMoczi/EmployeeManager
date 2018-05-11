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
define(["require", "exports", "./baseModel"], function (require, exports, baseModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Position = (function (_super) {
        __extends(Position, _super);
        function Position() {
            var _this = _super.call(this) || this;
            _this.Id = ko.observable();
            _this.Name = ko.observable();
            _this.EmployeePositions = ko.observable(false);
            return _this;
        }
        Position.prototype.fillData = function (jsonData) {
            this.Id(jsonData.Id);
            this.Name(jsonData.Name);
            if (jsonData.EmployeePositions.length > 0) {
                this.EmployeePositions(true);
            }
            return this;
        };
        Position.prototype.getRawData = function () {
            return {
                Id: this.Id(),
                Name: this.Name()
            };
        };
        return Position;
    }(baseModel_1.BaseModel));
    exports.Position = Position;
});
//# sourceMappingURL=Position.js.map