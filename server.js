const express = require("express"),
  bodyParser = require("body-parser"),
  blockManager = require("./blockManager");

const { connect, request, makeBlock } = blockManager;

const PORT = process.env.HTTP_PORT || 12345;

const app = express();
app.use(bodyParser.json());

app.get("/makeBlock/:group", (req, res) => {
  const { params: { group } } = req;
  const money = 1000;
  const date = Date();

  console.log(`make Block: ${date}`);
  ret = makeBlock(group, money.toString());

  if(ret)
    res.send(`Make a block: ${group}, ${date}`);
  else
    res.send("Cannot make a block");
});

app.get("/request/:func", (req, res) => {
  const { params: { func } } = req;
  ret = request({type: func, v:1});
  res.send(`result: ${ret}`);
});

const server = app.listen(PORT, () =>
  console.log(`BlockManager Server running on port ${PORT}`)
);

connect();
