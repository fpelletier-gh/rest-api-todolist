import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import {
  createTodolistHandler,
  deleteTodolistHandler,
  getTodolistHandler,
  updateTodolistHandler,
} from "./controller/todolist.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import {
  createTodolistSchema,
  deleteTodolistSchema,
  getTodolistSchema,
  updateTodolistSchema,
} from "./schema/todolist.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/healtcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

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
  );

  app.put(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(updateTodolistSchema)],
    updateTodolistHandler
  );

  app.get(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(getTodolistSchema)],
    getTodolistHandler
  );

  app.delete(
    "/api/todolist/:todolistId",
    [requireUser, validateResource(deleteTodolistSchema)],
    deleteTodolistHandler
  );
}

export default routes;
