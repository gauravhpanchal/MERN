const express = require("express");
const { userController } = require("./routes/user.routes");
const { notesController } = require("./routes/notes.routes");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/authentication");

const app = express();
const port = 8001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/user", userController);
app.use(authentication);
app.use("/notes", notesController);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
  console.log("Server listening on", port);
});
