import { boolean, object, string, TypeOf } from "zod";
const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }).min(1, "Title too short, should be 1 chars minimum"),
    content: string(),
  }),
};

const params = {
  params: object({
    noteId: string({
      required_error: "Id is required",
    }),
  }),
};

export const createNoteSchema = object({
  ...payload,
});

export const updateNoteSchema = object({
  ...payload,
  ...params,
});

export const deleteNoteSchema = object({
  ...params,
});

export const getNoteSchema = object({
  ...params,
});

export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
export type GetNoteInput = TypeOf<typeof getNoteSchema>;
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
export type DeleteNoteInput = TypeOf<typeof deleteNoteSchema>;
