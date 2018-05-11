define(["require", "exports", "plugins/http"], function (require, exports, http) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Repository = (function () {
        function Repository() {
            this.baseUrl = '/api';
        }
        Repository.prototype.apiUrl = function () {
            return this.baseUrl + '/' + this.specificUrl();
        };
        Repository.prototype.get = function () {
            return http.get(this.apiUrl());
        };
        Repository.prototype.getById = function (id) {
            return http.get(this.apiUrl() + '/' + id);
        };
        Repository.prototype.update = function (model) {
            return http.put(this.apiUrl() + '/' + model.Id(), model.getRawData());
        };
        Repository.prototype.create = function (model) {
            return http.post(this.apiUrl(), model.getRawData());
        };
        Repository.prototype.delete = function (model) {
            return http.remove(this.apiUrl() + '/' + model.Id());
        };
        return Repository;
    }());
    exports.Repository = Repository;
});
//# sourceMappingURL=repository.js.map