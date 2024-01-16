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
exports.deleteNotes = exports.deleteNote = exports.findAndUpdateNote = exports.findNote = exports.findAllNote = exports.createNote = void 0;
const note_model_1 = __importDefault(require("../models/note.model"));
function createNote(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield note_model_1.default.create(input);
        return note.toJSON();
    });
}
exports.createNote = createNote;
function findAllNote(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return note_model_1.default.find(query).lean();
    });
}
exports.findAllNote = findAllNote;
function findNote(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return note_model_1.default.findOne(query).lean();
    });
}
exports.findNote = findNote;
function findAndUpdateNote(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return note_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateNote = findAndUpdateNote;
function deleteNote(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return note_model_1.default.deleteOne(query);
    });
}
exports.deleteNote = deleteNote;
function deleteNotes(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return note_model_1.default.deleteMany(query);
    });
}
exports.deleteNotes = deleteNotes;
