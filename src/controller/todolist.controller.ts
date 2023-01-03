import { Request, Response } from "express";
import {
  CreateTodolistInput,
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
