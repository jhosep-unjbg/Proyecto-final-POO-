"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(id, nombres, apellidos, email) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
    }
    Usuario.prototype.getNombreCompleto = function () {
        return "".concat(this.nombres, " ").concat(this.apellidos);
    };
    return Usuario;
}());
exports.Usuario = Usuario;
