import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    inboxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inbox",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);
