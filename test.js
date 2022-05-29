var global = 0;

async function a() {
  let res = await b();
  console.log("请求结果："+res);
}

async function b() {
  return new Promise(async (resolve,reject) => {
    if(global !== 10) {
      global = global + 1;
      setTimeout(()=>{reject("请求失败");},500);
    }
    setTimeout(()=>{resolve("成功请求")},500);
  }).then((res) => {
    return Promise.resolve(res);
  }).catch(async (err) => {
    console.log("请求失败，次数："+global);
    return await b();
  });
}

a();