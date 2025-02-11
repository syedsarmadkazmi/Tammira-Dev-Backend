exports.getBlogs = async (req, res) => {
    const { page = 1, limit = 10, tags } = req.query;

    res.json({ message: 'getBlogs are working', reqParams: req.query });
};

exports.updateBlogById = async (req, res) => {
    const { id } = req.params;

    res.json({ message: 'updateBlogById are working', blogId: id });
};