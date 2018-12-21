const CookieUtil = {
    /* 设置 cookie */
    set: function (name, value, expires, domain, path, secure) {
        let cookieText = "";
        let exDate = new Date();
        // 设置过期时间
        exDate.setDate(exDate.getSeconds() + expires);
        // cookie 值
        cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; expires" + exDate.toGMTString();
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (secure) {
            cookieText += "; secure" + secure;
        }
        document.cookie = cookieText;
    },

    /* 获取 cookie */
    get: function (name) {
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = "",
            cookieEnd = "";
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    // 删除cookie
    unset: (name, domain, path, secure) => {
        CookieUtil.set(name, "", -1)
    }
}

export default CookieUtil;

