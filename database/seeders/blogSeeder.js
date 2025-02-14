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
        ];

        for (let i = 0; i < 25; i++) {
            blogs.push({
                title: `Blog Post #${i}`,
                sub_title: `Random Subtitle #${i}`,
                content: "Generated blog content...",
                slug: `blog-post-${i}`,
                tags: i % 2 === 0 ? ["random", "react", "javascript"] : ["tech", "node", "typescript"],
                created_date: new Date(),
                modified_date: new Date(),
                author: users[i % 2]._id
            });
        }


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
