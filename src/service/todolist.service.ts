import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import TodolistModel, { TodolistDocument } from "../models/todolist.model";

export async function createTodolist(
  input: DocumentDefinition<
    Omit<
      TodolistDocument,
      "createdAt" | "updatedAt" | "todolistId" | "todos" | "valid" | "favorite"
    >
  >
) {
  const todoList = await TodolistModel.create(input);

  return todoList.toJSON();
}

export async function findAllTodolist(query: FilterQuery<TodolistDocument>) {
  return TodolistModel.find(query).lean();
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

export async function deleteTodolists(query: FilterQuery<TodolistDocument>) {
  return TodolistModel.deleteMany(query);
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

export async function findAndUpdateTodo(
  query: FilterQuery<TodolistDocument>,
  update: UpdateQuery<TodolistDocument>,
  options: QueryOptions
) {
  const setUpdate = {
    $set: {
      "todos.$.title": update.title,
      "todos.$.complete": update.complete,
    },
  };
  return TodolistModel.findOneAndUpdate(query, setUpdate, options);
}
