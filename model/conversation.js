import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["personal", "group"], default: "personal" },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    ],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Groups" }],
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
