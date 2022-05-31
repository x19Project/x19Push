# x19Push
## 介绍
推送《我的世界》中国版（网易）的开发者留言板和组件评论到QQ频道。  
~~之前写了个推送到群里的，但是BUG多，码子我也整不明白看不懂了，这次就纯纯的重构罢~~  
组件开发者可用此bot推送评论区信息到内部的子频道，能让开发者及时回复评论。  
也可用于舆情检测（例如多人联合给组件评低分），协助开发者团队推出对应的控舆方案。
## 使用方法
```bash
cd ./x19push
npm install

# 第一次启动，需要使用这个命令，这样就可以进行配置操作

npm run app

# 后续挂服务器后台，可以Ctrl+C，然后用这个

npm run start
```
## 免责声明&注意事项
**⚠️一切开发皆为学习对应的开发思想以及开发语言，禁止用于商业或非法用途**  
⚠️该项目**并未违反**网易的用户协议，因为请求网易服务器的token实际上**并非**由本项目的代码获取、生成，可自行查看server.js和x19.js，还请网易放过我，求求了。  
**使用后造成的后果和开发者无关，用户需自行承担使用责任**  
**🚫禁止删除代码中涉及版权的提示🚫**
## 特别感谢
| 组织/人物 | 相关信息 |
|:----:|:----:|
| 大肥免办公室 | 让我想到做这个Bot |
| Bouldev | 提供测试用API |
| [Yunzai-Bot](https://github.com/Le-niao/Yunzai-Bot) | 让我参考了构建思想 |

## 引用的开源库
[oicq](https://github.com/takayama-lily/oicq)  
[oicq-guild](https://github.com/takayama-lily/oicq-guild)  
axios  
node-schedule  
sqlite3(node)  
pm2