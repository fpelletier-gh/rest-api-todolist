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
exports.findAndUpdateTodo = exports.findAndCreateTodo = exports.findAndDeleteTodo = exports.deleteTodolists = exports.deleteTodolist = exports.findAndUpdateTodolist = exports.findTodolist = exports.findAllTodolist = exports.createTodolist = void 0;
const todolist_model_1 = __importDefault(require("../models/todolist.model"));
function createTodolist(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const todoList = yield todolist_model_1.default.create(input);
        return todoList.toJSON();
    });
}
exports.createTodolist = createTodolist;
function findAllTodolist(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return todolist_model_1.default.find(query).lean();
    });
}
exports.findAllTodolist = findAllTodolist;
function findTodolist(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return todolist_model_1.default.findOne(query).lean();
    });
}
exports.findTodolist = findTodolist;
function findAndUpdateTodolist(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return todolist_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateTodolist = findAndUpdateTodolist;
function deleteTodolist(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return todolist_model_1.default.deleteOne(query);
    });
}
exports.deleteTodolist = deleteTodolist;
function deleteTodolists(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return todolist_model_1.default.deleteMany(query);
    });
}
exports.deleteTodolists = deleteTodolists;
function findAndDeleteTodo(query, todoId, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = {
            $pull: {
                todos: todoId,
            },
        };
        return todolist_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndDeleteTodo = findAndDeleteTodo;
function findAndCreateTodo(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const pushUpdate = {
            $push: {
                todos: update,
            },
        };
        return todolist_model_1.default.findOneAndUpdate(query, pushUpdate, options);
    });
}
exports.findAndCreateTodo = findAndCreateTodo;
function findAndUpdateTodo(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const setUpdate = {
            $set: {
                "todos.$.title": update.title,
                "todos.$.complete": update.complete,
            },
        };
        return todolist_model_1.default.findOneAndUpdate(query, setUpdate, options);
    });
}
exports.findAndUpdateTodo = findAndUpdateTodo;
