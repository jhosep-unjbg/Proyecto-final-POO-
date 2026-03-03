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
exports.FilePagoRepository = void 0;
var JsonRepository_1 = require("./JsonRepository");
var FilePagoRepository = /** @class */ (function (_super) {
    __extends(FilePagoRepository, _super);
    function FilePagoRepository() {
        return _super.call(this, "pagos.json") || this;
    }
    FilePagoRepository.prototype.findByReserva = function (reservaId) {
        var items = this.findAll();
        return items.filter(function (p) { return p.reservaId === reservaId; });
    };
    return FilePagoRepository;
}(JsonRepository_1.JsonRepository));
exports.FilePagoRepository = FilePagoRepository;
