import { boolean, object, string, TypeOf } from "zod";
const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }).min(1, "Title too short, should be 1 chars minimum"),
    description: string(),
  }),
};

const todoPayload = {
  body: object({
    title: string().min(1, "Title too short, should be 1 chars minimum"),
    complete: boolean(),
  })
    .partial()
    .refine((obj) => Object.values(obj).some((v) => v !== undefined)),
};

const params = {
  params: object({
    todolistId: string({
      required_error: "Id is required",
    }),
  }),
};

const todoParam = {
  params: object({
    todolistId: string({
      required_error: "Id is required",
    }),
    todoId: string({
      required_error: "Id is required",
    }),
  }),
};

export const createTodolistSchema = object({
  ...payload,
});

export const updateTodolistSchema = object({
  ...payload,
  ...params,
});

export const deleteTodoSchema = object({
  ...todoParam,
});

export const getTodoSchema = object({
  ...todoParam,
});

export const updateTodoSchema = object({
  ...todoParam,
});

export const deleteTodolistSchema = object({
  ...params,
});

export const getTodolistSchema = object({
  ...params,
});

export const createTodoSchema = object({
  ...params,
  ...todoPayload,
});

export type CreateTodolistInput = TypeOf<typeof createTodolistSchema>;
export type UpdateTodolistInput = TypeOf<typeof updateTodolistSchema>;
export type GetTodolistInput = TypeOf<typeof getTodolistSchema>;
export type DeleteTodolistInput = TypeOf<typeof deleteTodolistSchema>;
export type CreateTodoInput = TypeOf<typeof createTodoSchema>;
export type DeleteTodoInput = TypeOf<typeof deleteTodoSchema>;
export type GetTodoInput = TypeOf<typeof getTodoSchema>;
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>;
