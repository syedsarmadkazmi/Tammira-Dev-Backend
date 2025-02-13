const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
    const { page = 1, limit = 10, tags } = req.query;

    const dbQuery = tags ? { tags: { $in: tags.split(",") } } : {};

    try {
        const blogs = await Blog.find(dbQuery)
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

        res.status(200).json(blogs);

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

exports.updateBlogById = async (req, res) => {
    const { id } = req.params;

    if(!id) {
      res.status(400).json({ error: 'Blog id is required' });
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};