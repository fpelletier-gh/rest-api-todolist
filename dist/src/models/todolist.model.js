"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const TodoSchema = new mongoose_1.default.Schema({
    todoId: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        default: () => `todo_${(0, uuid_1.v4)()}`,
    },
    title: { type: String, required: true },
    complete: { type: Boolean, default: false },
}, { timestamps: true });
const TodolistSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    todolistId: {
        type: String,
        required: true,
        unique: true,
        default: () => `todolist_${(0, uuid_1.v4)()}`,
    },
    title: { type: String, required: true },
    description: { type: String },
    todos: [TodoSchema],
    valid: { type: Boolean, default: true },
    favorite: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const TodolistModel = mongoose_1.default.model("Todolist", TodolistSchema);
exports.default = TodolistModel;
