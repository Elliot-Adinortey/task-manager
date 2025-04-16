"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var taskSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    completed: joi_1.default.boolean().optional(),
});
var validateTask = function (req, res, next) {
    var error = taskSchema.validate(req.body).error;
    if (error) {
        return res.status(400).json({ error: error.details.map(function (detail) { return detail.message; }) });
    }
    next();
};
exports.default = validateTask;
//# sourceMappingURL=task.validation.js.map