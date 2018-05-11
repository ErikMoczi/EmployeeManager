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
define(["require", "exports", "./BaseEvent"], function (require, exports, BaseEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PositionEvent = (function (_super) {
        __extends(PositionEvent, _super);
        function PositionEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PositionEvent.prototype.baseObject = function () {
            return 'position';
        };
        return PositionEvent;
    }(BaseEvent_1.BaseEvent));
    exports.PositionEvent = PositionEvent;
    exports.default = new PositionEvent();
});
//# sourceMappingURL=PositionEvent.js.map