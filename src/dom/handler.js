import { objectProtoType } from '../utils/utils.js'
import { removeEventListener } from './event.js'
import { sortTowDataByAsec } from '../format/date-format.js'
import { pageScroll } from './lock-page-scroll.js'

//选中该数据
function selectThis(ctx, dIndex){
	let res = [];
	let level = ctx.level;
	let loop = true;
	let index = 0;
	let result = ctx.data[dIndex];
	while(loop){
		let key = ctx.select[dIndex][index];
		let name = result[key][ctx.nameKey] ? result[key][ctx.nameKey] : result[key];
		result = result[key][ctx.listKey];
		index++;
		res.push(name);
		if(index >= level){
			loop = false;
		}
	}
	if(ctx.multiple && ctx.type != ctx.TYPE.custom){
		ctx.$dom.$tabs[dIndex].innerHTML = res.join(ctx.formatTag);
		ctx.result[dIndex] = res;
	}else{
		ctx.result = res;
	}
	// console.log("滚动停止：",res);
}

//切换导航
function swithTabPanel(ctx, e){
	if(!ctx.multiple) return;
	let index = e.currentTarget.getAttribute("data-id");
	ctx.$dom.$tabs.forEach(function(item, i){
		if(index == i){
			item.className = "dw-span dw-active";
		}else{
			item.className = "dw-span";
		}
	});
	ctx.$dom.$content.forEach(function(item, i){
		if(index == i){
			item.className = "dw-content dw-tab-panel dw-tab-panel-active";
		}else{
			item.className = "dw-content dw-tab-panel";
		}
	});
}

//确定选中
function confirm(ctx){
	if(!ctx.multiple && ctx.result.length == 0){
		selectThis(ctx, 0);
	}else if(ctx.multiple){//日期导航
		if(ctx.result.length == 0){
			selectThis(ctx, 0);
			selectThis(ctx, 1);
		}else if(!ctx.result[0] || ctx.result[0].length == 0){
			selectThis(ctx, 0);
		}else if(!ctx.result[1] || ctx.result[1].length == 1){
			selectThis(ctx, 1);
		}
	}
	let res = ctx.result;
	if(ctx.multiple){//选择的日期排序，小在前，大在后
		let result = sortTowDataByAsec(ctx, res);
		res = result.res;
	}
	if(objectProtoType.isFunction(ctx.callback)){
		ctx.callback(res);
	}
	if(objectProtoType.isFunction(ctx.thenCallback)){
		ctx.thenCallback(res);
	}
	closeMask(ctx);
}

//关闭
function closeMask(ctx){
	//移除页面滚动枷锁
	pageScroll.unlock();

	//注销事件
	removeEventListener(ctx);

	//移除DOM
	ctx.$dom.$mask.className = "dw-mask-div mbody";
	setTimeout(function(){
		document.body.removeChild(ctx.$dom.$mask);
	},250);
}

export {
	confirm,
	closeMask,
	selectThis,
	swithTabPanel
}
