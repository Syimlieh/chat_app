import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "username is required for a new user"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);
