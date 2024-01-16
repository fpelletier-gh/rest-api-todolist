"use strict";
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
exports.updateTodoHandler = exports.deleteTodoHandler = exports.getTodoHandler = exports.createTodoHandler = exports.updateTodolistHandler = exports.deleteTodolistHandler = exports.getTodolistHandler = exports.getAllTodolistHandler = exports.createTodolistHandler = void 0;
const lodash_1 = require("lodash");
const todolist_service_1 = require("../service/todolist.service");
const logger_1 = __importDefault(require("../utils/logger"));
function createTodolistHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const todolist = yield (0, todolist_service_1.createTodolist)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(todolist);
    });
}
exports.createTodolistHandler = createTodolistHandler;
function getAllTodolistHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        if (!userId) {
            return res.status(403).send("Unauthorized");
        }
        const todolists = yield (0, todolist_service_1.findAllTodolist)({ user: userId });
        return res.send(todolists.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
    });
}
exports.getAllTodolistHandler = getAllTodolistHandler;
function getTodolistHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const todolistId = req.params.todolistId;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId });
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        return res.send(todolist);
    });
}
exports.getTodolistHandler = getTodolistHandler;
function deleteTodolistHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const todolistId = req.params.todolistId;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId: todolistId });
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        if (String(todolist.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        try {
            yield (0, todolist_service_1.deleteTodolist)({ todolistId: todolistId });
            return res.sendStatus(200);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.deleteTodolistHandler = deleteTodolistHandler;
function updateTodolistHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const todolistId = req.params.todolistId;
        const update = req.body;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId: todolistId });
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        if (String(todolist.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        try {
            const updatedTodolist = yield (0, todolist_service_1.findAndUpdateTodolist)({ todolistId: todolistId }, update, {
                new: true,
            });
            return res.send(updatedTodolist);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.updateTodolistHandler = updateTodolistHandler;
function createTodoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const todolistId = req.params.todolistId;
        const update = req.body;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId: todolistId });
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        if (String(todolist.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        try {
            const updatedTodolist = yield (0, todolist_service_1.findAndCreateTodo)({ todolistId: todolistId }, update, {
                new: true,
            });
            if (updatedTodolist) {
                const newTodoId = updatedTodolist.todos.length - 1;
                const newTodo = updatedTodolist.todos[newTodoId];
                return res.send(newTodo);
            }
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.createTodoHandler = createTodoHandler;
function getTodoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const todolistId = req.params.todolistId;
        const todoId = req.params.todoId;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId: todolistId });
        const todo = todolist === null || todolist === void 0 ? void 0 : todolist.todos.find((todo) => todo.todoId === todoId);
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        if (!todo) {
            return res.status(404).send("Todo does not exist");
        }
        if (String(todolist.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        return res.send(todo);
    });
}
exports.getTodoHandler = getTodoHandler;
function deleteTodoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const todolistId = req.params.todolistId;
        const todoId = req.params.todoId;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId: todolistId });
        const todo = todolist === null || todolist === void 0 ? void 0 : todolist.todos.find((todo) => todo.todoId === todoId);
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        if (!todo) {
            return res.status(404).send("Todo does not exist");
        }
        if (String(todolist.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        try {
            const updatedTodolist = yield (0, todolist_service_1.findAndDeleteTodo)({ todolistId: todolistId }, { todoId: todoId }, { new: true });
            return res.send(updatedTodolist);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.deleteTodoHandler = deleteTodoHandler;
function updateTodoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const todolistId = req.params.todolistId;
        const todoId = req.params.todoId;
        const todolist = yield (0, todolist_service_1.findTodolist)({ todolistId: todolistId });
        const todo = todolist === null || todolist === void 0 ? void 0 : todolist.todos.find((todo) => todo.todoId === todoId);
        if (!todolist) {
            return res.status(404).send("Todolist does not exist");
        }
        if (!todo) {
            return res.status(404).send("Todo does not exist");
        }
        if (String(todolist.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        const filteredTodo = (0, lodash_1.omit)(todo, ["createdAt", "updatedAt", "_id", "todoId"]);
        const update = (0, lodash_1.merge)(filteredTodo, req.body);
        try {
            const updatedTodolist = yield (0, todolist_service_1.findAndUpdateTodo)({ todolisId: todolistId, "todos.todoId": todoId }, update, { new: true });
            const updatedTodo = updatedTodolist === null || updatedTodolist === void 0 ? void 0 : updatedTodolist.todos.find((todo) => todo.todoId === todoId);
            return res.send(updatedTodo);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.updateTodoHandler = updateTodoHandler;
