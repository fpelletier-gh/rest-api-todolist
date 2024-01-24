import { Request, Response } from "express";
import {
  CreateNoteInput,
  DeleteNoteInput,
  GetNoteInput,
  UpdateNoteInput,
} from "../schema/note.schema";
import {
  createNote,
  deleteNote,
  findAndUpdateNote,
  findNote,
  findAllNote,
} from "../service/note.service";
import logger from "../utils/logger";

export async function createNoteHandler(
  req: Request<{}, {}, CreateNoteInput["body"]>,
  res: Response
) {
  // #swagger.summary = 'Create a new note.'
  // #swagger.description = 'Create a new note.'
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information needed to create a note.',
      schema: { $ref: '#/definitions/CreateNote' }
  } */
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/CreateNoteResponse' }
  } */
  const userId = res.locals.user._id;

  const body = req.body;

  const note = await createNote({ ...body, user: userId });

  return res.send(note);
}

export async function getAllNoteHandler(req: Request, res: Response) {
  // #swagger.summary = 'Get all notes.'
  // #swagger.description = 'Get all notes.'
  /* #swagger.responses[200] = {
    description: 'successful operation',
    schema: { $ref: '#/definitions/GetAllNoteResponse' }
  } */
  const userId = res.locals.user._id;

  if (!userId) {
    return res.status(403).send("Unauthorized");
  }

  const notes = await findAllNote({ user: userId });

  return res.send(
    notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  );
}

export async function getNoteHandler(
  req: Request<GetNoteInput["params"]>,
  res: Response
) {
  const noteId = req.params.noteId;
  const note = await findNote({ noteId });

  if (!note) {
    return res.status(404).send("Note does not exist");
  }

  return res.send(note);
}

export async function deleteNoteHandler(
  req: Request<DeleteNoteInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;

  const note = await findNote({ noteId: noteId });

  if (!note) {
    return res.status(404).send("Note does not exist");
  }

  if (String(note.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  try {
    await deleteNote({ noteId: noteId });

    return res.sendStatus(200);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}

export async function updateNoteHandler(
  req: Request<UpdateNoteInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const noteId = req.params.noteId;
  const update = req.body;

  const note = await findNote({ noteId: noteId });

  if (!note) {
    return res.status(404).send("Note does not exist");
  }

  if (String(note.user) !== userId) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const updatedNote = await findAndUpdateNote({ noteId: noteId }, update, {
      new: true,
    });

    return res.send(updatedNote);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send("Something went wrong, please try again");
  }
}
