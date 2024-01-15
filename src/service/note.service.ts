import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import NoteModel, { NoteDocument } from "../models/note.model";

export async function createNote(
  input: DocumentDefinition<
    Omit<
      NoteDocument,
      "createdAt" | "updatedAt" | "noteId" | "valid" | "favorite"
    >
  >
) {
  const note = await NoteModel.create(input);

  return note.toJSON();
}

export async function findAllNote(query: FilterQuery<NoteDocument>) {
  return NoteModel.find(query).lean();
}

export async function findNote(query: FilterQuery<NoteDocument>) {
  return NoteModel.findOne(query).lean();
}

export async function findAndUpdateNote(
  query: FilterQuery<NoteDocument>,
  update: UpdateQuery<NoteDocument>,
  options: QueryOptions
) {
  return NoteModel.findOneAndUpdate(query, update, options);
}

export async function deleteNote(query: FilterQuery<NoteDocument>) {
  return NoteModel.deleteOne(query);
}

export async function deleteNotes(query: FilterQuery<NoteDocument>) {
  return NoteModel.deleteMany(query);
}