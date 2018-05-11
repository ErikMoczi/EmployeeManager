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
    var PositionAddDetail = (function (_super) {
        __extends(PositionAddDetail, _super);
        function PositionAddDetail() {
            var _this = _super.call(this) || this;
            _this.activate = function (employeeId) {
                return system.defer(function (dfd) {
                    if (employeeId && employeeId > 0) {
                        system.log('asdfasfdsdf');
                        _this.loadData(employeeId);
                        _this._AddOrDetail(true);
                    }
                    else {
                        _this._position(new position_1.Position());
                        _this._AddOrDetail(false);
                    }
                    dfd.resolve();
                }).promise();
            };
            _this.add = function (position) {
                var promise = _this.PositionRepository.create(position);
                promise.then(function (response) {
                    logger_1.default.logSuccess('Position ' + position.Name() + ' created', position, system.getModuleId(_this));
                    app.trigger(PositionEvent_1.default.create(), new position_1.Position().fillData(response));
                    _this.navPositions();
                }, function (error, message) {
                    logger_1.default.logError('Problem with creating', position, system.getModuleId(_this));
                });
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
                    _this._position().fillData(response);
                    logger_1.default.logInfo('Retrieved Position ' + _this._position().Name(), _this._position(), system.getModuleId(_this));
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading data', error, system.getModuleId(_this));
                });
            };
            _this._AddOrDetail = ko.observable(false);
            _this._position = ko.observable();
            return _this;
        }
        Object.defineProperty(PositionAddDetail.prototype, "Position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PositionAddDetail.prototype, "AddOrDetail", {
            get: function () {
                return this._AddOrDetail;
            },
            enumerable: true,
            configurable: true
        });
        return PositionAddDetail;
    }(BasePosition_1.BasePosition));
    return new PositionAddDetail();
});
//# sourceMappingURL=addOrDetail.js.map