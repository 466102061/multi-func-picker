import { objectProtoType } from '../utils/utils.js'

/**
* 日期(时间)、月、日小于9前面补0
* 日期 : '2019-08-03'
* 时间 : '02:04'
*/
function formatToDouble(data){
	let res = [];
	data && data.forEach(function(item, index){
		let str = ''+item;
		let len = str.length;
		if(len >=2){
			res.push(str);
		}else{
			str = ("00"+str).substr(len);
			res.push(str);
		}
	});
	return res;
}

//初始化日期参数
function formatDateToArray(ctx, date){
	if(!date) return [];
	//字符串：'2021-02-03'
	if(objectProtoType.isString(date)){
		date = date.split(ctx.formatTag);
		return date;
	}
	if(objectProtoType.isArray(date)){
		//数组：[2021, 02, 03]
		for(let index in date){
			let d = parseInt(date[index]);
			if(isNaN(d)){
				break;
			}
			date[index] = d;
		}
		return formatToDouble(date);
	}
	return [];
}


//升序(对换2参数)返回数据
function sortTowDataByAsec(ctx, data){
	let res = [], isReset = false;
	let d1 = data[0];
	let d2 = data[1];
	if(ctx.type === ctx.TYPE.date){//日期
		let t1 = new Date(d1.join('/')).getTime();
		let t2 = new Date(d2.join('/')).getTime();
		if(t1 > t2){
			res.push(d2);
			res.push(d1);
			isReset = true;
		}
	}else if(ctx.type === ctx.TYPE.time){//时间
		if((d1[0] > d2[0]) || ((d1[0] == d2[0]) && (d1[1] > d2[1]))){
			res.push(d2);
			res.push(d1);
			isReset = true;
		}
	}

	if(!isReset){
		res = data;
	}
	return { res, isReset }
}

export {
	formatToDouble,
	formatDateToArray,
	sortTowDataByAsec
}
