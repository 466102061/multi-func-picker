import {
	confirm,
	closeMask,
	swithTabPanel
} from './handler.js'
import { objectProtoType } from '../utils/utils.js'
import { addEventListener } from './event.js'
import { bindElScroll } from './scroll.js'
import { cssTransition } from '../utils/animation-frame.js'

//渲染ui
function render(ctx){
	ctx.$dom = {};//存放新建的dom元素
	let data = ctx.data;
	let lang = ctx.lang || {};
	// console.log('render:',data);

	let oMask = document.createElement("div");
	let oBg = document.createElement("div");
	let oBody = document.createElement("div");
	let oCt = document.createElement("div");

	let oBtnDiv = document.createElement("div");
	let oBtnCancel = document.createElement("div");
	let oBtnSure = document.createElement("div");

	// oMask.className = "dw-mask-div mbody";
	oBg.className = "dw-bg";
	oBody.className = "dw-body";
	oCt.className = "dw-ct";
	oCt.innerHTML = '<div class="dw-window"></div>';

	oBtnDiv.className = "dw-btn-div";
	oBtnCancel.className = "dw-btn dw-btn-cancel";
	oBtnSure.className = "dw-btn dw-btn-sure";
	oBtnCancel.innerHTML = lang.cancel || "取消";
	oBtnSure.innerHTML = lang.confirm || "确定";
	oBtnDiv.appendChild(oBtnCancel);
	oBtnDiv.appendChild(oBtnSure);
	ctx.$dom.$scroll = [];//滚动选项
	let nameKey = ctx.nameKey;
	let listKey = ctx.listKey;
	let textKey = ctx.textKey;


	//添加$dom
	ctx.$dom.$bg = oBg;
	ctx.$dom.$ct = oCt;
	ctx.$dom.$mask = oMask;
	ctx.$dom.$confirm = oBtnSure;
	ctx.$dom.$cancel = oBtnCancel;
	ctx.$dom.$content = [];//日期导航，对应的选项
	data.forEach(function(dItem, dIndex){
		//更新ui
		let oDiv = document.createElement("div");
		if(ctx.multiple && dIndex == 0){
			oDiv.className = "dw-content dw-tab-panel dw-tab-panel-active";
		}else if(ctx.multiple){
			oDiv.className = "dw-content dw-tab-panel";
		}else{
			oDiv.className = "dw-content";
		}
		ctx.$dom.$content.push(oDiv);
		refreshDwItem({ ctx, dIndex });
	});

	//日期头部选项卡tab
	let oTabs = [];//日期导航(2个tab)
	let rangeText = lang.range || "至";
	if(ctx.multiple && ctx.type != ctx.TYPE.custom){
		let oHd = document.createElement("div");
		oHd.className = "dw-hd";
		oHd.innerHTML = '<div class="dw-basis">'+rangeText+'</div>';
		ctx.formatCurs.forEach(function(item, index){
			if(index > 1) return;//最多2个导航
			let oDiv = document.createElement("div");
			let oSpan = document.createElement("span");
			oDiv.className = "dw-tab-item";
			oSpan.innerHTML = item.join(ctx.formatTag);
			oSpan.setAttribute("data-id",index);
			oDiv.appendChild(oSpan);
			if(index == 0){
				oSpan.className = "dw-span dw-active";
				oHd.prepend(oDiv);
			}else{
				oSpan.className = "dw-span";
				oHd.appendChild(oDiv);
			}
			oTabs.push(oSpan);
		});
		oBody.appendChild(oHd);
	}
	oBody.appendChild(oCt);
	oBody.appendChild(oBtnDiv);
	oMask.appendChild(oBg);
	oMask.appendChild(oBody);
	document.body.appendChild(oMask);
	setTimeout(function(){
		if(ctx.maxWidth){
			oMask.style.maxWidth = ctx.maxWidth + 'px';
		}
		oMask.className = "dw-mask-div dw-mbody dw-mask-toggle";
	},0);

	//事件监听列表
	ctx.listeners = [
		{ el: oBg, fn: closeMask },
		{ el: oBtnSure, fn: confirm },
		{ el: oBtnCancel, fn: closeMask }
	];
	//绑定头部选项卡
	if(ctx.multiple && oTabs && oTabs.length > 0){
		ctx.$dom.$tabs = oTabs;
		oTabs.forEach(function(tab, tIndex){
			ctx.listeners.push({ el: tab, fn: swithTabPanel });
		});
	}

	//添加事件
	addEventListener(ctx);

	//绑定对应滚动事件
	bindElScroll(ctx);
}

/**
* @desc  刷新ui
* @param {Number} dIndex  当前第几个选项卡，日期最多有2个选项卡，默认第一个
* @param {NUmber} cIndex  当前滚动的item是第几个, 当前滚动speed=500其他则0
* @param {Function} callback
*/
function refreshDwItem({
	ctx,
	dIndex, 
	cIndex, 
	callback
}){
	let speed = 0;
	let isCreated = false;//是否已经创建
	let nameKey = ctx.nameKey;
	let listKey = ctx.listKey;
	let textKey = ctx.textKey;
	let oScroll = ctx.$dom.$scroll;
	let oDwItem = ctx.data[dIndex];
	if(objectProtoType.isArray(oScroll[dIndex]) && oScroll[dIndex].length > 0){
		isCreated = true;
	}else{
		oScroll[dIndex] = [];
	}
	for(let i = 0; i < ctx.level; i++){
		(function(i){
			let oDiv = {}, oItem = {};
			if(!isCreated){
				oItem = document.createElement("div");
				oDiv = document.createElement("div");
				oItem.className = "dw-scroll-item";
				oDiv.className = "dw-div";
				if(ctx.level == 1){//只有一级联动，联动宽度100%
					oItem.style.width = '100%';
				}
			}else{
				oDiv = oScroll[dIndex][i];
			}
			oDiv.innerHTML = '';
			let index = ctx.select[dIndex][i];
			if(index >= oDwItem.length){
				index = oDwItem.length -1;
				ctx.select[dIndex][i] = index;
			}
			// index = index < oDwItem.length ? index : oDwItem.length -1;
			let dist = -ctx.rowHeight*index;
			oDwItem && oDwItem.forEach(function(ele, k){
				let cls = k == index ? 'dw-active dw-p' : 'dw-p';
				let text = ele[nameKey] ? ele[nameKey] : ele;
				text = text[textKey] ? text[textKey] : text;
				oDiv.innerHTML += '<p class="'+cls+'">'+text+'</p>';
			});

			if(!isCreated){
				oItem.appendChild(oDiv);
				ctx.$dom.$content[dIndex].appendChild(oItem);
				ctx.$dom.$ct.appendChild(ctx.$dom.$content[dIndex]);
				ctx.$dom.$scroll[dIndex].push(oDiv);
			}
			oDwItem = oDwItem[index][listKey];
			if(i == cIndex){
				speed = 500;
			}
			cssTransition(oDiv, dist, speed);
			let isLastChild = i == ctx.level-1;
			if(isLastChild && objectProtoType.isFunction(callback)){
				callback();
			}
		})(i);
	}
}

export {
	render,
	refreshDwItem
}