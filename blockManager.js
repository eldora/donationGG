const WebSocket = require("ws");

const NETWORK_ADDR = "ws://18.220.252.229:1234";

const __makeBlock = ws => {
  const contents = {type: "transfer", name: "ra6ssv8", user: "bob", v: 1};
  ret = ws.send(JSON.stringify(contents));
  return ret;
};

const makeBlock = () => {
  const ws = new WebSocket(NETWORK_ADDR);
  ws.on("open", () => {
    return __makeBlock(ws);
  });
};

module.exports = {
  makeBlock
};



