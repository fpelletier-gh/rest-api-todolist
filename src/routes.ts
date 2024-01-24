import { Express, Request, Response } from "express";
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNoteHandler,
  getNoteHandler,
  updateNoteHandler,
} from "./controller/note.controller";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import {
  createTodoHandler,
  createTodolistHandler,
  deleteTodoHandler,
  deleteTodolistHandler,
  getAllTodolistHandler,
  getTodoHandler,
  getTodolistHandler,
  updateTodoHandler,
  updateTodolistHandler,
} from "./controller/todolist.controller";
import {
  createUserHandler,
  deleteCurrentUserHandler,
  getCurrentUserHandler,
} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createNoteSchema,
  deleteNoteSchema,
  getNoteSchema,
  updateNoteSchema,
} from "./schema/note.schema";
import { createSessionSchema } from "./schema/session.schema";
import {
  createTodolistSchema,
  createTodoSchema,
  deleteTodolistSchema,
  deleteTodoSchema,
  getTodolistSchema,
  getTodoSchema,
  updateTodolistSchema,
  updateTodoSchema,
} from "./schema/todolist.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/api/healtcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.get("/api/users", requireUser, getCurrentUserHandler);

  app.delete("/api/users", requireUser, deleteCurrentUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);

  app.post(
    "/api/todolist",
    [requireUser, validateResource(createTodolistSchema)],
    createTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.put(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(updateTodolistSchema)],
    updateTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.get("/api/todolist", requireUser, getAllTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.get(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(getTodolistSchema)],
    getTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.delete(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(deleteTodolistSchema)],
    deleteTodolistHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.post(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(createTodoSchema)],
    createTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.get(
    "/api/todolist/:todolistId/:todoId",
    [requireUser, validateResource(getTodoSchema)],
    getTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.delete(
    "/api/todolist/:todolistId/:todoId",
    [requireUser, validateResource(deleteTodoSchema)],
    deleteTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.put(
    "/api/todolist/:todolistId/:todoId",
    [requireUser, validateResource(updateTodoSchema)],
    updateTodoHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.post(
    "/api/note",
    [requireUser, validateResource(createNoteSchema)],
    createNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.put(
    "/api/note/:noteId",
    [requireUser, validateResource(updateNoteSchema)],
    updateNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.get("/api/note", requireUser, getAllNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.get(
    "/api/note/:noteId",
    [requireUser, validateResource(getNoteSchema)],
    getNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );

  app.delete(
    "/api/note/:noteId",
    [requireUser, validateResource(deleteNoteSchema)],
    deleteNoteHandler
    /* #swagger.security = [
      { "apiKeyAccessToken": [] },
      { "apiKeyRefreshToken": [] },
      { "apiKeyAccessTokenCookie": [] },
      { "apiKeyRefreshTokenCookie": [] }
    ] */
  );
}

export default routes;
