const express = require("express");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());


app.use("/api", blogRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));