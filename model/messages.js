import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inboxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inbox",
    },
    messageText: {
      type: String,
      trim: true,
    },
    files: {
      type: String,
      trim: true,
    },
    meta: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Messages || mongoose.model("Messages", messagesSchema);
