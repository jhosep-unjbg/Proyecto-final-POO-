"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextId = nextId;
function nextId(existingIds) {
    return existingIds.length ? Math.max.apply(Math, existingIds) + 1 : 1;
}
