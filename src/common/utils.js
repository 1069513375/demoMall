//防抖函数
export function debounce(func,delay){
    let timer = null;
    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
          func.apply(this,args)
      },delay)
    }
  }
//节流函数
export function throttle(func, delay) {
    let run = true
    return function (...args) {
      if (!run) {
        return  // 如果开关关闭了，那就直接不执行下边的代码
      }
      run = false // 持续触发的话，run一直是false，就会停在上边的判断那里
      setTimeout(() => {
        func.apply(this, args)
        run = true // 定时器到时间之后，会把开关打开，我们的函数就会被执行
      }, delay)
    }
  }

  //转日期格式
  export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };
