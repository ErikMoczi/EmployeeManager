define(["require", "exports", "plugins/http"], function (require, exports, http) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseModel = (function () {
        function BaseModel() {
            this.parseAndResolve = function (jsonData) {
                var refMap = {};
                return JSON.parse(http.toJSON(jsonData), function (key, value) {
                    if (key === '$id') {
                        refMap[value] = this;
                        return void (0);
                    }
                    if (value && value.$ref) {
                        return refMap[value.$ref];
                    }
                    return value;
                });
            };
        }
        return BaseModel;
    }());
    exports.BaseModel = BaseModel;
});
//# sourceMappingURL=BaseModel.js.map