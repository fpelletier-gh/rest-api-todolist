import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import TodolistModel, {
  TodoDocument,
  TodolistDocument,
} from "../models/todolist.model";

export async function createTodolist(
  input: DocumentDefinition<
    Omit<TodolistDocument, "createdAt" | "updatedAt" | "todolistId" | "todos">
  >
) {
  const todoList = await TodolistModel.create(input);

  return todoList.toJSON();
}

export async function findTodolist(query: FilterQuery<TodolistDocument>) {
  return TodolistModel.findOne(query).lean();
}

export async function findAndUpdateTodolist(
  query: FilterQuery<TodolistDocument>,
  update: UpdateQuery<TodolistDocument>,
  options: QueryOptions
) {
  return TodolistModel.findOneAndUpdate(query, update, options);
}

export async function deleteTodolist(query: FilterQuery<TodolistDocument>) {
  return TodolistModel.deleteOne(query);
}

export async function findAndDeleteTodo(
  query: FilterQuery<TodolistDocument>,
  todoId: UpdateQuery<TodolistDocument>,
  options: QueryOptions
) {
  const update = {
    $pull: {
      todos: todoId,
    },
  };
  return TodolistModel.findOneAndUpdate(query, update, options);
}

export async function findAndCreateTodo(
  query: FilterQuery<TodolistDocument>,
  update: UpdateQuery<TodolistDocument>,
  options: QueryOptions
) {
  const pushUpdate = {
    $push: {
      todos: update,
    },
  };
  return TodolistModel.findOneAndUpdate(query, pushUpdate, options);
}
