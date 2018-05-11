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
    var PositionShow = (function (_super) {
        __extends(PositionShow, _super);
        function PositionShow() {
            var _this = _super.call(this) || this;
            _this.activate = function () {
                return system.defer(function (dfd) {
                    if (_this._positions().length > 0) {
                        dfd.resolve();
                        return null;
                    }
                    dfd.resolve(_this.refresh());
                }).promise();
            };
            _this.edit = function (position) {
                if (position && position.Id()) {
                    var url = _this.baseViewUrl() + '/' + position.Id();
                    _this.navigate(url);
                }
            };
            _this.remove = function (position) {
                if (position && position.Id()) {
                    var promise = _this.PositionRepository.delete(position);
                    promise.then(function (responsePosition) {
                        logger_1.default.logSuccess('Position ' + position.Name() + ' deleted', position, system.getModuleId(_this));
                        app.trigger(PositionEvent_1.default.delete(), position);
                    }, function (error, message) {
                        logger_1.default.logError('Problem with delete ' + position.Name(), position, system.getModuleId(_this));
                    });
                }
            };
            _this.refresh = function () {
                return _this.PositionRepository.get().then(function (response) {
                    var data = (ko.utils.arrayMap(response, function (currentItem) {
                        return new position_1.Position().fillData(currentItem);
                    }));
                    _this._positions(data);
                    logger_1.default.logInfo('Retrieved data', data, system.getModuleId(_this));
                }, function (error, message) {
                    logger_1.default.logError('Problem with loading data', error, system.getModuleId(_this));
                });
            };
            _this.addNewPosition = function (position) {
                _this._positions.push(position);
            };
            _this.updateNewPosition = function (position) {
                var index = _this._positions.indexOf(ko.utils.arrayFirst(ko.utils.unwrapObservable(_this._positions), function (searchPosition) {
                    return ko.utils.unwrapObservable(searchPosition.Id()) == position.Id();
                }));
                _this._positions.replace(_this._positions()[index], position);
            };
            _this.deleteNewPosition = function (position) {
                _this._positions.remove(position);
            };
            _this._positions = ko.observableArray([]);
            _this._newPositionSubscription = app.on(PositionEvent_1.default.create()).then(function (position) {
                _this.addNewPosition(position);
            }, _this);
            _this._updatePositionSubscription = app.on(PositionEvent_1.default.update()).then(function (position) {
                _this.updateNewPosition(position);
            }, _this);
            _this._deletePositionSubscription = app.on(PositionEvent_1.default.delete()).then(function (position) {
                _this.deleteNewPosition(position);
            }, _this);
            return _this;
        }
        Object.defineProperty(PositionShow.prototype, "Positions", {
            get: function () {
                return this._positions;
            },
            enumerable: true,
            configurable: true
        });
        return PositionShow;
    }(BasePosition_1.BasePosition));
    return new PositionShow();
});
//# sourceMappingURL=show.js.map