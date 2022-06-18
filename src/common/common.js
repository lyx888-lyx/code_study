/* 防抖节流函数 */
let timeout = null // 创建一个标记用来存放定时器的返回值

// 防抖
export function debounce(func, wait = 300, immediate = false) {
    // 清除定时器
    if (timeout !== null) clearTimeout(timeout);
    // 立即执行，此类情况一般用不到
    if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(function() {
            timeout = null;
        }, wait);
        if (callNow) typeof func === 'function' && func();
    } else {
        // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
        timeout = setTimeout(function() {
            typeof func === 'function' && func();
        }, wait);
    }
}

// 节流
let timer, flag;
export function throttle(func, wait = 300, immediate = true) {
    if (immediate) {
        if (!flag) {
            flag = true;
            // 如果是立即执行，则在wait毫秒内开始时执行
            typeof func === 'function' && func();
            timer = setTimeout(() => {
                flag = false;
            }, wait);
        }
    } else {
        if (!flag) {
            flag = true
            // 如果是非立即执行，则在wait毫秒内的结束处执行
            timer = setTimeout(() => {
                flag = false
                typeof func === 'function' && func();
            }, wait);
        }
    }
}
