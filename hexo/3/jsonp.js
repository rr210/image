 // 封装一个jsonP函数
 function jsonp(e) {
    var script = document.createElement('script')
    // 将传递的data取出来
    params = ''
    for(let arr in e.data){
        params+=`&${arr}=${e.data[arr]}`
    }
    // 设置window下的随机函数名
    fName = 'myjson' + Math.random().toString().replace('.', '')
    // 设置src中的请求地址
    window[fName] = e.success
    script.src = e.url + `?callback=${fName+params}`
    document.body.appendChild(script)
    script.onload = function () {
        document.body.removeChild(script)
    }
}