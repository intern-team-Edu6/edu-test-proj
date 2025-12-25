import mongoose, { Schema } from "mongoose";

export const User = new Schema({
  userClerkId: { type: String, required: true },
});
