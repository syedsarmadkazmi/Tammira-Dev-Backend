const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/SampleBlogs');
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
