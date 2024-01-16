"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoSchema = exports.getTodolistSchema = exports.deleteTodolistSchema = exports.updateTodoSchema = exports.getTodoSchema = exports.deleteTodoSchema = exports.updateTodolistSchema = exports.createTodolistSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }).min(1, "Title too short, should be 1 chars minimum"),
        description: (0, zod_1.string)(),
    }),
};
const todoPayload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)().min(1, "Title too short, should be 1 chars minimum"),
        complete: (0, zod_1.boolean)(),
    })
        .partial()
        .refine((obj) => Object.values(obj).some((v) => v !== undefined)),
};
const params = {
    params: (0, zod_1.object)({
        todolistId: (0, zod_1.string)({
            required_error: "Id is required",
        }),
    }),
};
const todoParam = {
    params: (0, zod_1.object)({
        todolistId: (0, zod_1.string)({
            required_error: "Id is required",
        }),
        todoId: (0, zod_1.string)({
            required_error: "Id is required",
        }),
    }),
};
exports.createTodolistSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateTodolistSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteTodoSchema = (0, zod_1.object)(Object.assign({}, todoParam));
exports.getTodoSchema = (0, zod_1.object)(Object.assign({}, todoParam));
exports.updateTodoSchema = (0, zod_1.object)(Object.assign({}, todoParam));
exports.deleteTodolistSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getTodolistSchema = (0, zod_1.object)(Object.assign({}, params));
exports.createTodoSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), todoPayload));
