import axios from "axios"

async function refreshSession() {
  return axios({
    method: "post",
    url: BotConfig.push.sessionidUrl,
    data: {
      token: BotConfig.push.requestToken
    }
  }).then((res) => {
    let ssid = res.headers["set-cookie"][0].split("; ")[0].replace("ssid=","");
    global.x19push_sessionid = ssid;
    return Promise.resolve(1);
  }).catch((err) => {
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
    }
    data: {
      path: path,
      body: body
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    return await getToken(path,body);
  });
}

async function testSession() {
  try {
    let ssid = global.x19push_sessionid;
  } catch {
    await refreshSession();
  }
  let result = await getToken("/a","a");
  if(!result.success) {
    await refreshSession();
  }
}

export { refreshSession,getToken,testSession }