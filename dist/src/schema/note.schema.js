"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteSchema = exports.deleteNoteSchema = exports.updateNoteSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }).min(1, "Title too short, should be 1 chars minimum"),
        content: (0, zod_1.string)(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        noteId: (0, zod_1.string)({
            required_error: "Id is required",
        }),
    }),
};
exports.createNoteSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateNoteSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteNoteSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getNoteSchema = (0, zod_1.object)(Object.assign({}, params));
