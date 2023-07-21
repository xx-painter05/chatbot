const API = (function () {
    const BASE_URL = 'https://study.duyiedu.com'
    const KEY = 'token'
    const whiteList = ['/login.html', '/reg.html']

    async function request({url, method = 'GET', data}) {
        const resp = await fetch(BASE_URL + url, {
            method,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${ getItem(KEY) }`
            },
            [method === 'POST'? 'body' : undefined]: JSON.stringify(data)
        })
        const res = await resp.json()
        if (!res.code && !getItem(KEY)) {
            setItem(KEY, resp.headers.get('authorization'))
        }
        // 未登录 并且不在白名单内 需要跳转到登录页
        if (res.code === 401 && !whiteList.includes(location.pathname)) {
            window.location.href = '/login.html'
            return alert('登录过期，请重新登录')
        }
        return res
    }

    // 登录
    const login = data => request({
        url: '/api/user/login', 
        method: 'POST',
        data
    })

    // 注册
    const register = data => request({
        url: '/api/user/reg', 
        method: 'POST',
        data
    })

    // 验证账号是否存在
    const exists = loginId => request({
        url: '/api/user/exists?loginId=' + loginId, 
    })

    // 当前登录的用户信息
    const profile = () => request({
        url: '/api/user/profile'
    })

    // 发送聊天信息
    const chat = data => request({
        url: '/api/chat',
        method: 'POST',
        data
    })

    // 获取聊天记录
    const history = () => request({
        url: '/api/chat/history'
    })

    return {
        login,
        register,
        exists,
        profile,
        chat,
        history
    }
})();