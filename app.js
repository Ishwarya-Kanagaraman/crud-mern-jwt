require("dotenv").config();
require("./MongoDB/database").connect();
const express = require("express");
const authRouter = require("./api/routes/authRoute");
const movieRouter = require("./api/routes/movieRoute");
const cors = require("cors");

const auth = require("./api/middleware/auth");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", authRouter);
app.use("/movies", movieRouter);

app.get("/", auth, async (req, res) => {
  const list = await User.find();
  res.status(200).json({ list });
});
const port = process.env.PORT || 4000;

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
