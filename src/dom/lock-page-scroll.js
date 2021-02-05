/**
 * 页面滚动方法【移动端】
 * @type {{lock, unlock}}
 * lock：禁止页面滚动, unlock：释放页面滚动
 */
let pageScroll = function () {
    let fn = function (e) {
    	e.preventDefault();
    };
    let islock = false;

    return {
        lock: function () {
            if (islock)return;
            islock = true;
            document.body.addEventListener('touchmove', fn,{passive:false});
            window.document.body.style.overflow = 'hidden';
            // console.log('lock');
        },
        unlock: function () {
            islock = false;
            document.body.removeEventListener('touchmove', fn,{passive:false});
            window.document.body.style.overflow = 'auto';
            // console.log('unlock');
        }
    };
}();

export {
	pageScroll
}
