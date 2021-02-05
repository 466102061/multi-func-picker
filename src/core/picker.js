import { render } from '../dom/render.js'
import { pageScroll } from '../dom/lock-page-scroll.js'
import { formatSetting } from '../format/setting-format.js'
import { resetBrowersAnimationFrame } from '../utils/animation-frame.js'

class Picker{
	constructor(setting, lang){
		let param = setting || {};

		//私有属性
		this.TYPE = param.pickerType || {};
		this.lang = lang || {};
		this.rowHeight = 36;//行高
		this.select = [];//选中的序号
		this.result = [];//选中结果
		this.multiple = false;//是否是2个日期选择器
		this.formatCurs = [];//初始化的值
		this.formatTag = "-";//初始链接字符,一般：时间(:),其他：(-)

		//初始化参数
		this.type = param.type || this.TYPE.date;
		this.cur = param.cur || '';
		this.level = Math.min(param.level, 3);
		this.minDate = param.minDate || '';
		this.maxDate = param.maxDate || '';
		this.range = param.range || 10;
		this.callback = param.callback || function(res){};
		this.thenCallback = function(res){};

		//城市对象参数对应的键值key
		this.data = param.data || [];
		this.nameKey = param.nameKey || 'name';
		this.listKey = param.listKey || 'list';
		this.textKey = param.textKey || 'text';

		//重置requestAnimationFrame
		resetBrowersAnimationFrame();

		//初始化配置
		formatSetting(this);

		//渲染ui
		render(this);

		//页面滚动枷锁(禁止页面滚动)
		pageScroll.lock();

		return this;
	}
	then(callback){
		this.thenCallback = callback;
	}
}

export {
	Picker
}