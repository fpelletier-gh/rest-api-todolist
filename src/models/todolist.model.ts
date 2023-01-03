import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { v4 as uuidv4 } from "uuid";

export interface TodolistDocument extends mongoose.Document {
  user: UserDocument["_id"];
  todolistId: string;
  title: string;
  description: string;
  /* todos: [TodoDocument]; */
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodolistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    todolistId: {
      type: String,
      required: true,
      unique: true,
      default: () => `todolist_${uuidv4()}`,
    },
    title: { type: String, required: true },
    description: { type: String },
    /* todos: [TodoSchema], */
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const TodolistModel = mongoose.model<TodolistDocument>(
  "Todolist",
  TodolistSchema
);

export default TodolistModel;
