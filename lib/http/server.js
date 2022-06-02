import axios from "axios"

async function refreshSession() {
  return axios({
    method: "post",
    url: BotConfig.push.sessionidUrl,
    data: {
      token: BotConfig.push.requestToken
    }
  }).then(async (res) => {
    let ssid = res.headers["set-cookie"][0].split("; ")[0].replace("ssid=","");
    global.x19push_sessionid = ssid;
    return Promise.resolve(1);
  }).catch(async (err) => {
    console.log("刷新session出问题了："+err);
    return await refreshSession();
  });
}

async function getToken(path,body) {
  try {
    let ssid = global.x19push_sessionid;
  } catch {
    await refreshSession();
  }
  return axios({
    method: "post",
    url: BotConfig.push.tokenUrl,
    headers: {
      "hsession-id": global.x19push_sessionid,
      "session-id": global.x19push_sessionid
    },
    data: {
      path: path,
      body: body
    }
  }).then(async (res) => {
    if(!res.data.success) {
      await refreshSession();
      return await getToken(path,body);
    }
    return Promise.resolve(res.data);
  }).catch(async (err) => {
    console.log("获取token出问题了："+err);
    return await getToken(path,body);
  });
}

export { refreshSession,getToken }