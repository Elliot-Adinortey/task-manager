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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var _a = authHeader.split(' '), scheme = _a[0], token = _a[1];
        if (scheme.toLowerCase() === 'bearer') {
            try {
                var decoded = jwt.verify(token, 'your-secret-key');
                req.user = decoded;
                next();
            }
            catch (err) {
                res.status(401).send('Unauthorized: Invalid token');
            }
        }
        else if (scheme.toLowerCase() === 'basic') {
            var decoded = Buffer.from(token, 'base64').toString('utf-8');
            var _b = decoded.split(':'), username = _b[0], password = _b[1];
            if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
                next();
            }
            else {
                res.status(401).send('Unauthorized: Invalid credentials');
            }
        }
        else {
            res.status(401).send('Unauthorized: Invalid scheme');
        }
    }
    else {
        res.status(401).send('Unauthorized: No credentials provided');
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map