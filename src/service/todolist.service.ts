import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import TodolistModel, { TodolistDocument } from "../models/todolist.model";

export async function createTodolist(
  input: DocumentDefinition<
    Omit<TodolistDocument, "createdAt" | "updatedAt" | "todolistId">
  >
) {
  const todoList = await TodolistModel.create(input);

  return todoList.toJSON();
}

export async function findTodolist(query: FilterQuery<TodolistDocument>) {
  return TodolistModel.findOne(query).lean();
}
