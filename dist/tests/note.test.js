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
exports.userPayload = exports.noteUpdatePayload = exports.secondNotePayload = exports.notePayload = void 0;
const supertest_1 = __importDefault(require("supertest"));
const UserService = __importStar(require("../src/service/user.service"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const server_1 = __importDefault(require("../src/utils/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const jwt_utils_1 = require("../src/utils/jwt.utils");
const note_service_1 = require("../src/service/note.service");
const app = (0, server_1.default)();
const userId = "65a1a3ec38986bebd77298eb";
exports.notePayload = {
    user: userId,
    title: "Note",
    content: "A note about groceries.",
};
exports.secondNotePayload = {
    user: userId,
    title: "Note two",
    content: "A second note about a note.",
};
exports.noteUpdatePayload = {
    user: userId,
    title: "Updated note",
    content: "An updated note about groceries.",
};
exports.userPayload = {
    _id: userId,
    email: "test@example.com",
    username: "John Smith",
};
describe("note", () => {
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
    describe("GET all note route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/note`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and no note", () => {
            it("should return a 200 status and an empty array", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/note`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual([]);
            }));
        });
        describe("given the user is logged in and one note exist", () => {
            it("should return a 200 status and an array with the note", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                yield (0, note_service_1.createNote)(exports.notePayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/note`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body[0]).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    noteId: expect.any(String),
                    title: "Note",
                    content: "A note about groceries.",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
        describe("given the user is logged in and more than one note exist", () => {
            it("should return a 200 status and an array with the notes", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                yield (0, note_service_1.createNote)(exports.notePayload);
                yield (0, note_service_1.createNote)(exports.secondNotePayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/note`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body.length).toBe(2);
                expect(body[0]).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    noteId: expect.any(String),
                    title: "Note two",
                    content: "A second note about a note.",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
                expect(body[1]).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    noteId: expect.any(String),
                    title: "Note",
                    content: "A note about groceries.",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
    describe("GET note route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/note/${invalidId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the note does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .get(`/api/note/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the note does exist", () => {
            it("should return a 200 status and the note", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const note = yield (0, note_service_1.createNote)(exports.notePayload);
                const noteId = note.noteId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .get(`/api/note/${noteId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
                expect(body.noteId).toBe(noteId);
            }));
        });
    });
    describe("POST create note route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .post("/api/note")
                    .send(exports.notePayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in", () => {
            it("should return a 200 and create the note", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .post("/api/note")
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.notePayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    noteId: expect.any(String),
                    title: "Note",
                    content: "A note about groceries.",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
    describe("DELETE note route", () => {
        describe("given the user is not logged in and the note does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).get(`/api/note/${invalidId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the note exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const note = yield (0, note_service_1.createNote)(exports.notePayload);
                const noteId = note.noteId;
                const { statusCode } = yield (0, supertest_1.default)(app).delete(`/api/note/${noteId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the note does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .delete(`/api/note/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the note does exist", () => {
            it("should return a 200 status", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const note = yield (0, note_service_1.createNote)(exports.notePayload);
                const noteId = note.noteId;
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .delete(`/api/note/${noteId}`)
                    .set("Authorization", `Bearer ${jwt}`);
                expect(statusCode).toBe(200);
            }));
        });
    });
    describe("PUT update note route", () => {
        describe("given the user is not logged in and the note does not exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const invalidId = "1";
                const { statusCode } = yield (0, supertest_1.default)(app).put(`/api/note/${invalidId}`);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is not logged in and the note exist", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const note = yield (0, note_service_1.createNote)(exports.notePayload);
                const noteId = note.noteId;
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/note/${noteId}`)
                    .send(exports.noteUpdatePayload);
                expect(statusCode).toBe(403);
            }));
        });
        describe("given the user is logged in and the note does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                const invalidid = "1";
                const { statusCode } = yield (0, supertest_1.default)(app)
                    .put(`/api/note/${invalidid}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.noteUpdatePayload);
                expect(statusCode).toBe(404);
            }));
        });
        describe("given the user is logged in and the note does exist", () => {
            it("should return a 200 status and the updated note", () => __awaiter(void 0, void 0, void 0, function* () {
                const jwt = (0, jwt_utils_1.signJwt)(exports.userPayload);
                // @ts-ignore
                const note = yield (0, note_service_1.createNote)(exports.notePayload);
                const noteId = note.noteId;
                const { statusCode, body } = yield (0, supertest_1.default)(app)
                    .put(`/api/note/${noteId}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(exports.noteUpdatePayload);
                expect(statusCode).toBe(200);
                expect(body).toEqual({
                    __v: expect.any(Number),
                    _id: expect.any(String),
                    user: expect.any(String),
                    noteId: expect.any(String),
                    title: "Updated note",
                    content: "An updated note about groceries.",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    valid: true,
                    favorite: false,
                });
            }));
        });
    });
});
