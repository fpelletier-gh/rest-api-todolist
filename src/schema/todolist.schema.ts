import { boolean, date, object, string, TypeOf } from "zod";
const payload = {
  body: object({
    user: string(),
    title: string({
      required_error: "Title is required",
    }),
    description: string(),
    /* todos: array( */
    /*   object({ */
    /*     title: string(), */
    /*     complete: boolean(), */
    /*     createdAt: date(), */
    /*     updatedAt: date(), */
    /*   }) */
    /* ), */
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

export const getTodolistSchema = object({
  ...params,
});

export type CreateTodolistInput = TypeOf<typeof createTodolistSchema>;
export type GetTodolistInput = TypeOf<typeof getTodolistSchema>;
