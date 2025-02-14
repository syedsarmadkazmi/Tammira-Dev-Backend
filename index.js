const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const connectDatabase = require("./database/connect");
const dotenv = require("dotenv");

const app = express();

app.use(express.json())

dotenv.config();
app.use(express.json());

connectDatabase()

app.use("/api", blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));