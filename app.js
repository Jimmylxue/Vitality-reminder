const koa = require("koa");
const cors = require("koa2-cors");
const router = require("koa-router")();
const message = require("./router");
const CronJob = require("cron").CronJob;
const axios = require("axios");

new CronJob(
  "10 00 09 * * *",
  function () {
    console.log("You will see this message every second");
    axios.get("http://1.116.204.114:8080/base");
    setTimeout(() => {
      axios.get("http://1.116.204.114:8080/base/important");
    }, 8000);
  },
  null,
  true,
  "Asia/Chongqing"
);

const app = new koa();

app.use(cors());
const server = require("http").Server(app.callback());

router.use("/base", message);
app.use(router.routes());

server.listen(8080, () => {
  // /sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT 在服务器运行时需要执行这段命令让服务器开启这个端口
  console.log("server is running on port 8080!");
});
