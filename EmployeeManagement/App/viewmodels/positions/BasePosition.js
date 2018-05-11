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
define(["require", "exports", "repositories/positionRepository", "viewmodels/BaseViewModel"], function (require, exports, positionRepository_1, BaseViewModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasePosition = (function (_super) {
        __extends(BasePosition, _super);
        function BasePosition() {
            var _this = _super.call(this) || this;
            _this.navPositions = function () {
                _this.navigate(_this.baseViewUrl());
            };
            _this._positionRepository = new positionRepository_1.PositionRepository();
            return _this;
        }
        Object.defineProperty(BasePosition.prototype, "PositionRepository", {
            get: function () {
                return this._positionRepository;
            },
            enumerable: true,
            configurable: true
        });
        BasePosition.prototype.baseViewUrl = function () {
            return 'position';
        };
        return BasePosition;
    }(BaseViewModel_1.BaseViewModel));
    exports.BasePosition = BasePosition;
});
//# sourceMappingURL=BasePosition.js.map