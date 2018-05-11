define(["require", "exports", "plugins/router"], function (require, exports, router) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseViewModel = (function () {
        function BaseViewModel() {
            this.navigate = function (url) {
                router.navigate(url);
            };
        }
        return BaseViewModel;
    }());
    exports.BaseViewModel = BaseViewModel;
});
//# sourceMappingURL=BaseViewModel.js.map