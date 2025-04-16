"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error('An error occurred:', err);
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: err.details });
    }
    if (err.name === 'NotFoundError') {
        return res.status(404).json({ error: 'Not Found', details: err.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
}
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map