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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var task_service_1 = __importDefault(require("./task.service"));
var jest_mock_extended_1 = require("jest-mock-extended");
var jwt = __importStar(require("jsonwebtoken"));
process.env.DATABASE_URL = 'file:./dev.db';
describe('Task Endpoints', function () {
    var prismaMock = (0, jest_mock_extended_1.mockDeep)();
    var taskService = new task_service_1.default(prismaMock);
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaMock.$disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var token = jwt.sign({ id: 'testuser', username: 'testuser' }, 'your-secret-key');
    describe('GET /api/v1/tasks', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskService.deleteAllTasks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return all tasks', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, taskService.createTask({ title: 'Task 1', description: 'Description 1', completed: false })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, taskService.createTask({
                                title: 'Task 2',
                                description: 'Description 2',
                                completed: true,
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .get('/api/v1/tasks')
                                .set(authorizationHeader)];
                    case 3:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('POST /api/v1/tasks', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskService.deleteAllTasks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a new task', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post('/api/v1/tasks')
                                .set(authorizationHeader)
                                .send({
                                title: 'New Task',
                                description: 'New Description',
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(201);
                        expect(res.body.title).toEqual('New Task');
                        expect(res.body.description).toEqual('New Description');
                        expect(res.body.completed).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 if title is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post('/api/v1/tasks')
                                .set(authorizationHeader)
                                .send({
                                description: 'New Description',
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual('"title" is required');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 if description is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post('/api/v1/tasks')
                                .set(authorizationHeader)
                                .send({
                                title: 'New Task',
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual('"description" is required');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('GET /api/v1/tasks/:id', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskService.deleteAllTasks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a specific task by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, task, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, taskService.createTask({
                                title: 'Task to find',
                                description: 'Description to find',
                                completed: false,
                            })];
                    case 1:
                        task = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .get("/api/v1/tasks/".concat(task.id))
                                .set(authorizationHeader)];
                    case 2:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.title).toEqual('Task to find');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if task is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .get("/api/v1/tasks/999")
                                .set(authorizationHeader)];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(404);
                        expect(res.body.error).toEqual('Task not found');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('PUT /api/v1/tasks/:id', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskService.deleteAllTasks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update an existing task', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, task, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, taskService.createTask({
                                title: 'Task to update',
                                description: 'Description to update',
                                completed: false,
                            })];
                    case 1:
                        task = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .put("/api/v1/tasks/".concat(task.id))
                                .set(authorizationHeader)
                                .send({ title: 'Updated Task', description: 'Updated Description', completed: true })];
                    case 2:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.title).toEqual('Updated Task');
                        expect(res.body.description).toEqual('Updated Description');
                        expect(res.body.completed).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if task to update is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .put('/api/v1/tasks/999')
                                .set(authorizationHeader)
                                .send({ title: 'Updated Task', description: 'Updated Description', completed: false })];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(404);
                        expect(res.body.error).toEqual('Task not found');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 if title is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, task, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, taskService.createTask({
                                title: 'Task to update',
                                description: 'Description to update',
                                completed: false,
                            })];
                    case 1:
                        task = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .put("/api/v1/tasks/".concat(task.id))
                                .set(authorizationHeader)
                                .send({ description: 'New Description', completed: false })];
                    case 2:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual('"title" is required');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 if description is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, task, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, taskService.createTask({
                                title: 'Task to update',
                                description: 'Description to update',
                                completed: false,
                            })];
                    case 1:
                        task = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .put("/api/v1/tasks/".concat(task.id))
                                .set(authorizationHeader)
                                .send({ title: 'New Task', completed: false })];
                    case 2:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual('"description" is required');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('DELETE /api/v1/tasks/:id', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskService.deleteAllTasks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete a task', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, task, res, deletedTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, taskService.createTask({
                                title: 'Task to delete',
                                description: 'Description to delete',
                                completed: false,
                            })];
                    case 1:
                        task = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .delete("/api/v1/tasks/".concat(task.id))
                                .set(authorizationHeader)];
                    case 2:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(204);
                        return [4 /*yield*/, taskService.getTaskById(task.id)];
                    case 3:
                        deletedTask = _a.sent();
                        expect(deletedTask).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if task to delete is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authorizationHeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorizationHeader = { authorization: "Bearer ".concat(token) };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .delete('/api/v1/tasks/999')
                                .set(authorizationHeader)];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toEqual(404);
                        expect(res.body.error).toEqual('Task not found');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=task.controller.test.js.map