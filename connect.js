const koa = require('koa')
const sha1 = require('sha1') // 加密
const cors = require('koa2-cors')
const { wechat } = require('./config')

const app = new koa()

app.use(cors())

app.use(async (ctx, next) => {
	const token = wechat.token
	const signature = ctx.query.signature
	const nonce = ctx.query.nonce
	const timestamp = ctx.query.timestamp
	const echostr = ctx.query.echostr
	let str = [token, timestamp, nonce].sort().join('')
	let sha = sha1(str)
	if (sha == signature) {
		ctx.body = echostr
	} else {
		ctx.body = 'wx-connect-error'
	}
})
const server = require('http').Server(app.callback())
server.listen(8080, () => {
	// /sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT 在服务器运行时需要执行这段命令让服务器开启这个端口
	console.log('server is running on port 8080!')
})
