import { Request, Response } from "express";
import {
  CreateTodolistInput,
  GetTodolistInput,
} from "../schema/todolist.schema";
import { createTodolist, findTodolist } from "../service/todolist.service";

export async function createTodolistHandler(
  req: Request<{}, {}, CreateTodolistInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const todolist = await createTodolist({ ...body, user: userId });

  return res.send(todolist);
}

export async function getTodolistHandler(
  req: Request<GetTodolistInput["params"]>,
  res: Response
) {
  const todolistId = req.params.todolistId;
  const todolist = await findTodolist({ todolistId });

  if (!todolist) {
    return res.sendStatus(404);
  }

  return res.send(todolist);
}
