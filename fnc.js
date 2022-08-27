const moment = require('moment')

const base = {
	birthday: '1998-10-11', // 女友出生日期
	love: '2017-11-07', // 在一起的日期
	today: moment().format('YYYY-MM-DD'),
	pay: '05', // 发薪日 -- 每月五号
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	day: new Date().getDate(),
	individual: 0, // 过的多少个生日
	anniversary: 0, //在一起几年
	flag: 0,
}

// 获取时间日期
function getDay() {
	updateDate()
	let str = moment().format('YYYY年MM月DD日 ')
	const weekDay = moment().weekday()
	const week = {
		1: '星期一',
		2: '星期二',
		3: '星期三',
		4: '星期四',
		5: '星期五',
		6: '星期六',
		0: '星期日',
	}
	return str + week[weekDay]
}

// 上交工资
function getPayDay() {
	updateDate()
	let goalTime = '' //
	if (base.day > Number(base.pay)) {
		if (base.month == 12) {
			goalTime = `${base.year + 1}-01-${base.pay}`
		} else {
			goalTime = `${base.year}-${
				base.month + 1 > 9 ? base.month + 1 : '0' + (base.month + 1)
			}-${base.pay}`
		}
	} else {
		goalTime = `${base.year}-${
			base.month > 9 ? base.month : '0' + base.month
		}-${base.pay}`
	}
	return moment(moment(goalTime)).diff(moment(base.today), 'days')
}

// 下次生日
function getBirthday() {
	updateDate()
	let goalTime = '' // 下次生日的日期 => 和当前日期对比，计算出时间差
	const [_, birMonth, birDay] = base.birthday.split('-')
	if (
		new Date(`${String(base.year)}-${birMonth}-${birDay}`).getTime() >
		new Date(base.today).getTime()
	) {
		// 今年生日
		goalTime = `${String(base.year)}-${birMonth}-${birDay}`
	} else {
		// 明年生日
		goalTime = `${String(base.year + 1)}-${birMonth}-${birDay}`
	}
	return moment(moment(goalTime)).diff(moment(base.today), 'days')
}

// console.log('birthday', getBirthday())

// 相恋天数
function getLoveDay() {
	updateDate()
	return moment(moment(base.today)).diff(moment(base.love), 'days')
}

// console.log('love', getLoveDay())

// 每日一句
function getEverySentence() {}

// 判断今天是不是重要的日子的一天
function getImportantDay() {
	console.log(base.today)
	updateDate()

	/**
	 * flag :
	 *  0 普通的日子
	 *  1 发薪日
	 *  2 生日
	 *  3 在一起纪念日
	 */

	let flag = 0

	const [year, month, day] = base.today.split('-')
	const [heryear, hermonth, herday] = base.birthday.split('-')
	const [loveyear, lovemonth, loveday] = base.love.split('-')
	base.individual = Number(year) - Number(heryear)
	base.anniversary = Number(year) - Number(loveyear)

	if (day == base.pay) {
		flag = 1
	} else if (month == hermonth && day == herday) {
		flag = 2
	} else if (month == lovemonth && day == loveday) {
		flag = 3
	}

	base.flag = flag
	// console.log(base.flag, '---')
}

getImportantDay()

// 刷新日期
function updateDate() {
	base.today = moment().format('YYYY-MM-DD')
	// base.today = moment().format('2022-11-05')
	base.year = new Date().getFullYear()
	base.month = new Date().getMonth() + 1
	base.day = new Date().getDate()
}

exports.base = base
exports.getDay = getDay
exports.getPayDay = getPayDay
exports.getBirthday = getBirthday
exports.getLoveDay = getLoveDay
exports.getImportantDay = getImportantDay
