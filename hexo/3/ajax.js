function ajax(params) {
    // 给ajax设定一个默认值
    let defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/json'
        },
        success: (data) => {},
        error: (data) => {}
    }
    // 使用Object.assign()方法 将之间的对象覆盖
    Object.assign(defaults,params)
    let xhr = new XMLHttpRequest();
    let options = ''
    for (let attr in params.data) {
        options += attr + '=' + defaults.data[attr] + '&'
    }
    options = options.substr(0, defaults.length - 1)
    // console.log(options)
    if (defaults.type === 'get') {
        defaults.url = defaults.url + '?' + options
    }
    xhr.open(defaults.type, defaults.url)
    if (defaults.type == 'post') {
        let contentType = defaults.header['Content-Type']
        xhr.setRequestHeader('Content-Type', contentType)
        if (contentType === 'application/json') {
            xhr.send(JSON.stringify(defaults.data))
        } else {
            xhr.send(options)
        }
    } else {
        xhr.send()
    }
    xhr.onload = () => {
        // 对http的状态码进行判断如果状态码为200则调用success函数，如果失败则调用error函数
        if (xhr.status == 200) {
            let responseHeader = xhr.getResponseHeader('Content-Type')
            let resText = xhr.responseText
            if (responseHeader.includes('application/json')) {
                resText = JSON.parse(resText)
            }
            defaults.success(resText, xhr)
        } else {
            defaults.error(resText, xhr)
        }
    }
}