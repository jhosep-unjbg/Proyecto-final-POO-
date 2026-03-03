"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEstadiaRepository = void 0;
var JsonRepository_1 = require("./JsonRepository");
var FileEstadiaRepository = /** @class */ (function (_super) {
    __extends(FileEstadiaRepository, _super);
    function FileEstadiaRepository() {
        return _super.call(this, "estadias.json") || this;
    }
    FileEstadiaRepository.prototype.findByReserva = function (reservaId) {
        var _a;
        var items = this.findAll();
        return (_a = items.find(function (e) { return e.reservaId === reservaId; })) !== null && _a !== void 0 ? _a : null;
    };
    return FileEstadiaRepository;
}(JsonRepository_1.JsonRepository));
exports.FileEstadiaRepository = FileEstadiaRepository;
