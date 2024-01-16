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
exports.deleteUserSessionHandler = exports.getUserSessionHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.summary = 'Create a new user session.'
        // #swagger.description = 'Create a new user session.'
        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Information needed to create a session.',
            schema: { $ref: '#/definitions/CreateSession' }
        } */
        /* #swagger.responses[200] = {
          description: 'successful operation',
          schema: { $ref: '#/definitions/CreateSessionResponse' }
        } */
        // Validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        // Create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        // Create an access token
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get("accessTokenExpiration") });
        // Create a refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get("refreshTokenExpiration") });
        const currentUser = (0, lodash_1.omit)(user, "__v");
        // return access and refresh tokens
        return res.send({ accessToken, refreshToken, user: currentUser });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* #swagger.security = [
          { "apiKeyAccessToken": [] },
          { "apiKeyRefreshToken": [] },
          { "apiKeyAccessTokenCookie": [] },
          { "apiKeyRefreshTokenCookie": [] }
        ] */
        // #swagger.summary = 'Get current user session.'
        // #swagger.description = 'Get current user session.'
        /* #swagger.responses[200] = {
          description: 'successful operation',
          schema: { $ref: '#/definitions/GetSessionResponse' }
        } */
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
function deleteUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* #swagger.security = [
          { "apiKeyAccessToken": [] },
          { "apiKeyRefreshToken": [] },
          { "apiKeyAccessTokenCookie": [] },
          { "apiKeyRefreshTokenCookie": [] }
        ] */
        // #swagger.summary = 'Delete current user session.'
        // #swagger.description = 'Delete current user session.'
        /* #swagger.responses[200] = {
          description: 'successful operation',
          schema: { $ref: '#/definitions/DeleteSessionResponse' }
        } */
        const sessionId = res.locals.user.session;
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null,
        });
    });
}
exports.deleteUserSessionHandler = deleteUserSessionHandler;
