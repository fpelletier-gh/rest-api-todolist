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

export const createTodolistSchema = object({
  ...payload,
});

export type CreateTodolistInput = TypeOf<typeof createTodolistSchema>;
