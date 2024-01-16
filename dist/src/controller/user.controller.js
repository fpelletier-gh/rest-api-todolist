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
exports.deleteCurrentUserHandler = exports.getCurrentUserHandler = exports.createUserHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const user_service_1 = require("../service/user.service");
const lodash_1 = require("lodash");
const session_service_1 = require("../service/session.service");
const todolist_service_1 = require("../service/todolist.service");
const note_service_1 = require("../service/note.service");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.summary = 'Create a new user.'
        // #swagger.description = 'Create a new user.'
        /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Information about the user.',
          schema: { $ref: '#/definitions/CreateUser' }
        } */
        /* #swagger.responses[200] = {
          description: 'successful operation',
          schema: { $ref: '#/definitions/GetUserResponse' }
        } */
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            return res.send(user);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createUserHandler = createUserHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* #swagger.security = [
          { "apiKeyAccessToken": [] },
          { "apiKeyRefreshToken": [] },
          { "apiKeyAccessTokenCookie": [] },
          { "apiKeyRefreshTokenCookie": [] }
        ] */
        // #swagger.summary = 'Get current user.'
        // #swagger.description = 'Get current user.'
        /* #swagger.responses[200] = {
          description: 'successful operation',
          schema: { $ref: '#/definitions/GetUserResponse' }
        } */
        const user = (0, lodash_1.omit)(res.locals.user, ["password", "__v"]);
        return res.send(user);
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
function deleteCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* #swagger.security = [
          { "apiKeyAccessToken": [] },
          { "apiKeyRefreshToken": [] },
          { "apiKeyAccessTokenCookie": [] },
          { "apiKeyRefreshTokenCookie": [] }
        ] */
        // #swagger.summary = 'Delete current user.'
        // #swagger.description = 'Delete current user.'
        const userId = res.locals.user._id;
        try {
            yield (0, session_service_1.deleteSessions)({ user: userId });
            yield (0, todolist_service_1.deleteTodolists)({ user: userId });
            yield (0, note_service_1.deleteNotes)({ user: userId });
            yield (0, user_service_1.deleteUser)({ _id: userId });
            return res.sendStatus(200);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send("Something went wrong, please try again");
        }
    });
}
exports.deleteCurrentUserHandler = deleteCurrentUserHandler;
