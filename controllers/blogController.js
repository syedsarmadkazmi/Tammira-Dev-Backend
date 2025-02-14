const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
    //default page and limit
    const { page = 1, limit = 10, tags } = req.query;

    const matchStage = tags ? { tags: { $in: tags.split(",") } } : {};

    try {
        const blogs = await Blog.aggregate([
            // tags filer
            { $match: matchStage },

            //get author data
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails",
                },
            },
            //to change authorDetails from array to object
            { $unwind: "$authorDetails" },
            { $skip: (page - 1) * parseInt(limit) },
            { $limit: parseInt(limit) },
        ]);

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBlogById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Blog id is required" });
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

        //if no blog found
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const blogWithAuthor = await Blog.aggregate([
            { $match: { _id: updatedBlog._id } },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails",
                },
            },
            { $unwind: "$authorDetails" },
        ]);

        //aggregation returns array so getting result in 0 index
        res.status(200).json(blogWithAuthor[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
