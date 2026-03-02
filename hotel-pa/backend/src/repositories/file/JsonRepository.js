"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRepository = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var JsonRepository = /** @class */ (function () {
    function JsonRepository(fileName) {
        this.filePath = path.join(__dirname, "../../../data", fileName);
        // Si el archivo no existe, lo crea
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }
    JsonRepository.prototype.readFile = function () {
        var data = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
    };
    JsonRepository.prototype.writeFile = function (data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    };
    JsonRepository.prototype.findAll = function () {
        return this.readFile();
    };
    JsonRepository.prototype.findById = function (id) {
        return this.readFile().find(function (item) { return item.id === id; });
    };
    JsonRepository.prototype.create = function (entity) {
        var data = this.readFile();
        data.push(entity);
        this.writeFile(data);
        return entity;
    };
    JsonRepository.prototype.update = function (entity) {
        var data = this.readFile();
        var index = data.findIndex(function (item) { return item.id === entity.id; });
        if (index === -1) {
            throw new Error("Entidad no encontrada para actualizar");
        }
        data[index] = entity;
        this.writeFile(data);
        return entity;
    };
    JsonRepository.prototype.delete = function (id) {
        var data = this.readFile();
        var newData = data.filter(function (item) { return item.id !== id; });
        if (newData.length === data.length) {
            return false;
        }
        this.writeFile(newData);
        return true;
    };
    return JsonRepository;
}());
exports.JsonRepository = JsonRepository;
