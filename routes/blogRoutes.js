const express = require("express");
const { getBlogs, updateBlogById } = require("../controllers/blogController");

const router = express.Router();

router.get("/blogs", getBlogs);
router.put("/blogs/:id", updateBlogById);

module.exports = router;
