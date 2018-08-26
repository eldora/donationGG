const express = require("express"),
  bodyParser = require("body-parser"),
  blockManager = require("./blockManager");

const { reqNewBlock, reqGetMoney, connect, request, makeBlock } = blockManager;

const PORT = process.env.HTTP_PORT || 12345;
let TAG_STATE = false;

const app = express();
app.use(bodyParser.json());

app.get("/makeBlock", (req, res) => {
  const { query: { group, money} } = req;
  const date = Date();

  console.log(`make Block: ${date}`);
  ret = makeBlock(group, money);

  if(ret)
    res.send(`Make a block: ${group}, ${date}`);
  else
    res.send("Cannot make a block");

});

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

app.get("/getBlock/:group", (req, res) => {
  const { params: { group } } = req;
  ret = reqGetMoney(group);
  res.send(`${ret}`);
});

app.get("/request/:func", (req, res) => {
  const { params: { func } } = req;
  ret = request({type: func, v:1});
  res.send(`result: ${ret}`);
});

app.get("/nfc/:state", (req, res) => {
  const { params: { state } } = req;

  console.log(`call nfc: ${state}, ${TAG_STATE}`);
  if(state == "tag" && TAG_STATE == false){
    console.log(`make block!!!!!, ${TAG_STATE}`);
    makeBlock('1000', '1000');
    TAG_STATE = true;
    setTimeout(() => {
      console.log("NFC Tag clear...");
      TAG_STATE = false;
    }, 5000);
  }
  else if(state == "clear")
    TAG_STATE = false;

  res.send(`${state}`);
});

const server = app.listen(PORT, () =>
  console.log(`BlockManager Server running on port ${PORT}`)
);

connect();
