define(["require", "exports", "plugins/router", "configs/routes"], function (require, exports, router, routes_1) {
    "use strict";
    var Shell = (function () {
        function Shell() {
            this.activate = function () {
                router.map(routes_1.default.routes()).buildNavigationModel();
                return router.activate();
            };
            this.router = router;
        }
        return Shell;
    }());
    return new Shell();
});
//# sourceMappingURL=shell.js.map