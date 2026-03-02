"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nightsBetween = nightsBetween;
function nightsBetween(start, end) {
    var s = new Date(start);
    s.setHours(0, 0, 0, 0);
    var e = new Date(end);
    e.setHours(0, 0, 0, 0);
    var diff = e.getTime() - s.getTime();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}
