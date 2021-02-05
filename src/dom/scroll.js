import ElScroll from 'el-scroll'
import { selectThis } from './handler.js'
import { refreshDwItem } from './render.js'

function bindElScroll(ctx){
	// oScroll
	let oScrollDivs = [];//滚动项目，对应的滚动实例，用于滚动结束，调整对应选项可滚动的高度
	ctx.$dom.$scroll.forEach(function(dItem, dIndex){
		// console.log('1j',dItem,dIndex);
		oScrollDivs[dIndex] = [];
		dItem.forEach(function(item, i){
			let scroller = new ElScroll(item);
			oScrollDivs[dIndex][i] = scroller;
			scroller.on('beforeScrollEnd', (res)=>{
				//选中滚动步数修复
		        let dist = Math.abs(res.dist);
		        let yu = dist%ctx.rowHeight;
		        let index;
		        if( yu > 0){
		        	index = Math.floor(dist/ctx.rowHeight);
		        	index = yu > 0.5*ctx.rowHeight ? index+1 : index;
		        	dist = ctx.rowHeight*index;
		        }
		        dist = res.dist > 0 ? dist : -dist;
		        index = index ? index : Math.abs(dist/ctx.rowHeight);//第1个与最后一个,临界值处理
		        // console.log("选中滚动步数修复:",res.dist, dist, yu, index,i);

		        ctx.select[dIndex][i] = index;
		        // console.log('选中：', ctx.select, index);

		        //更新ui
		   		refreshDwItem({
		   			ctx,
		   			dIndex,
		   			cIndex: i,
		   			callback: ()=>{
			   			//更新绑定滚动div的可滚动距离
			   			oScrollDivs[dIndex].forEach(function(oDiv){
			   				oDiv.resetMaxScrollY();
							// console.log('更新绑定滚动div的可滚动距离:',dIndex,oDiv,oScrollDivs);
			   			});
			   			//选中数据
			   			selectThis(ctx, dIndex);
			   		}
		   		});

		   		//调整最终停止的位置
		   		return dist;
			});
		});
	});
}

export {
	bindElScroll
}