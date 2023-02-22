import mongoose, { Types } from "mongoose";
import { UserDocument } from "./user.model";
import { v4 as uuidv4 } from "uuid";

export interface NoteDocument extends mongoose.Document {
  user: UserDocument["_id"];
  noteId: string;
  title: string;
  content: string;
  valid: boolean;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    noteId: {
      type: String,
      required: true,
      unique: true,
      default: () => `note_${uuidv4()}`,
    },
    title: { type: String, required: true },
    content: { type: String },
    valid: { type: Boolean, default: true },
    favorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model<NoteDocument>("Note", NoteSchema);

export default NoteModel;
