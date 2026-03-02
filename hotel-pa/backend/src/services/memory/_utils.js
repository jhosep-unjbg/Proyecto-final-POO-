"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
exports.includesNormalized = includesNormalized;
exports.nextId = nextId;
function normalize(s) {
    return (s !== null && s !== void 0 ? s : "").trim().toLowerCase();
}
function includesNormalized(haystack, needle) {
    if (!needle)
        return true;
    return normalize(haystack).includes(normalize(needle));
}
function nextId(counter) {
    counter.value += 1;
    return counter.value;
}
