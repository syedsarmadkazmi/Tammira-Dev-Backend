const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../../models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const users = [
    {
        first_name: "John",
        last_name: "Doe",
        bio: "Software engineer and writer.",
        profile_pic_url: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid",
    },
    {
        first_name: "Jane",
        last_name: "Smith",
        bio: "Full-stack developer and blogger.",
        profile_pic_url: "https://cvbox.org/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75",
    }
];

const seedUsers = async () => {
    try {
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        console.log("User data is seeded successfully!");
        console.log("Users:", createdUsers);

        return createdUsers; 
    } catch (error) {
        console.error("Error in seeding user data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();
