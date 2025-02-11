const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sub_title: { type: String },
    content: { type: String },
    slug: { type: String, unique: true, required: true },
    tags: [{ type: String }],
    author: {
      first_name: String,
      last_name: String,
      bio: String,
      profile_pic_url: String,
    },
  },
  { timestamps: { createdAt: "created_date", updatedAt: "modified_date" } }
);

module.exports = mongoose.model("Blog", BlogSchema);
