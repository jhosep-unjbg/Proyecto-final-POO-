"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStore = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var FileStore = /** @class */ (function () {
    function FileStore(baseDir) {
        this.baseDir = baseDir;
    }
    FileStore.prototype.fullPath = function (fileName) {
        return path_1.default.join(this.baseDir, fileName);
    };
    FileStore.prototype.ensureFileExists = function (fileName) {
        var p = this.fullPath(fileName);
        if (!fs_1.default.existsSync(p)) {
            fs_1.default.mkdirSync(this.baseDir, { recursive: true });
            fs_1.default.writeFileSync(p, "[]", "utf-8");
        }
    };
    FileStore.prototype.read = function (fileName) {
        this.ensureFileExists(fileName);
        var raw = fs_1.default.readFileSync(this.fullPath(fileName), "utf-8");
        return JSON.parse(raw);
    };
    FileStore.prototype.write = function (fileName, data) {
        this.ensureFileExists(fileName);
        fs_1.default.writeFileSync(this.fullPath(fileName), JSON.stringify(data, null, 2), "utf-8");
    };
    return FileStore;
}());
exports.FileStore = FileStore;
