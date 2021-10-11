const router = require("koa-router")();
const { base } = require("./fnc");

const {
  getToken,
  getWeather,
  getTemplate,
  getImportantTemplate,
} = require("./api");

router.get("/", async (ctx) => {
  try {
    let ACCESS_TOKEN = await getToken();
    let weather = (await getWeather()) || {};

    ctx.body = weather;
    if (ACCESS_TOKEN) {
      let res = await getTemplate(ACCESS_TOKEN, weather);
      console.log("每日提醒返回", res);
    }
  } catch (error) {
    console.log("每日提醒错误", error.message);
  }
});

router.get("/important", async (ctx) => {
  const { flag } = base;
  if (flag == 0) {
    // 普通日子 直接返回
    return;
  }
  try {
    let ACCESS_TOKEN = await getToken();
    if (ACCESS_TOKEN) {
      let res = await getImportantTemplate(ACCESS_TOKEN);
      console.log("重要日子返回", res);
    }
  } catch (error) {
    console.log("重要日子错误", error.message);
  }
});

module.exports = router.routes();
