define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseEvent = (function () {
        function BaseEvent() {
            var _this = this;
            this.create = function () { return _this.baseObject() + ':create'; };
            this.update = function () { return _this.baseObject() + ':update'; };
            this.delete = function () { return _this.baseObject() + ':delete'; };
        }
        return BaseEvent;
    }());
    exports.BaseEvent = BaseEvent;
});
//# sourceMappingURL=BaseEvent.js.map