const atob = require("atob");

let blocks = [];

const formatCCID = (i, uuid, ccid) => {
  if(i == 1) return uuid;
  return ccid;
};

const formatPayload = (payload, ccid) => {
  var func = ['init', 'delete', 'write', 'init_marble', 'set_user', 'open_trade', 'perform_trade', 'remove_trade'];
  payload = payload.substring(payload.indexOf(ccid) + ccid.length + 4);
  for(var i in func){
    if(payload.indexOf(func[i]) >= 0){
      return payload.substr(func[i].length);
      //return func[i] + ': ' + payload.substr(func[i].length);
    }
  }
  return str;
};


// change the block format in the future
const newBlock = blk => {
  if(!blocks[Number(blk.id)]){
    blocks[Number(blk.id)] = blk;
    console.log('add ', blk);
  }
};

const getMoney = (group) => {
  let money = 0;
  let ccid, payload;

  for(var id = 0; id < blocks.length; id++){
    if(blocks[Number(id)]){
      ccid = formatCCID(blocks[id].blockstats.transactions[0].type, blocks[id].blockstats.transactions[0].uuid, atob(blocks[id].blockstats.transactions[0].chaincodeID));
      payload = atob(blocks[id].blockstats.transactions[0].payload);
    
      payload_str = formatPayload(payload, ccid);
      payload_arr = payload_str.split('\n');

      bufGroup = new Buffer(payload_arr[1]);
      pGroup = bufGroup.slice(1, bufGroup.length).toString();
      bufMoney = new Buffer(payload_arr[2]);
      pMoney = bufMoney.slice(1, bufMoney.length).toString();

      if(pGroup == group)
        money += Number(pMoney);
    }
  }

  return money;
};

const clearBlocks = () => {
  blocks = [];
}

module.exports = {
  newBlock,
  getMoney
};
