import { boolean, date, object, string, TypeOf } from "zod";
const payload = {
  body: object({
    user: string(),
    title: string({
      required_error: "Title is required",
    }),
    description: string(),
    valid: boolean(),
  }),
};

const params = {
  params: object({
    todolistId: string({
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

export const deleteTodolistSchema = object({
  ...params,
});

export const getTodolistSchema = object({
  ...params,
});

export type CreateTodolistInput = TypeOf<typeof createTodolistSchema>;
export type UpdateTodolistInput = TypeOf<typeof updateTodolistSchema>;
export type GetTodolistInput = TypeOf<typeof getTodolistSchema>;
export type DeleteTodolistInput = TypeOf<typeof deleteTodolistSchema>;
