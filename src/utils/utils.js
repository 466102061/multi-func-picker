/**
** @desc 合并参数
** @param {Object} target
** @param {Object} from
**/
function merge(target, ...reset){
	let from = [...reset];
	if(from.length == 0){
		return target;
	}
	from.forEach((item, index)=>{
		for(let key in item){
			target[key] = item[key];
		}
	});
	return target;
}

//是否是移动端
function isMobile(){
	return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

//原型链判断
let objectProtoType = (function () {
	let type = {};
	// 是否为 字符串，对象，数字，数组，undefined，函数，null
	[
		'String', 
		'Object', 
		'Number', 
		'Array', 
		'Null', 
		'Undefined', 
		'Function', 
		'HTMLDivElement'
	].forEach((e) => {
	  type['is' + e] = function (obj) {
	    return Object.prototype.toString.call(obj) == '[object ' + e + ']';
	  }
	})
	return type;
})();


export {
	merge,
	isMobile,
	objectProtoType
}