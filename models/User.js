const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    bio: { type: String },
    profile_pic_url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
