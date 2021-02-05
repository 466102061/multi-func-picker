
//为了兼容性，重置window.requestAnimationFrame
function resetBrowersAnimationFrame(){
	//监听页面重绘的监听兼容性写法，一般配合动画效果
	window.requestAnimationFrame = (function () {
	    return window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        window.oRequestAnimationFrame ||
	        window.msRequestAnimationFrame ||
	        function (callback) {
	            //1s/60帧
	            window.setTimeout(callback, 1000 / 60);
	        };
	})();

	//取消页面重绘监听的兼容性写法
	window.cancelAnimationFrame = (function () {
	    return window.cancelAnimationFrame ||
	        window.webkitCancelAnimationFrame ||
	        window.mozCancelAnimationFrame ||
	        window.oCancelAnimationFrame ||
	        function (timer) {
	            window.clearTimeout(timer);
	        };
	})();
}

//清除浏览器运动
function cancelBrowersAnimationFrame(ctx){
	window.cancelAnimationFrame(ctx.timer);
}

/**
* @desc css平移运动
* @param {String} element   元素
* @param {Number} distance  步数
* @param {Number} speed     速度
*/
function cssTransition(element, distance, speed) {
	element.timer = window.requestAnimationFrame(function(){
	    element.style.webkitTransitionDuration =
	    element.style.MozTransitionDuration =
	    element.style.msTransitionDuration =
	    element.style.OTransitionDuration =
		element.style.transitionDuration = speed + 'ms';

	    element.style.webkitTransitionTimingFunction =
	    element.style.MozTransitionTimingFunction =
	    element.style.msTransitionTimingFunction =
	    element.style.OTransitionTimingFunction =
		element.style.transitionTimingFunction = 'ease-out';

	    element.style.webkitTransform =
	    element.style.msTransform =
	    element.style.MozTransform =
	    element.style.OTransform = 'translateY(' + distance + 'px)' + 'translateZ(0)';
	})
	return element.timer;
}

//浏览器，css运动结束
function cssTransitionEndEach(callback){
    [
    	'transitionend',
    	'webkitTransitionend',
    	'msTransitionend',
    	'MozTransitionend'
    ].forEach(function(item){
    	callback && callback(item);
    });
}

export {
	cssTransition,
	cssTransitionEndEach,
	resetBrowersAnimationFrame,
	cancelBrowersAnimationFrame
}

