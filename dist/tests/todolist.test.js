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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPayload = exports.updatedSecondTodoPayload = exports.secondTodoPayload = exports.updatedTodoPayload = exports.todoPayload = exports.todolistUpdatePayload = exports.secondTodolistPayload = exports.todolistPayload = void 0;
const supertest_1 = __importDefault(require("supertest"));
const UserService = __importStar(require("../src/service/user.service"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const server_1 = __importDefault(require("../src/utils/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const jwt_utils_1 = require("../src/utils/jwt.utils");
const todolist_service_1 = require("../src/service/todolist.service");
const app = (0, server_1.default)();
const userId = "65a1a3ec38986bebd77298eb";
exports.todolistPayload = {
    user: userId,
    title: "Groceries",
    description: "A list about groceries.",
};
exports.secondTodolistPayload = {
    user: userId,
    title: "Task",
    description: "A list about task.",
};
exports.todolistUpdatePayload = {
    user: userId,
    title: "Updated Groceries",
    description: "An updated list about groceries.",
};
exports.todoPayload = {
    title: "Buy milk",
};
exports.updatedTodoPayload = {
    complete: true,
};
exports.secondTodoPayload = {
    title: "Buy meat",
};
exports.updatedSecondTodoPayload = {
    title: "Buy more meat",
    complete: true,
};
exports.userPayload = {
    _id: userId,
    email: "test@example.com",
    username: "John Smith",
};
describe("todolist", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const collections = mongoose_1.default.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            collection.deleteMany({});
        }
        jest.spyOn(UserService, "findUser").mockReturnValue(
        // @ts-ignore
        () => {
            return exports.userPayload;
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe("GET all todolist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/todolist`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and no todolist", () => {
            it("should return a 200 status and an empty array", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual([]);
            }));
        });
        describe("given the user is logged in and one todolist exist", () => {
            it("should return a 200 status and an array with the todolist", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body[0]).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Groceries",
                    description: "A list about groceries.",
                    todos: expect.any(Array),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
        describe("given the user is logged in and more than one todolist exist", () => {
            it("should return a 200 status and an array with the todolists", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                yield (0, todolist_service_1.createTodolist)(exports.secondTodolistPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body.length).toBe(2);
                expect(body[0]).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Task",
                    description: "A list about task.",
                    todos: expect.any(Array),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
                expect(body[1]).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Groceries",
                    description: "A list about groceries.",
                    todos: expect.any(Array),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
    describe("GET todolist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/todolist/${invalidId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the todolist does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the todolist does exist", () => {
            it("should return a 200 status and the todolist", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist/${todolistId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body.todolistId).toBe(todolistId);
            }));
        });
    });
    describe("POST create todolist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .post("/api/todolist")
                    .send(exports.todolistPayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in", () => {
            it("should return a 200 and create the todolist", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .post("/api/todolist")
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.todolistPayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Groceries",
                    description: "A list about groceries.",
                    todos: expect.any(Array),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
    describe("DELETE todolist route", () => {
        describe("given the user is not logged in and the todolist does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/todolist/${invalidId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the todolist exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode } = yield (0, supertest_1.default)(app).delete(`/api/todolist/${todolistId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the todolist does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .delete(`/api/todolist/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the todolist does exist", () => {
            it("should return a 200 status", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .delete(`/api/todolist/${todolistId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
            }));
        });
    });
    describe("PUT update todolist route", () => {
        describe("given the user is not logged in and the todolist does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).put(`/api/todolist/${invalidId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the todolist exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${todolistId}`)
                    .send(exports.todolistUpdatePayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the todolist does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.todolistUpdatePayload);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the todolist does exist", () => {
            it("should return a 200 status and the updated todolist", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${todolistId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.todolistUpdatePayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Updated Groceries",
                    description: "An updated list about groceries.",
                    todos: expect.any(Array),
                    /* todos: [ */
                    /*   { */
                    /*     title: "Buy milk", */
                    /*     complete: false, */
                    /*     createdAt: expect.any(String), */
                    /*     updatedAt: expect.any(String), */
                    /*   }, */
                    /* ], */
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
    describe("POST create a todo", () => {
        describe("given the user is not logged in and the todolist does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .post(`/api/todolist/${invalidId}`)
                    .send(exports.todoPayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the todolist exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .post(`/api/todolist/${todolistId}`)
                    .send(exports.todoPayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the todolist does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .post(`/api/todolist/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.todoPayload);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the todolist does exist", () => {
            it("should return a 200 status and the created todo", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .post(`/api/todolist/${todolistId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.todoPayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    _id: expect.any(String),
                    todoId: expect.any(String),
                    title: "Buy milk",
                    complete: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            }));
        });
        describe("given the user is logged in and the todolist does exist with a todo", () => {
            it("should be able to add a second todo", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                yield (0, todolist_service_1.findAndCreateTodo)(todolist, exports.todoPayload, { new: true });
                const todolistId = todolist.todolistId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .post(`/api/todolist/${todolistId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.secondTodoPayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    _id: expect.any(String),
                    todoId: expect.any(String),
                    title: "Buy meat",
                    complete: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
                const newTodolist = yield (0, todolist_service_1.findTodolist)({ todolistId });
                expect(newTodolist === null || newTodolist === void 0 ? void 0 : newTodolist.todos.length).toBe(2);
            }));
        });
    });
    describe("GET a todo", () => {
        describe("given the user is not logged in and the todolist does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const invalidTodoId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/todolist/${invalidId}/${invalidTodoId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the todolist and todo exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const todolistWithTodo = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, { new: true });
                const todoId = todolistWithTodo === null || todolistWithTodo === void 0 ? void 0 : todolistWithTodo.todos[0].todoId;
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/todolist/${todolistId}/${todoId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in, the todolist exist and the todo doesn't exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const invalidTodoId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist/${todolistId}/${invalidTodoId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in, the todolist and todo exist", () => {
            it("should return a 200 status and the updated todolist", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const todolistWithTodo = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, { new: true });
                const todoId = todolistWithTodo === null || todolistWithTodo === void 0 ? void 0 : todolistWithTodo.todos[0].todoId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist/${todolistId}/${todoId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    _id: expect.any(String),
                    todoId: expect.any(String),
                    title: "Buy milk",
                    complete: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            }));
        });
        describe("given the user is logged in and the todolist does exist with more than one todo", () => {
            it("should be able to get the second todo", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, {
                    new: true,
                });
                const todolistWithTwoTodos = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.secondTodoPayload, { new: true });
                const secondTodoId = todolistWithTwoTodos === null || todolistWithTwoTodos === void 0 ? void 0 : todolistWithTwoTodos.todos[1].todoId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/todolist/${todolistId}/${secondTodoId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    _id: expect.any(String),
                    todoId: expect.any(String),
                    title: "Buy meat",
                    complete: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            }));
        });
    });
    describe("DELETE a todo", () => {
        describe("given the user is not logged in and the todolist does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const invalidTodoId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).delete(`/api/todolist/${invalidId}/${invalidTodoId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the todolist and todo exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const todolistWithTodo = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, { new: true });
                const todoId = todolistWithTodo === null || todolistWithTodo === void 0 ? void 0 : todolistWithTodo.todos[0].todoId;
                const { statusCode } = yield (0, supertest_1.default)(app).delete(`/api/todolist/${todolistId}/${todoId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in, the todolist exist and the todo doesn't exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const invalidTodoId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .delete(`/api/todolist/${todolistId}/${invalidTodoId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in, the todolist and todo exist", () => {
            it("should return a 200 status and the updated todolist", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const todolistWithTodo = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, { new: true });
                const todoId = todolistWithTodo === null || todolistWithTodo === void 0 ? void 0 : todolistWithTodo.todos[0].todoId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .delete(`/api/todolist/${todolistId}/${todoId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Groceries",
                    description: "A list about groceries.",
                    todos: [],
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
        describe("given the user is logged in and the todolist does exist with more than one todo", () => {
            it("should be able to delete the second todo", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, {
                    new: true,
                });
                const todolistWithTwoTodos = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.secondTodoPayload, { new: true });
                const secondTodoId = todolistWithTwoTodos === null || todolistWithTwoTodos === void 0 ? void 0 : todolistWithTwoTodos.todos[1].todoId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .delete(`/api/todolist/${todolistId}/${secondTodoId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    todolistId: expect.any(String),
                    title: "Groceries",
                    description: "A list about groceries.",
                    todos: [
                        {
                            _id: expect.any(String),
                            todoId: expect.any(String),
                            title: "Buy milk",
                            complete: false,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        },
                    ],
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
    describe("PUT update a todo", () => {
        describe("given the user is not logged in and the todolist does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const invalidTodoId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${invalidId}/${invalidTodoId}`)
                    .send(exports.updatedTodoPayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the todolist and todo exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const todolistWithTodo = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, { new: true });
                const todoId = todolistWithTodo === null || todolistWithTodo === void 0 ? void 0 : todolistWithTodo.todos[0].todoId;
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${todolistId}/${todoId}`)
                    .send(exports.updatedTodoPayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in, the todolist exist and the todo doesn't exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const invalidTodoId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${todolistId}/${invalidTodoId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.updatedTodoPayload);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in, the todolist and todo exist", () => {
            it("should return a 200 status and the updated todo", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                const todolistWithTodo = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, { new: true });
                const todoId = todolistWithTodo === null || todolistWithTodo === void 0 ? void 0 : todolistWithTodo.todos[0].todoId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${todolistId}/${todoId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.updatedTodoPayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    title: "Buy milk",
                    complete: true,
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    todoId: expect.any(String),
                });
            }));
        });
        describe("given the user is logged in and the todolist does exist with more than one todo", () => {
            it("should be able to update the second todo complete and title field", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const todolist = yield (0, todolist_service_1.createTodolist)(exports.todolistPayload);
                const todolistId = todolist.todolistId;
                yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.todoPayload, {
                    new: true,
                });
                const todolistWithTwoTodos = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, exports.secondTodoPayload, { new: true });
                const secondTodoId = todolistWithTwoTodos === null || todolistWithTwoTodos === void 0 ? void 0 : todolistWithTwoTodos.todos[1].todoId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .put(`/api/todolist/${todolistId}/${secondTodoId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.updatedSecondTodoPayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    title: "Buy more meat",
                    complete: true,
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    todoId: expect.any(String),
                });
            }));
        });
    });
});
