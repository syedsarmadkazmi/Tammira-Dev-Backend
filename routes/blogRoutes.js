const express = require("express");
const { getBlogs } = require("../controllers/blogController");

const router = express.Router();

router.get("/blogs", getBlogs);

module.exports = router;
