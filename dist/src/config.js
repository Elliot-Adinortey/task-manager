"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
    auth: {
        apiVersion: process.env.API_VERSION || 'v1',
        username: process.env.AUTH_USERNAME || 'admin',
        password: process.env.AUTH_PASSWORD || 'password',
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map