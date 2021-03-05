import { objectProtoType } from '../utils/utils.js'
/**
* @desc 是否超过日期可选范围
* @param {Array} min,max  '2019-03-02'
* @param {Array} date
*/
function isOutsideTheRange(min, max, date){
	if(!date) return false;
	let t = new Date(date.join('/')).getTime();
	let tMin = (min && min.length == 3) ? new Date(min.join('/')).getTime() : -Infinity;
	let tMax = (max && min.length == 3) ? new Date(max.join('/')).getTime() : Infinity;
	if(t < tMin || t > tMax){
		return true;
	}
	return false;
}

//初始化日期
function initDate(ctx, formatCurs, index){
	let data = [];
	let range = ctx.range;//年份范围,默认前后十年
	let hideDate = ctx.level == 2;//是否只显示年和月

	//当前日期
	let oDate = new Date();
	let curYear = oDate.getFullYear();
	let curMonth = oDate.getMonth() + 1;
	let curDate = oDate.getDate();

	//初始化最初选中的值
	let cY,cM,cD;//初始化的年、月、日
	let yIndex = 0,mIndex = 0,dIndex = 0;//初始化的年、月、日对应的index
	let minDate = ctx.minDate;
	let maxDate = ctx.maxDate;
	let isBeyond = isOutsideTheRange(minDate, maxDate, formatCurs);
	if(!isBeyond && formatCurs && formatCurs.length > 0){
		cY = formatCurs[0];
		cM = formatCurs[1];
		cD = formatCurs[2];
	}else{//当前日期
		cY = curYear;
		cM = curMonth > 9 ? '' + curMonth : '0' + curMonth;
		cD = curDate > 9 ? '' + curDate : '0' + curDate;
		if(isBeyond){//超过日期可选范围,重置为当前时间
			ctx.formatCurs[index] = [cY, cM,cD];
		}
	}

	//初始化日期范围
	let lenR = 2*range;
	let redusR = range;
	let hasMinDate = minDate && minDate.length === 3;
	let hasMaxDate = maxDate && maxDate.length === 3;
	if(hasMinDate && !hasMaxDate){//设置最小值
		redusR = curYear - parseInt(minDate[0]);
		lenR = redusR + range;
	}else if(!hasMinDate && hasMaxDate){//设置最大值
		lenR = range + (parseInt(maxDate[0]) - curYear);

	}else if(hasMaxDate && hasMinDate){//设置最大、最小值
		redusR = curYear - parseInt(minDate[0]);
		lenR = (curYear - parseInt(minDate[0])) + (parseInt(maxDate[0]) - curYear);
	}

	//年
	for(let i = 0; i <= lenR; i++){
		let obj = {};
		let vY = curYear - redusR + i;
		if(!yIndex && vY === parseInt(cY)){
			// console.log('年',vY,cY,cM,cD,i);
			yIndex = i;
		}
		vY = vY > 9 ? ''+vY : '0' + vY;
		obj[ctx.nameKey] = vY;
		obj[ctx.listKey] = [];
		//是否是闰年
		let isR = (vY%400 == 0) || (vY%4 == 0 && vY%100 != 0);

		//月
		let monthMin = 0; 
		let monthMax = 12;
		if(hasMinDate && parseInt(vY) == parseInt(minDate[0])){//月最小临界值
			monthMin = parseInt(minDate[1])-1;
			// console.log('最小m起始位置',monthMin);
		}
		if(hasMaxDate && parseInt(vY) == parseInt(maxDate[0])){//月最大临界值
			monthMax = parseInt(maxDate[1]);
			// console.log('最大m结束位置',monthMax);
		}
		for(let j = monthMin; j < monthMax; j++){
			let vM = j+1;
			let d = 30;
			if([1, 3, 5, 7, 8, 10, 12].includes(vM)){
				d = 31;
			}else if(vM == 2){//2月
				d = isR ? 29 : 28;
			}
			if(!mIndex && parseInt(vY) == parseInt(cY) && parseInt(vM) == parseInt(cM)){
				mIndex = j-monthMin;
				// console.log('月',vM,cM,cD,j,monthMin,mIndex);
			}
			vM = vM > 9 ? ''+vM : '0' + vM;
			let subObj = {};
			subObj[ctx.nameKey] = vM;
			subObj[ctx.listKey] = [];

			//日
			let dayMin = 0; 
			let dayMax = d;
			if(hasMinDate && parseInt(vY) == parseInt(minDate[0]) && parseInt(vM) == parseInt(minDate[1])){//日最小临界值
				dayMin = parseInt(minDate[2])-1;
				// console.log('最小d起始位置',dayMin);
			}else if(hasMaxDate && parseInt(vY) == parseInt(maxDate[0]) && parseInt(vM) == parseInt(maxDate[1])){//日最大临界值
				dayMax = parseInt(maxDate[2]);
				// console.log('最大d结束位置',dayMax);
			}
			if(!hideDate){//显示年、月、日
				for(let m = dayMin; m < dayMax; m++){
					let vD = m+1;
					if(!dIndex && parseInt(vY) == parseInt(cY) && parseInt(vM) == parseInt(cM) && parseInt(vD) == parseInt(cD)){
						dIndex = m-dayMin;
						// console.log('日',vD,cD,m,dayMin,dIndex);
					}
					vD = vD > 9 ? ''+vD : '0'+vD;
					let tObj = {};
					tObj[ctx.nameKey] = vD;
					tObj[ctx.listKey] = [];
					subObj[ctx.listKey].push(tObj);
				}
			}
			obj[ctx.listKey].push(subObj);
		}
		data.push(obj);
	}
	let select = [];
	select.push(yIndex);
	select.push(mIndex);
	select.push(dIndex);
	ctx.select[index] = select;
	// console.log("日期：",index,ctx.select);
	return data;
}

//初始化时间
function initTimes(ctx, formatCurs, index){
	let hour,minute,h = 24,m = 60;
	let data = [];
	if(formatCurs && formatCurs.length > 0){
		hour = formatCurs[0];
		minute = formatCurs[1] || 0;
	}else{//当前时间
		let oDate = new Date();
		hour = oDate.getHours();
		minute  = oDate.getMinutes();
	}
	let select = [];
	select.push(parseInt(hour));
	select.push(parseInt(minute));
	ctx.select[index] = select;
	for(let i = 0; i < h; i++){
		let obj = {};
		let vh = i > 9 ? ''+i : '0' + i;
		obj[ctx.nameKey] = vh;
		obj[ctx.listKey] = [];
		for(let j = 0; j < m; j++){
			let vm = j > 9 ? ''+j : '0' + j;
			let subObj = {};
			subObj[ctx.nameKey] = vm;
			subObj[ctx.listKey] = [];
			obj[ctx.listKey].push(subObj);
		}
		data.push(obj);
	}
	// console.log("时间：",ctx.select,data);
	return data;
}

//其他类型，如城市
function initCustom(ctx, formatCurs){
	let a,b,c;
	let aIndex = 0, bIndex = 0, cIndex = 0;
	let data  = ctx.data;
	let select = [0,0,0];
	if(formatCurs && formatCurs.length > 0){
		let reg = /(^\s+)|(\s+$)/g;
		let level = Math.min(formatCurs.length, 3);
		ctx.level = Math.min(ctx.level, level);
		matchCustomKeyWord(ctx.data, 0);

		//层层解析，选中选项
		function matchCustomKeyWord(list, count){
			let keyword = formatCurs[count];
			keyword = keyword ? keyword.toString().replace(reg, '') : '';
			list && list.forEach((item, index)=>{
				let text = item[ctx.nameKey] ? item[ctx.nameKey] : item;
				text = text[ctx.textKey] ? text[ctx.textKey] : text;
				if(!select[count] && text == keyword){
					select[count] = index; 
					// console.log("当前层级：", count);
					// console.log("选中：", index, select);
				}
				//有内层
				if(item[ctx.listKey] && item[ctx.listKey].length > 0){
					matchCustomKeyWord(item[ctx.listKey], count+1);
				}
			});
		}
	}else{
		for(let i = 0; i < ctx.level; i++){
			select[i] = 0;
		}
	}
	ctx.select.push(select);
	// console.log("城市：",ctx.select,data,ctx.level);
	return data;
}

export {
	initDate,
	initTimes,
	initCustom
}