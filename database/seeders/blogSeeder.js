const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("../../models/Blog");
const User = require("../../models/User");
var ObjectID = require('mongodb').ObjectID

dotenv.config();

// I am running this file from package.json so need to reconnect database everytime
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const seedBlogs = async () => {
    try {

        const users = await User.find().limit(2);
        if (users.length < 2) {
            throw new Error("Not enough users found! run the user seeder first.");
        }

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
                author: users[0]._id
            },
            {
                title: "Another Blog Post",
                sub_title: "A deep dive into Node.js",
                content: "Exploring the inner workings of Node.js...",
                slug: "deep-dive-nodejs",
                tags: ["nodejs", "backend"],
                created_date: new Date(),
                modified_date: new Date(),
                author: users[1]._id
            }
        ];


        //remove old data
        await Blog.deleteMany();

        //seed new data
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
