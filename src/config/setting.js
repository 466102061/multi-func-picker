
//配置
let setting = {
	level: 3,				//联动级数，默认三级
	type: 'date',			//选择器类型：date(默认日期)|time(时间)|custom(城市/地址)
	cur: [],				//初始化字符串，数组的值为：'2019-06-01'或者'17:45'或者'福建省-厦门市-思明区'
	maxWidth: 487,			//最多屏幕宽度

	//日期字段，优先级：minDate/maxDate > range
	range: 10,				//日期显示的年的范围，默认是当前日期的前后十年
	minDate: '',			//初始化可选的最小日期
	maxDate: '',			//初始化可选的最大日期

	//自定义(城市地址)参数
	data: [],
	//自定义对象参数对应的键值key
	nameKey: 'name',		//
	listKey: 'list',		//
	textKey: 'text',		//
}

//语言
let lang = {
	range: '至',			//
	cancel: '取消',		//取消按钮
	confirm: '确定',		//确定按钮
}

//选择器类型
let pickerType = {
	date : 'date',			//日期选择器
	time : 'time',			//时间选择器
	custom : 'custom',		//自定义选择器
}

export {
	lang,
	setting,
	pickerType
}