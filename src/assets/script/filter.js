import Vue from 'vue'
import moment from 'moment'

export default (function () {
    // 日期格式化
    Vue.filter('dateFormat', val => {
        return val ? moment(val).format('YYYY-MM-DD') : '';
    })
    // 时间格式化
    Vue.filter('timeFormat', val => {
        return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    })
    // 时间格式化
    Vue.filter('hourFormat', val => {
        return val ? moment(val).format('mm:ss') : '';
    })
    // 货币过滤器

    const digitsRE = /(\d{3})(?=\d)/g
    Vue.filter('currency', (value, currency, decimals) => {
        if (!isFinite(value) || (!value && value !== 0)) return ''
        currency = currency != null ? currency : '$'
        decimals = decimals != null ? decimals : 2
        var stringified = Math.abs(value).toFixed(decimals)
        var _int = decimals
            ? stringified.slice(0, -1 - decimals)
            : stringified
        var i = _int.length % 3
        var head = i > 0
            ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
            : ''
        var _float = decimals
            ? stringified.slice(-1 - decimals)
            : ''
        var sign = value < 0 ? '-' : ''
        return sign + currency + head +
            _int.slice(i).replace(digitsRE, '$1,') +
            _float
    })
})()



