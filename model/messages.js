import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    messageText: {
      type: String,
      trim: true,
    },
    files: {
      type: String,
      trim: true,
    },
    meta: {
      //Links
      type: String,
      trim: true,
    },
    inboxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inbox",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    read: {
      type: Boolean,
    },
    received: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Messages || mongoose.model("Messages", messagesSchema);
