"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var logger_1 = __importDefault(require("./utils/logger"));
var app_1 = __importDefault(require("./app"));
//validate environment variables
// Start the app listening
app_1.default.listen(config_1.default.port, function () {
    logger_1.default.logRequest("Server is listening on port ".concat(config_1.default.port));
});
//# sourceMappingURL=index.js.map