const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sub_title: { type: String },
    content: { type: String },
    slug: { type: String, unique: true, required: true },
    tags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: "created_date", updatedAt: "modified_date" } }
);

module.exports = mongoose.model("Blog", BlogSchema);
