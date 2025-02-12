const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
    const { page = 1, limit = 10, tags } = req.query;

    try {
        const blogs = await Blog.find()
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

        res.status(200).json(blogs);

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

exports.updateBlogById = async (req, res) => {
    const { id } = req.params;

    res.json({ message: 'updateBlogById are working', blogId: id });
};