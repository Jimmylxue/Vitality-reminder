## 元气提醒

> 利用微信订阅号的方式，给女朋友每天定时定时推送消息。
>
> 如果还没有女朋友的这个可以祝你一臂之力，早日脱单。

V1.0.0

#### 效果展示

![最终的效果](https://img-blog.csdnimg.cn/94a6b22e8899464dbdfbaf11ba7ca675.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBASmltbXnpm6rpm6o=,size_20,color_FFFFFF,t_70,g_se,x_16)

- 每日定时发送元气提醒，（发送的时间可配置）
- 特殊时间也会发送特殊提醒，目前已有：发薪日、在一起纪念日、生日。之后会陆续增加
- 有变成能力的可以自己改动代码，实现更多的提醒

#### 使用步骤

- 将仓库克隆至本地
- `npm install`或`cnpm install`安装依赖配置文件
- 修改config.js的订阅号配置文件
- 修改fnc.js个人重要信息节点配置文件
- 创建订阅号测试号，配置群发消息模板
- 代码文件上传至个人服务器，先绑定一个订阅号，获取accect_token
- 设置指定发送的人员，指定发送的时间
- 服务器挂上app.js脚本，配置全部完成！

***

#### 修改配置config.js

![config.js配置信息](https://img-blog.csdnimg.cn/853858be1d8549de803ac820ceee0224.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBASmltbXnpm6rpm6o=,size_20,color_FFFFFF,t_70,g_se,x_16)

- appid和AppSecret都是申请微信公众号申请成功就可以获取的，但是这个群发的接口如果是以个人的名义申请的公众号是不能获取到这个接口权限的，这时候可以用一个测试开发公众号，上面有几乎所有的接口权限。[微信公众平台接口测试帐号申请](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login) 网址：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login。
- 第三方天气接口我是在聚合数据平台申请的，是免费的接口，这里替换成各自的聚合数据接口的天气接口key即可[聚合数据](https://www.juhe.cn/docs?bd_vid=7775114093417537769) 地址：https://www.juhe.cn/docs?bd_vid=7775114093417537769

![image-20211011105146791](C:\Users\Jimmy\AppData\Roaming\Typora\typora-user-images\image-20211011105146791.png)

- 这里就有了这些基本的id，直接复制即可。

#### 修改fnc.js

![image-20211011105435010](C:\Users\Jimmy\AppData\Roaming\Typora\typora-user-images\image-20211011105435010.png)

- 修改base对象的birthday、love、pay字段替换为个人的即可

#### 创建微信公众号测试号，配置群发消息模板

> [微信公众平台接口测试帐号申请](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login) 网址：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login。

![在这里插入图片描述](https://img-blog.csdnimg.cn/6994ad19e0e149f686517817d00c82fb.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBASmltbXnpm6rpm6o=,size_20,color_FFFFFF,t_70,g_se,x_16)

- 元气提醒

  ```
  {{dateTime.DATA}} 
  今天是 我们相恋的第{{love.DATA}}天 
  距离上交工资还有{{pay.DATA}}天 
  距离你的生日还有{{birthday.DATA}}天 
  今日天气 {{weather.DATA}} 
  今日温度 {{temp.DATA}}度 
  空气湿度 {{humidity.DATA}} 
  风向 {{wind.DATA}} 
  每日一句 
  {{message.DATA}}
  ```

- 工资模板

  ```
  {{dateTime.DATA}} 
  亲爱的，今天要发工资了，咱们账户上又多了一笔！注意查收~！
  ```

- 生日模板

  ```
  {{dateTime.DATA}} 
  听说今天是你人生当中第 {{individual.DATA}} 个生日？
  天呐， 我差点忘记！因为你永远18岁~。 
  尽管，日历告诉我：你又涨了一岁，但你还是那个天真可爱的小仙女，生日快乐!
  ```

- 纪念日模板

  ```
  {{dateTime.DATA}} 
  今天是在一起{{anniversary.DATA}}周年纪念日。 
  经历了风风雨雨,最终依然走在一起,很幸运,很幸福!我们的小家庭要一直幸福下去。
  ```

这里的模板id就是分别对应的config.js的那四个模板id

#### 获取公众号的accect_token的权限

> accect_token是获取我们访问公众号接口的一个必填字段，需要先获取。获取这个需要有url，所以需要准备一台个人的云服务器

- 将整个项目放到云服务器上
- 进入这个项目的目录
- 检查config.js文件中的token字段的值是不是和公众号接口配置中的值是一样的，需要时一致的。
- 用node运行一下connect.js脚本
- 提交一下接口配置信息的认证。等待页面提示成功
- 取消node的connect.js脚本

此处我省略了一些内容，connect.js监听的是8080,但是接口配置只能是80端口或者443端口，所以基于这个需要做个接口的转发，利用宝塔面板可以很容易的实现接口的反向代理。

#### 设置指定发送的人员

进入api.js,修改两个template对象的touser字段

![在这里插入图片描述](https://img-blog.csdnimg.cn/6095e2807d7741dfb3fced2e5845e12c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBASmltbXnpm6rpm6o=,size_20,color_FFFFFF,t_70,g_se,x_16)

- 这里没有写进配置文件是考虑到可能有要发给不同的人的需求？

进入app.js,修改CromJob构造函数的第一个参数来设置每日发送时间。

![修改定时发送时间](https://img-blog.csdnimg.cn/08f716dee601488689d3841b44196a5d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBASmltbXnpm6rpm6o=,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 利用pm2运行app.js脚本

- 先安装一下pm2
- 进入项目目录
- 运行`pm2 start app.js`

#### 测试

以上步骤如果都完成的了，可以手动在浏览器输入`url:8080/base`和`url:8080/base/important`,或者调整app.js的监听时间改成即将到的时间来测试

## 总结

本项目本质是写好一个可以访问公众号群发消息模板的接口，然后利用CronJob实现每日定时发送模板信息。

目前模板的内容有限，模板的内容会不断新增，有能力的小伙伴如果有兴趣也可以自己修改代码实现更多的功能。

