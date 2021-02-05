import { objectProtoType } from '../utils/utils.js'
import { initDate, initTimes, initCustom } from '../model/model.js'
import { formatToDouble, formatDateToArray, sortTowDataByAsec } from './date-format.js'

//参数cur格式化
function splitCurToArray(string){
	let reg = "";
	if(!string) return [];
	if(string.lastIndexOf("-") > 0){
		reg = "-";
	}else if(string.lastIndexOf("/") > 0){
		reg = "/";
	}else if(string.lastIndexOf(":") > 0){
		reg = ":";
	}else{
		return [];
	}
	return string.split(reg);
}

//初始化参数处理
function formatCurToArray(ctx){
	let formatCurs = [];
	if(!ctx.cur) return formatCurs;
	if(objectProtoType.isString(ctx.cur)){
		//自定义类型，只有一个数组
		if(ctx.type == ctx.TYPE.custom){
			formatCurs.push(ctx.cur);
		}else{
			formatCurs.push(splitCurToArray(ctx.cur));
		}
	}else if(objectProtoType.isArray(ctx.cur)){
		let temp = [];//合法有效的数据-多维数组
		formatCurs = ctx.cur;
		//确保数组中的元素也是数组
		formatCurs.forEach((item, index)=>{
			if(objectProtoType.isArray(item)){
				temp.push(item);
				return;
			}
			if(objectProtoType.isString(item)){
				//自定义类型，只有一个数组
				if(ctx.type == ctx.TYPE.custom){
					if(!temp[0]){
						temp[0] = [];
					}
					temp[0].push(item);
					return;
				}
				//日期与时间
				let res = splitCurToArray(item);
				if(!res || res.length == 0) return;
				temp.push(res);
				return;
			}
		});
		formatCurs = temp;
	}
	return formatCurs;
}

//初始化数据
function formatSetting(ctx){
	let data = [];
	if(ctx.type === ctx.TYPE.time){//时间
		ctx.formatTag = ":";
		ctx.level = 2;
	}

	//起始时间、结束时间，小于9的数，前面补0
	if(ctx.minDate){
		ctx.minDate = formatDateToArray(ctx, ctx.minDate);
	}
	if(ctx.maxDate){
		ctx.maxDate = formatDateToArray(ctx, ctx.maxDate);
	}

	//初始化初始值：日期导航是2个初始值
	let formatCurs = formatCurToArray(ctx);
	let len = formatCurs.length < 2 ? formatCurs.length : 2;
	let loop = true;
	let index = 0;
	while(loop){
		let curItem = formatCurs[index];
		if(curItem && ctx.type !=ctx.TYPE.custom){
			//小于9的数，前面补0
			 curItem = formatToDouble(curItem);
			 formatCurs[index] = curItem;
		}
		// console.log(+new Date,curString[index],curItem);

		//初始化数据源
		if(ctx.type === ctx.TYPE.date){//日期
			data.push(initDate(ctx, curItem, index));
		}else if(ctx.type === ctx.TYPE.time){//时间
			data.push(initTimes(ctx, curItem, index));
		}else if(ctx.type === ctx.TYPE.custom){//自定义
			if(!ctx.data || ctx.data && ctx.data.length == 0){
				console.error("参数错误！");
				return;
			}
			data.push(initCustom(ctx, curItem));
		}else{
			console.error("选择器类型错误，type字段为：date|time|custom中的一个哦！");
			loop = false;
			return;
		}
		index++;
		if(index >= len){
			loop = false;
		}
	}
	ctx.data = data;
	ctx.formatCurs = formatCurs;
	if(len == 2){//日期导航
		ctx.multiple = true;
		//初始化，日期小的在前，日期大的在后
		let res = sortTowDataByAsec(ctx, formatCurs);
		if(res.isReset){
			ctx.formatCurs = res.res;

			//交换初始化选中
			let temp = ctx.select[1];
			ctx.select[1] = ctx.select[0];
			ctx.select[0] = temp;

			//data暂时不需要交换(二者数据一致)
			// let temp = ctx.data[1];
			// ctx.data[1] = ctx.data[0];
			// ctx.data[0] = temp;
		}
	}
}

export {
	formatSetting
}