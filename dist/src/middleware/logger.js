"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../utils/logger"));
var requestLogger = function (req, res, next) {
    logger_1.default.logRequest("Request: ".concat(req.method, " ").concat(req.url));
    next();
};
exports.default = requestLogger;
//# sourceMappingURL=logger.js.map