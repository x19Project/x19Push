import { searchModules,getModuleDetail } from "../http/x19.js"
const main = {
  config: {
    description: "搜索组件",
    isSimpleCommand: true
  },
  
  default: {
    description: "搜索组件",
    help: "!!search <keywords>\nkeywords: 组件关键字",
    cmd: searchModuleCmd
  }
};

async function searchModuleCmd(msg) {
  let keywords = msg.raw_message.split(' ')[1];
  if(keywords === "") return msg.reply("请正确输入要搜索的组件名称\n提示：\n"+main.default.help);
  let searchResult = await searchModules(keywords);
  let str = "以下是搜索结果（仅展示前五个）：";
  
  if(searchResult.entities.length === 0) {
    str = "未搜索到结果，可能你的关键词比较特殊呢～";
    msg.reply(str);
    return;
  }
  
  for (let value of searchResult.entities) {
    let id = value.item_id;
    let name = value.res_name;
    let diamond = value.diamond;
    let emerald = value.points;
    let price_str = "";
    
    if(diamond === 0 && emerald === 0) {
      price_str = "免费"
    } else if(diamond !== 0 && emerald === 0) {
      price_str = `${diamond} 钻石（${diamond/100}￥）`
    } else {
      price_str = `${emerald} 绿宝石`
    }
    
    let itemDetail = await getModuleDetail(id);
    let dev_name = value.developer_name;
    let dev_id = itemDetail.entity.developer_id;
    /*
    （示例）
    组件名称：火车工艺2.0
    组件ID：4655499275841166910
    价格：200钻石（2￥）
    开发者呢称：大肥免
    开发者ID：1444998001
    */
    str = str + `\n\n组件名称：${name}\n组件ID：${id}\n价格：${price_str}\n开发者呢称：${dev_name}\n开发者ID：${dev_id}`;
  }
  msg.reply(str);
}

export { main }