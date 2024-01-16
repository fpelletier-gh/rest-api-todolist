"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_controller_1 = require("./controller/note.controller");
const session_controller_1 = require("./controller/session.controller");
const todolist_controller_1 = require("./controller/todolist.controller");
const user_controller_1 = require("./controller/user.controller");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const note_schema_1 = require("./schema/note.schema");
const session_schema_1 = require("./schema/session.schema");
const todolist_schema_1 = require("./schema/todolist.schema");
const user_schema_1 = require("./schema/user.schema");
function routes(app) {
    app.get("/api/healtcheck", (req, res) => res.sendStatus(200));
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.get("/api/users", requireUser_1.default, user_controller_1.getCurrentUserHandler);
    app.delete("/api/users", requireUser_1.default, user_controller_1.deleteCurrentUserHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteUserSessionHandler);
    app.post("/api/todolist", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.createTodolistSchema)], todolist_controller_1.createTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.put("/api/todolist/:todolistId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.updateTodolistSchema)], todolist_controller_1.updateTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.get("/api/todolist", requireUser_1.default, todolist_controller_1.getAllTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.get("/api/todolist/:todolistId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.getTodolistSchema)], todolist_controller_1.getTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.delete("/api/todolist/:todolistId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.deleteTodolistSchema)], todolist_controller_1.deleteTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.post("/api/todolist/:todolistId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.createTodoSchema)], todolist_controller_1.createTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.get("/api/todolist/:todolistId/:todoId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.getTodoSchema)], todolist_controller_1.getTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.delete("/api/todolist/:todolistId/:todoId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.deleteTodoSchema)], todolist_controller_1.deleteTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.put("/api/todolist/:todolistId/:todoId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.updateTodoSchema)], todolist_controller_1.updateTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.post("/api/note", [requireUser_1.default, (0, validateResource_1.default)(note_schema_1.createNoteSchema)], note_controller_1.createNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.put("/api/note/:noteId", [requireUser_1.default, (0, validateResource_1.default)(note_schema_1.updateNoteSchema)], note_controller_1.updateNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.get("/api/note", requireUser_1.default, note_controller_1.getAllNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.get("/api/note/:noteId", [requireUser_1.default, (0, validateResource_1.default)(note_schema_1.getNoteSchema)], note_controller_1.getNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.delete("/api/note/:noteId", [requireUser_1.default, (0, validateResource_1.default)(note_schema_1.deleteNoteSchema)], note_controller_1.deleteNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
    app.post("/api/note/:noteId", [requireUser_1.default, (0, validateResource_1.default)(todolist_schema_1.createTodoSchema)], todolist_controller_1.createTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
    );
}
exports.default = routes;
