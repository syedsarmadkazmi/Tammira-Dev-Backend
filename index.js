const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const connectDatabase = require("./database");

const app = express();

app.use(express.json());

connectDatabase()

app.use("/api", blogRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));