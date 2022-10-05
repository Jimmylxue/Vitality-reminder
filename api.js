const axios = require('axios')
const {
	appID,
	AppSecret,
	base_templateId,
	birthday_templateId,
	pay_templateId,
	love_templateId,
	love_message, // 每日情话集合
} = require('./config').wechat
const { weather, city } = require('./config').polymerization
const { getDay, getLoveDay, getBirthday, getPayDay, base } = require('./fnc')

async function getToken() {
	let res = await axios.get(
		`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${AppSecret}`
	)
	if (res.data && res.data.access_token) {
		return res.data.access_token
	} else {
		return 'none'
	}
}

async function getWeather() {
	let res = await axios.get(
		`http://apis.juhe.cn/simpleWeather/query?city=${encodeURI(
			city
		)}&key=${weather}`
	)
	console.log('res', res)
	if (res && res.data && res.data.error_code == 0) {
		return res.data.result
	}
}

// 普通日子模板
async function getTemplate(ACCESS_TOKEN, weather) {
	const day = getDay() // 当前日期
	const loveDay = getLoveDay() // 相恋天数
	const birthday = Number(getBirthday()) + 1 // 生日天数  +1 是为了兼容显示 让几个小时也显示是1天
	const payDay = getPayDay() // 发薪日

	const realtime = weather.realtime || {}
	const template = {
		touser: 'o6tBC6MUgDu0DRJXjEZq_2BYdC8U',
		template_id: base_templateId,
		topcolor: '#FF0000',
		data: {},
	}

	// 日常模板
	const base_temp = {
		dateTime: {
			value: day,
			color: '#cc33cc',
		},
		love: {
			value: loveDay,
			color: '#ff3399',
		},
		pay: {
			value: payDay,
			color: '#66ff00',
		},
		birthday: {
			value: birthday,
			color: '#ff0033',
		},
		weather: {
			value: realtime.info,
			color: '#33ff33',
		},
		temp: {
			value: realtime.temperature,
			color: '#0066ff',
		},
		humidity: {
			value: realtime.humidity,
			color: '#ff0033',
		},
		wind: {
			value: realtime.direct + realtime.power,
			color: '#3399ff',
		},
		message: {},
	}

	base_temp.message =
		love_message[Math.floor(Math.random() * love_message.length)]

	template.data = base_temp
	template.template_id = base_templateId

	let res = await axios.post(
		`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${ACCESS_TOKEN}`,
		template
	)
	return res
}
// 重要日子模板
async function getImportantTemplate(ACCESS_TOKEN, weather) {
	const day = getDay() // 当前日期
	const { individual, anniversary, flag } = base
	const template = {
		touser: 'o6tBC6D_8VMCPtAxrU5Ve_Yd43JY',
		template_id: base_templateId,
		topcolor: '#FF0000',
		data: {},
	}

	const birth_temp = {
		dateTime: {
			value: day,
			color: '#cc33cc',
		},
		individual: {
			value: individual,
			color: '#0066ff',
		},
	}

	// 工资模板
	const pay_temp = {
		dateTime: {
			value: day,
			color: '#cc33cc',
		},
	}

	// 相恋模板
	const love_temp = {
		dateTime: {
			value: day,
			color: '#cc33cc',
		},
		anniversary: {
			value: anniversary,
			color: '#0066ff',
		},
	}

	if (flag == 1) {
		template.data = pay_temp
		template.template_id = pay_templateId
	} else if (flag == 2) {
		template.data = birth_temp
		template.template_id = birthday_templateId
	} else if (flag == 3) {
		template.data = love_temp
		template.template_id = love_templateId
	}

	let res = await axios.post(
		`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${ACCESS_TOKEN}`,
		template
	)
	return res
}

exports.getToken = getToken
exports.getWeather = getWeather
exports.getTemplate = getTemplate
exports.getImportantTemplate = getImportantTemplate
