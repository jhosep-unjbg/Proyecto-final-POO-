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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var FileRecepcionistaRepository_1 = require("./repositories/file/FileRecepcionistaRepository");
var RecepcionistaService_1 = require("./services/RecepcionistaService");
var app = express.default();
app.use(express.json()); // 👈 IMPORTANTE para req.body
var recepRepo = new FileRecepcionistaRepository_1.RecepcionistaRepository();
var recepService = new RecepcionistaService_1.RecepcionistaService(recepRepo);
// health
app.get("/health", function (_req, res) {
    res.json({ ok: true });
});
// recepcionistas
app.post("/recepcionistas", function (req, res) {
    try {
        var created = recepService.crear(req.body);
        res.status(201).json(created);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
app.get("/recepcionistas", function (_req, res) {
    res.json(recepService.listar());
});
var PORT = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
app.listen(PORT, function () { return console.log("Servidor corriendo en puerto ".concat(PORT)); });
