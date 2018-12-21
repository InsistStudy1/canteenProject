import axios from 'axios'
import Qs from 'qs'
import router from '../router/index'

axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        MintUi.Indicator.open({//打开loading
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        MintUi.Indicator.close();//关闭loading
        let res = response.data;
        let status = res.status;
        switch (status) {
            case 0:
                return res[0];
            case 1:
                // mui.toast('请求失败', {duration: 1000, type: 'div'});
                break;
            case 2:
                router.push('/login');
                mui.alert('请先登录', '提示')
                break;
            case 3:
                mui.toast('邮箱未激活', {duration: 1000, type: 'div'});
                break;
            case 4:
                mui.toast('账号或密码错误', {duration: 1000, type: 'div'});
                break;
            case 5:
                mui.toast('注册失败（邮箱或用户名已存在）！', {duration: 1000, type: 'div'})
                break;
        }
    },
    error => {
        MintUi.Indicator.close();//关闭loading
        mui.toast('未连接到服务器');
        return Promise.reject(error.response)
    }
)

/*
* get 请求方法
* @param { String } url 请求路径
* @param { Object } params 传输对象
* @return { Promise }
* */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    })
};

/*
* post 请求方法
* @param { String } url 请求路径
* @param { Object } data 传输对象
* @return { Promise }
* */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(data)).then(response => {
            resolve(response)
        }).then(error => {
            reject(error);
        })
    })
}


/*
* patch 请求方法
* @param { String } url 请求路径
* @param { Object } data 传输对象
* @return { Promise }
* */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(response => {
            resolve(response.data)
        }).then(error => {
            reject(error);
        })
    })
}

/*
* put 请求方法
* @param { String } url 请求路径
* @param { Object } data 传输对象
* @return { Promise }
* */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(response => {
            resolve(response.data)
        }).then(error => {
            reject(error);
        })
    })
}
