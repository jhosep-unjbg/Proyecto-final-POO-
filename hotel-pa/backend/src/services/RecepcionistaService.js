"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecepcionistaService = void 0;
var RecepcionistaService = /** @class */ (function () {
    function RecepcionistaService(repo) {
        this.repo = repo;
    }
    RecepcionistaService.prototype.crear = function (input) {
        if (!input.nombres.trim())
            throw new Error("Nombre requerido");
        if (!input.apellidos.trim())
            throw new Error("Apellidos requeridos");
        if (!input.email.trim())
            throw new Error("Email requerido");
        // el repo debería crear el id internamente o devolver el creado
        return this.repo.create(__assign(__assign({}, input), { createdAt: new Date().toISOString() }));
    };
    RecepcionistaService.prototype.listar = function () {
        return this.repo.findAll();
    };
    RecepcionistaService.prototype.cambiarTurno = function (id, turno) {
        var r = this.repo.findById(id);
        if (!r)
            throw new Error("Recepcionista no existe");
        var updated = __assign(__assign({}, r), { turno: turno });
        this.repo.update(updated); // update con 1 parámetro (objeto completo)
        return updated;
    };
    return RecepcionistaService;
}());
exports.RecepcionistaService = RecepcionistaService;
