import axios from 'axios'

const commonConfig = {
    maxContentLength: 120000,
    headers: {
        'Cache-Control': 'no-cache',
        'If-Modified-Since': '0'
    }
};

const http_desktop = axios.create({
    ...commonConfig,
    baseURL: 'http://127.0.0.1:3000/cloudB'
});

const http_raw = axios.create({
    ...commonConfig
});

const handleRetry = (function () {
    const urls = import.meta.env.VUE_APP_URLS ? import.meta.env.VUE_APP_URLS.split(",") : []
    return (error) => {
        if (urls.length <= 0) return false

        //status不存在或者500以上进行重试
        const response = error.response || error
        const status = response.status
        if (status == 200) {
            if (!response.data) return false
            if (response.data.code === 0) return false
            if (response.data.code !== 500) return false
        }
        else if (status >= 300 && status < 500) return false

        const config = error.config

        //接口不支持高可用
        if (config.ha !== true) return false
        if (config.idx_retry === urls.length - 1) return false

        const idx = config.idx_retry = config.idx_retry != null ? (++config.idx_retry) : 0
        const url_to_retry = urls[idx]

        if (!url_to_retry) return false

        let baseURL = config.baseURL
        if (/^https?:\/\//.test(baseURL)) {
            const O = new URL(baseURL)
            baseURL = url_to_retry + O.pathname
        }
        else if (baseURL) {
            let url_prefix = ''
            if (!baseURL.startsWith('/')) {
                url_prefix = location.pathname
                if (/\.(\w+)$/.test(url_prefix)) {
                    const pathArr = url_prefix.split('/')
                    pathArr.pop()
                    url_prefix = pathArr.join('/') + '/'
                }
            }
            baseURL = url_to_retry + url_prefix + baseURL
        }

        const new_config = { ...config, baseURL }
        return http_raw.request({ ...new_config })
    }
})()

const https = [http_desktop, http_raw];

//请求前处理
const washRequestParams = function (config) {
    const { close, ok } = resolveFn(config.data || config.params)

    const closeFn = close
    const okFn = ok || close

    if (closeFn) config._close = closeFn
    if (okFn) config._ok = okFn

    supportGetArray()

    function resolveFn(O) {
        if (Object.prototype.toString.call(O) != "[object Object]") return {}

        const { close, ok } = O
        if (typeof close === "function") {
            delete O.close
        }
        if (typeof ok === "function") {
            delete O.ok
        }
        return { close, ok }
    }

    function supportGetArray() {
        const method = config.method.toLowerCase()
        if (method !== "get") return

        const arr = []
        const params = config.params
        for (var key in params) {
            const vals = params[key]
            if (!(vals instanceof Array) || !vals.length) continue
            const val = vals.map(t => `${key}=${t}`).join("&")
            arr.push(val)
            delete params[key]
        }
        const tt = arr.join("&")
        if (!tt) return

        const index = config.url.indexOf('?')
        if (index === -1) {
            config.url = config.url + "?" + tt
        }
        else if (index === config.url.length - 1) {
            config.url = config.url + tt
        }
        else {
            config.url = config.url + "&" + tt
        }
    }
}

//成功
const handleResolve = function (response) {
    if (response.config._ok) response.config._ok()
    return response
}

//失败
const handleReject = function (response) {
    if (response.config._close) response.config._close()
    return Promise.reject(response)
}

https.forEach(http => {
    http.interceptors.request.use(
        config => {
            washRequestParams(config)
            return config;
        },
        err => {
            console.log(err)
        });
    http.interceptors.response.use(
        response => {
            let { code } = response.data;

            if (code && code === -1) {
                return handleReject(response)
            }
            else if (code && code !== 0) {
                return handleReject(response)
            }
            return handleResolve(response)
        },
        error => {
            const status = error.response.status;
            if (401 === status) {
                return handleRetry(error)
            }
            else if (403 === status) {
                console.log(`无权限访问:${error.config.url}`);
                return handleReject(error)
            }
            else {
                const data = error.response.data || {};
                const msg = data.message || data.msg || error.message;
                return handleReject(error)
            }
        })
})

export {
    http_desktop,
    http_raw
}

