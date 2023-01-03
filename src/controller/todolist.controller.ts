import { Request, Response } from "express";
import {
  CreateTodolistInput,
  DeleteTodolistInput,
  GetTodolistInput,
  UpdateTodolistInput,
} from "../schema/todolist.schema";
import {
  createTodolist,
  deleteTodolist,
  findAndUpdateTodolist,
  findTodolist,
} from "../service/todolist.service";

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

export async function deleteTodolistHandler(
  req: Request<DeleteTodolistInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const todolistId = req.params.todolistId;

  const todolist = await findTodolist({ todolistId: todolistId });

  if (!todolist) {
    return res.sendStatus(404);
  }

  if (String(todolist.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteTodolist({ todolistId: todolistId });

  return res.sendStatus(200);
}

export async function updateTodolistHandler(
  req: Request<UpdateTodolistInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const todolistId = req.params.todolistId;
  const update = req.body;

  const todolist = await findTodolist({ todolistId: todolistId });

  if (!todolist) {
    return res.sendStatus(404);
  }

  if (String(todolist.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedTodolist = await findAndUpdateTodolist(
    { todolistId: todolistId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedTodolist);
}
