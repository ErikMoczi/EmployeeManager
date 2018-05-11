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
define(["require", "exports", "durandal/system", "durandal/app", "services/logger", "models/position", "./BasePosition", "events/PositionEvent"], function (require, exports, system, app, logger_1, position_1, BasePosition_1, PositionEvent_1) {
    "use strict";
    var PositionDetail = (function (_super) {
        __extends(PositionDetail, _super);
        function PositionDetail() {
            var _this = _super.call(this) || this;
            _this.activate = function (employeeId) {
                return system.defer(function (dfd) {
                    _this.loadData(employeeId);
                    dfd.resolve(true);
                }).promise();
            };
            _this.update = function (position) {
                var promise = _this.PositionRepository.update(position);
                promise.then(function (response) {
                    logger_1.default.logSuccess('Position ' + position.Name() + ' updated', position, system.getModuleId(_this));
                    app.trigger(PositionEvent_1.default.update(), position);
                    _this.navPositions();
                }, function (error, message) {
                    logger_1.default.logError('Problem with update', position, system.getModuleId(_this));
                });
            };
            _this.loadData = function (id) {
                return _this.PositionRepository.getById(id).then(function (response) {
                    var data = new position_1.Position().fillData(response);
                    _this._position(data);
                    logger_1.default.logInfo('Retrieved Position ' + data.Name(), data, system.getModuleId(_this));
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading data', error, system.getModuleId(_this));
                });
            };
            _this._position = ko.observable();
            return _this;
        }
        Object.defineProperty(PositionDetail.prototype, "Position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        return PositionDetail;
    }(BasePosition_1.BasePosition));
    return new PositionDetail();
});
//# sourceMappingURL=detail.js.map