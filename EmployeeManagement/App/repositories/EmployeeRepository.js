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
define(["require", "exports", "./repository"], function (require, exports, repository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmployeeRepository = (function (_super) {
        __extends(EmployeeRepository, _super);
        function EmployeeRepository() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmployeeRepository.prototype.specificUrl = function () {
            return 'employee';
        };
        return EmployeeRepository;
    }(repository_1.Repository));
    exports.EmployeeRepository = EmployeeRepository;
});
//# sourceMappingURL=EmployeeRepository.js.map