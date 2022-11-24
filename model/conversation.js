import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    mombers: [
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
  mongoose.models.User || mongoose.model("Conversation", conversationSchema);
