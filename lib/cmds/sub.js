import { getUserLevel,addTask,removeTask,isTaskSubscribed,removeTaskCompletely,getSubscribeList,getAllSubscribes } from "../utils/sql.js"
import { getModuleDetail,getDeveloperProfile } from "../http/x19.js"

const main = {
  config: {
    description: "订阅命令",
    isSimpleCommand: false
  },
  
  sub: {
    add: {
      description: "订阅指定类型",
      help: "!!sub add <taskType> <id>\ntaskType: 订阅类型\nid: 目标ID",
      cmd: add
    },
    
    remove: {
      description: "移除某项订阅",
      help: "!!sub remove <id>\nid: 目标ID",
      cmd: remove
    },
    
    removeAll: {}
  }
};

async function add(msg) {
  let params = msg.raw_message.split(' ');
  if(params.length !== 4) return msg.reply("请正确输入命令！\n提示：\n"+main.add.help);
  
  let taskType = params[2];
  let target = params[3];
  
  if (taskType === "" || target === "") return msg.reply("请正确输入命令！\n提示：\n"+main.add.help);
  
  let senderId = msg.sender.tiny_id;
  let senderLevel = await getUserLevel(senderId);
  if(senderLevel === "user") return msg.reply("你还不是管理员，不能添加订阅！");
  
  let guild = msg.guild_id;
  let sub = msg.channel_id;
  
  switch(taskType) {
    case "dev":
      let developerProfile = await getDeveloperProfile(target);
      if(developerProfile.code !== 0) return msg.reply("貌似不存在这位开发者呢");
      let developerName = (developerProfile.entity.developer_name).replace(' ','');
      await addTask(target,1,developerName,guild,sub);
      msg.reply("已成功在此子频道添加开发者 "+developerName+" 的留言板订阅！");
      break;
    
    case "item":
      let itemDetail = await getModuleDetail(target);
      if(itemDetail.code !== 0) return msg.reply("貌似这个组件不存在呢");
      let itemName = (itemDetail.entity.res_name).replace(' ','');
      await addTask(target,2,itemName,guild,sub);
      msg.reply("已成功在此子频道添加组件 "+itemName+" 的评论区订阅！");
      break;
    
    default:
      msg.reply("订阅类型只能是dev或item！");
      break;
  }
}

async function remove(msg) {
  let target = msg.raw_message.split(' ')[2];
  if (target === "") return msg.reply("请正确输入命令！\n提示：\n"+main.remove.help);
  
  let senderId = msg.sender.tiny_id;
  let senderLevel = await getUserLevel(senderId);
  if(senderLevel === "user") return msg.reply("你还不是管理员，不能移除订阅！");
  
  let guild = msg.guild_id;
  let sub = msg.channel_id;
  
  let taskSub = await isTaskSubscribed(target,guild,sub);
  
  if(!taskSub) return msg.reply("在此子频道并没有找到该订阅记录");
  await removeTask(target,guild,sub);
  msg.reply("成功移除订阅！");
}

export { main }