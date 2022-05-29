import { addAdmin,removeAdmin,getUserLevel } from "../utils/sql.js"

const main = {
  config: {
    description: "管理员命令",
    isSimpleCommand: false
  },
  
  add: {
    description: "添加一个管理员",
    help: "!!admin add @target",
    cmd: add
  },
  
  remove: {
    description: "移除一个管理员",
    help: "!!admin remove @target",
    cmd: remove
  },
  
  query: {
    description: "查询自己是否为管理员",
    help: "!!query",
    cmd: query
  }
};

async function add(msg) {
  let senderId = msg.sender.tiny_id;
  let targetId;
  try {
    targetId = msg.message[1].id;
  } catch {
    msg.reply("你还没@要添加的管理呢");
    return;
  }
  let senderLevel = await getUserLevel(senderId);
  if(senderLevel === "master") {
    let addResult = await addAdmin(targetId,false);
    switch(addResult) {
      case "success":
        msg.reply("成功添加管理员");
        break;
      case "admin_exists":
        msg.reply("目标已是管理员");
        break;
      default:
        msg.reply("未知错误");
        break;
    }
    return;
  }
  msg.reply("只有主人才能使用本命令");
}

async function remove(msg) {
  let senderId = msg.sender.tiny_id;
  let targetId;
  try {
    targetId = msg.message[1].id;
  } catch {
    msg.reply("你还没@要添加的管理呢");
    return;
  }
}

async function query(msg) {
  let senderId = msg.sender.tiny_id;
  
}

export { main }