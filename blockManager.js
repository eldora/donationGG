const WebSocket = require("ws");

const BLOCKCHAIN_NETWORK_ADDR = "ws://18.220.252.229:1234";
let ws = null;

const parseData = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const connect = () => {
  const addr = BLOCKCHAIN_NETWORK_ADDR;

  ws = new WebSocket(addr);
  ws.on("open", () => {
    console.log(`Open blockchain network: ${addr}`);
  });
  ws.on("error", () => {
    console.log("error");
  });

  handleSocketClose(ws);
  handleSocketMessages(ws);
};

const handleSocketClose = ws => {
  ws.on("close", evt => {
    console.log(`Close blockchain network: ${evt}`);
    setTimeout(() => {
      connect();
    }, 5000);
  });
};

const handleSocketMessages = ws => {
  ws.on("message", data => {
    try {
      const msg = JSON.parse(data);
      console.log('MESSAGE', msg);
    }
    catch(e){
      console.log('ERROR', e);
    }
  });
};

const request = query => {
  if(ws == null)
    return false;

  ws.send(JSON.stringify(query));
  return true;
};

const makeBlock = (group, money) => {
  const query = {type: "transfer", name: group, user: money, v: 1};
  return reqeust(query);
};


module.exports = {
  connect,
  request,
  makeBlock
};
