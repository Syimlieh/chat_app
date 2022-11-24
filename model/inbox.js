import mongoose from "mongoose";

const inboxSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastSeen: {
      type: String,
      trim: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("Inbox", inboxSchema);
