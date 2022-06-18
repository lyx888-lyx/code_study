const ua = window.navigator.userAgent;
const isIE = ("ActiveXObject" in window);
const isChrome = ua.match(/Chrome/i);
const isMobile = !!(ua.match(/(iPhone|iPad|iPod)/i) || ua.match(/Android/i) || ua.match(/Windows Phone/i) || ua.match(/IEMobile/i));
let IEVersion = null;
let isIE8, isIE9, isIE10, isIE11;
isIE8 = isIE9 = isIE10 = isIE11 = false;
const appName = navigator.appName;
if (appName === "Microsoft Internet Explorer" || isIE) {
    let ret = ua.match(/MSIE (\d+[.\d]*)/);
    if (ret) {
        let version = ret[1];
        IEVersion = version;
        let num = parseInt(version, 10);
        isIE8 = num === 8;
        isIE9 = num === 9;
        isIE10 = num === 10;
        isIE11 = num === 11;
    }
}

/**
 * 浏览器环境判断模块
 */
export default {
    isChrome, // 是否Chrome浏览器
    isIE, // 是否IE浏览器
    isMobile, // 是否移动端
    IEVersion,
    isIE8,
    isIE9,
    isIE10,
    isIE11
}
