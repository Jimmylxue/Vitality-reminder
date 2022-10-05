const config = {
	wechat: {
		appID: '', //公众号里面取

		AppSecret: '', //公众号里面取

		base_templateId: '', // 元气提醒模板的id

		birthday_templateId: '', // 生日模板id

		pay_templateId: '', // 发薪模板id

		love_templateId: '', // 相恋模板id

		token: 'jimmyxuexue', //自定义的token

		love_message: [
			// 自定义每日情话
			{
				value: '陪你翻山越岭，追着日落看星星',
				color: '#8C8C8C',
			},
			{
				value: '天也欢喜，地也欢喜，人也欢喜。欢喜你遇到了我，我遇到了你。',
				color: '#8C8C8C',
			},
			{
				value: '从你的全世界路过，才发现你就是我的全世界。',
				color: '#8C8C8C',
			},
			{
				value: '岁月荏苒，青灯孤影月为伴，弱水三千不敌昔日你巧笑嫣然。',
				color: '#8C8C8C',
			},

			{
				value: '想见你，在吞云吐月的疾风后，在日复一日的寻常里。',
				color: '#8C8C8C',
			},
		],
	},

	polymerization: {
		weather: '', // 第三方天气接口 key
		city: '福州', // 查询福州的天气
	},
}

module.exports = config
