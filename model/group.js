import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      trim: true,
      required: true,
    },
    groupAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        joined: { type: Date, default: new Date(Date.now()) },
        left: { type: Date },
      },
    ],
    inboxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Groups || mongoose.model("Groups", groupSchema);
