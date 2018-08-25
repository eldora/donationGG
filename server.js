const express = require("express"),
  bodyParser = require("body-parser"),
  blockManager = require("./blockManager");

const { makeBlock } = blockManager;

const PORT = process.env.HTTP_PORT || 12345;

const app = express();
app.use(bodyParser.json());

app.get("/makeBlock", (req, res) => {
  const date = Date();
  console.log(`make Block: ${date}`);
  makeBlock();
  res.send(`make block: ${date}`);
});

const server = app.listen(PORT, () =>
  console.log(`BlockManager Server running on port ${PORT}`)
);
