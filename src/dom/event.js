/**
** @desc 添加监听事件
** @param { Object } ctx
** @param { Array } ctx.listeners
** @param { HTMLDivElement } ctx.listeners[i].el
** @param { Function } ctx.listeners[i].fn
**/
function addEventListener(ctx){
	if(!ctx.listeners || ctx.listeners.length == 0) return;
	ctx.listeners.forEach((item, index)=>{
		if(!item.el) return;
		item.el.addEventListener("click", item.fn.bind(null, ctx), false);
	});
}

/**
** @desc 移除监听事件
** @param { Object } ctx
** @param { Array } ctx.listeners
** @param { HTMLDivElement } ctx.listeners[i].el
** @param { Function } ctx.listeners[i].fn
**/
function removeEventListener(ctx){
	if(!ctx.listeners || ctx.listeners.length == 0) return;
	ctx.listeners.forEach((item, index)=>{
		if(!item.el) return;
		item.el.removeEventListener("click", item.fn.bind(null, ctx), false);
	});
}

export {
	addEventListener,
	removeEventListener
}