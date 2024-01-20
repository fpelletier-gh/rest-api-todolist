import { Request, Response } from "express";
import { merge, omit } from "lodash";
import {
  CreateTodolistInput,
  DeleteTodoInput,
  DeleteTodolistInput,
  GetTodoInput,
  GetTodolistInput,
  UpdateTodolistInput,
} from "../schema/todolist.schema";
import {
  createTodolist,
  deleteTodolist,
  findAndUpdateTodolist,
  findAndCreateTodo,
  findTodolist,
  findAndDeleteTodo,
  findAndUpdateTodo,
  findAllTodolist,
} from "../service/todolist.service";
import logger from "../utils/logger";

export async function createTodolistHandler(
  req: Request<{}, {}, CreateTodolistInput["body"]>,
  res: Response
) {
  // #swagger.summary = 'Create a new todolist.'
  // #swagger.summary = 'Create a new todolist.'
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information needed to create a session.',
      schema: { $ref: '#/definitions/CreateTodolist' }
  } */
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/CreateTodolistResponse' }
  } */
  const userId = res.locals.user._id;

  const body = req.body;

  const todolist = await createTodolist({ ...body, user: userId });

  return res.send(todolist);
}

export async function getAllTodolistHandler(req: Request, res: Response) {
  // #swagger.summary = 'Get all todolists.'
  // #swagger.summary = 'Get all todolists.'
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/GetAllTodolistResponse' }
  } */
  const userId = res.locals.user._id;

  if (!userId) {
    return res.status(403).send("Unauthorized");
  }

  const todolists = await findAllTodolist({ user: userId });

  return res.send(
    todolists.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  );
}

export async function getTodolistHandler(
  req: Request<GetTodolistInput["params"]>,
  res: Response
) {
  // #swagger.summary = 'Get a todolist.'
  // #swagger.description = 'Get a todolist.'
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/CreateTodolistResponse' }
  } */
  const todolistId = req.params.todolistId;
  const todolist = await findTodolist({ todolistId });

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  return res.send(todolist);
}

export async function deleteTodolistHandler(
  req: Request<DeleteTodolistInput["params"]>,
  res: Response
) {
  // #swagger.summary = 'Delete a todolist.'
  // #swagger.description = 'Delete a todolist.'
  const userId = res.locals.user._id;
  const todolistId = req.params.todolistId;

  const todolist = await findTodolist({ todolistId: todolistId });

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  if (String(todolist.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  try {
    await deleteTodolist({ todolistId: todolistId });

    return res.sendStatus(200);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}

export async function updateTodolistHandler(
  req: Request<UpdateTodolistInput["params"]>,
  res: Response
) {
  // #swagger.summary = 'Update a todolist.'
  // #swagger.description = 'Update a todolist.'
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information needed to update a todolist.',
      schema: { $ref: '#/definitions/UpdateTodolist' }
  } */
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/CreateTodolistResponse' }
  } */
  const userId = res.locals.user._id;

  const todolistId = req.params.todolistId;
  const update = req.body;

  const todolist = await findTodolist({ todolistId: todolistId });

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  if (String(todolist.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const updatedTodolist = await findAndUpdateTodolist(
      { todolistId: todolistId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedTodolist);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}

export async function createTodoHandler(
  req: Request<UpdateTodolistInput["params"]>,
  res: Response
) {
  // #swagger.summary = 'Create a todo.'
  // #swagger.description = 'Create a todo.'
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information needed to create a todo.',
      schema: { $ref: '#/definitions/CreateTodo' }
  } */
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/CreateTodoResponse' }
  } */
  const userId = res.locals.user._id;

  const todolistId = req.params.todolistId;
  const update = req.body;

  const todolist = await findTodolist({ todolistId: todolistId });

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  if (String(todolist.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const updatedTodolist = await findAndCreateTodo(
      { todolistId: todolistId },
      update,
      {
        new: true,
      }
    );

    if (updatedTodolist) {
      const newTodoId = updatedTodolist.todos.length - 1;
      const newTodo = updatedTodolist.todos[newTodoId];
      return res.send(newTodo);
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}

export async function getTodoHandler(
  req: Request<GetTodoInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const todolistId = req.params.todolistId;
  const todoId = req.params.todoId;

  const todolist = await findTodolist({ todolistId: todolistId });
  const todo = todolist?.todos.find((todo) => todo.todoId === todoId);

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  if (!todo) {
    return res.status(404).send("Todo does not exist");
  }

  if (String(todolist.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  return res.send(todo);
}

export async function deleteTodoHandler(
  req: Request<DeleteTodoInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const todolistId = req.params.todolistId;
  const todoId = req.params.todoId;

  const todolist = await findTodolist({ todolistId: todolistId });
  const todo = todolist?.todos.find((todo) => todo.todoId === todoId);

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  if (!todo) {
    return res.status(404).send("Todo does not exist");
  }

  if (String(todolist.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const updatedTodolist = await findAndDeleteTodo(
      { todolistId: todolistId },
      { todoId: todoId },
      { new: true }
    );

    return res.send(updatedTodolist);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}

export async function updateTodoHandler(
  req: Request<DeleteTodoInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const todolistId = req.params.todolistId;
  const todoId = req.params.todoId;

  const todolist = await findTodolist({ todolistId: todolistId });
  const todo = todolist?.todos.find((todo) => todo.todoId === todoId);

  if (!todolist) {
    return res.status(404).send("Todolist does not exist");
  }

  if (!todo) {
    return res.status(404).send("Todo does not exist");
  }

  if (String(todolist.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  const filteredTodo = omit(todo, ["createdAt", "updatedAt", "_id", "todoId"]);
  const update = merge(filteredTodo, req.body);

  try {
    const updatedTodolist = await findAndUpdateTodo(
      { todolisId: todolistId, "todos.todoId": todoId },
      update,
      { new: true }
    );

    const updatedTodo = updatedTodolist?.todos.find(
      (todo) => todo.todoId === todoId
    );

    return res.send(updatedTodo);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}
