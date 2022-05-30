import axios from "axios"
import { testSession,getToken } from "./server.js"

async function requestNetease(id,token,path,body) {
  return axios({
    method: "post",
    url: "https://g79mclobt.nie.netease.com"+path,
    data: body,
    headers: {
      "user-id": id,
      "user-token": token,
      "user-agent": "okhttp/3.12.12"
    }
  }).then(async (res) => {
    return Promise.resolve(res.data);
  }).catch(async (err) => {
    return await requestNetease(id,token,path,body);
  })
}

async function searchModules(moduleName) {
  await testSession();
  let post_data = {
    keyword: moduleName,
    offset: 0,
    length: 10,
    channel_id: 5,
    init: 0
  }
  
  let path = "/pe-item/query/search-by-keyword";
  let tokens = await getToken(path,JSON.stringify(post_data));
  
  return await requestNetease(tokens["user-id"],tokens["user-token"],path,post_data);
}

async function getModuleComment(module_id) {
  await testSession();
  let post_data = {
    item_id: module_id.toString(),
    length: 3,
    sort_type: 3,
    order: 0
  };
  
  let path = "/pe-user-comment";
  let tokens = await getToken(path,JSON.stringify(post_data));
  
  return await requestNetease(tokens["user-id"],tokens["user-token"],path,post_data);
}

async function getModuleDetail(module_id) {
  await testSession();
  let post_data = {
    item_id: module_id.toString(),
    channel_id: 5,
    need_record: 0
  };
  
  let path = "/pe-item-detail-v2";
  let tokens = await getToken(path,JSON.stringify(post_data));
  
  return await requestNetease(tokens["user-id"],tokens["user-token"],path,post_data);
}

async function getDeveloperComment(developer_id) {
  await testSession();
  let post_data = {
    developer_info_id: developer_id.toString(),
    offset: 0,
    length: 3
  };
  
  let path = "/pe-developer-homepage-comment/load_comment_list";
  let tokens = await getToken(path,JSON.stringify(post_data));
  
  return await requestNetease(tokens["user-id"],tokens["user-token"],path,post_data);
}

export { searchModules,getModuleComment,getModuleDetail,getDeveloperComment }