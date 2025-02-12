const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("../../models/Blog");
var ObjectID = require('mongodb').ObjectID

dotenv.config();

// I am running this file from package.json so need to reconnect database everytime
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// blog data
const blogs = [
    {
        title: "Sample Blog Title",
        sub_title: "Sample Blog Subtitle",
        content: "This is the blog content...",
        slug: "sample-blog-title",
        tags: ["tech", "javascript"],
        created_date: new Date("2025-01-30T12:00:00Z"),
        modified_date: new Date("2025-01-30T14:00:00Z"),
        author: {
            _id: new mongoose.Types.ObjectId(),
            first_name: "John",
            last_name: "Doe",
            bio: "Software engineer and writer.",
            profile_pic_url: "https://example.com/john_doe.jpg",
        },
    },
    {
        title: "Another Blog Post",
        sub_title: "A deep dive into Node.js",
        content: "Exploring the inner workings of Node.js...",
        slug: "deep-dive-nodejs",
        tags: ["nodejs", "backend"],
        created_date: new Date(),
        modified_date: new Date(),
        author: {
            _id: new mongoose.Types.ObjectId(),
            first_name: "Jane",
            last_name: "Smith",
            bio: "Full-stack developer and blogger.",
            profile_pic_url: "https://example.com/jane_smith.jpg",
        },
    }
];


const seedBlogs = async () => {
    try {
        //remove previous data
        await Blog.deleteMany();

        //seeding
        await Blog.insertMany(blogs);
        console.log("Blog data is seeded successfully!");

    } catch (error) {
        console.error("Error in seeding blog data:", error);
    }
    finally{
        //close the connection
        mongoose.connection.close();
    }
};


seedBlogs();
