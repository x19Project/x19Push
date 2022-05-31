import { searchModules,getModuleComment,getModuleDetail,getDeveloperProfile,getDeveloperComment } from "../http/x19.js"

const main = {
  config: {
    description: "测试用命令",
    isSimpleCommand: false
  },
  
  sub: {
    sm: {
      description: "searchModules",
      help: "!!debug sm <keywords>",
      cmd: sm
    },
    
    gmc: {
      description: "getModuleComment",
      help: "!!debug gmc <module_id>",
      cmd: gmc
    },
    
    gmd: {
      description: "getModuleDetail",
      help: "!!debug gmd <module_id>",
      cmd: gmd
    },
    
    gdp: {
      description: "getDeveloperProfile",
      help: "!!debug gdp <developer_id>",
      cmd: gdp
    },
    
    gdc: {
      description: "getDeveloperComment",
      help: "!!debug gdc <developer_id>",
      cmd: gdc
    }
  }
};

async function sm(msg) {
  if(!BotConfig.debug) return msg.reply("非debug模式，禁止使用该命令");
  let param = msg.raw_message.split(' ')[2];
  if(param === "") return msg.reply("参数为空");
  
  let result = await searchModules(param);
  
  msg.reply(JSON.stringify(result));
}

async function gmc(msg) {
  if(!BotConfig.debug) return msg.reply("非debug模式，禁止使用该命令");
  let param = msg.raw_message.split(' ')[2];
  if(param === "") return msg.reply("参数为空");
  
  let result = await getModuleComment(param);
  
  msg.reply(JSON.stringify(result));
}

async function gmd(msg) {
  if(!BotConfig.debug) return msg.reply("非debug模式，禁止使用该命令");
  let param = msg.raw_message.split(' ')[2];
  if(param === "") return msg.reply("参数为空");
  
  let result = await getModuleDetail(param);
  
  msg.reply(JSON.stringify(result));
}

async function gdp(msg) {
  if(!BotConfig.debug) return msg.reply("非debug模式，禁止使用该命令");
  let param = msg.raw_message.split(' ')[2];
  if(param === "") return msg.reply("参数为空");
  
  let result = await getDeveloperProfile(param);
  
  msg.reply(JSON.stringify(result));
}

async function gdc(msg) {
  if(!BotConfig.debug) return msg.reply("非debug模式，禁止使用该命令");
  let param = msg.raw_message.split(' ')[2];
  if(param === "") return msg.reply("参数为空");
  
  let result = await getDeveloperComment(param);
  
  msg.reply(JSON.stringify(result));
}

export { main }