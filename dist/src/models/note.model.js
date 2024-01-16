"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const NoteSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    noteId: {
        type: String,
        required: true,
        unique: true,
        default: () => `note_${(0, uuid_1.v4)()}`,
    },
    title: { type: String, required: true },
    content: { type: String },
    valid: { type: Boolean, default: true },
    favorite: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const NoteModel = mongoose_1.default.model("Note", NoteSchema);
exports.default = NoteModel;
