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
exports.updateNoteHandler = exports.deleteNoteHandler = exports.getNoteHandler = exports.getAllNoteHandler = exports.createNoteHandler = void 0;
const note_service_1 = require("../service/note.service");
const logger_1 = __importDefault(require("../utils/logger"));
function createNoteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const note = yield (0, note_service_1.createNote)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(note);
    });
}
exports.createNoteHandler = createNoteHandler;
function getAllNoteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        if (!userId) {
            return res.status(403).send("Unauthorized");
        }
        const notes = yield (0, note_service_1.findAllNote)({ user: userId });
        return res.send(notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
    });
}
exports.getAllNoteHandler = getAllNoteHandler;
function getNoteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const noteId = req.params.noteId;
        const note = yield (0, note_service_1.findNote)({ noteId });
        if (!note) {
            return res.status(404).send("Note does not exist");
        }
        return res.send(note);
    });
}
exports.getNoteHandler = getNoteHandler;
function deleteNoteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const noteId = req.params.noteId;
        const note = yield (0, note_service_1.findNote)({ noteId: noteId });
        if (!note) {
            return res.status(404).send("Note does not exist");
        }
        if (String(note.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        try {
            yield (0, note_service_1.deleteNote)({ noteId: noteId });
            return res.sendStatus(200);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.deleteNoteHandler = deleteNoteHandler;
function updateNoteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const noteId = req.params.noteId;
        const update = req.body;
        const note = yield (0, note_service_1.findNote)({ noteId: noteId });
        if (!note) {
            return res.status(404).send("Note does not exist");
        }
        if (String(note.user) !== userId) {
            return res.status(403).send("Unauthorized");
        }
        try {
            const updatedNote = yield (0, note_service_1.findAndUpdateNote)({ noteId: noteId }, update, {
                new: true,
            });
            return res.send(updatedNote);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.updateNoteHandler = updateNoteHandler;
