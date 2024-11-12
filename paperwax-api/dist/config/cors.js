"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: function (origin, callback) {
        if (origin && origin.includes("http")) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    }
};
//# sourceMappingURL=cors.js.map