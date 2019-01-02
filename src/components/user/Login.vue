<template>
  <div class="logo_container">

    <a class="back mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="$router.push('/index')">返回首页</a>

    <img :src="require('assets/images/logo_bg.png')" alt="">
    <p class="title">账号密码登录</p>
    <form action="">
      <div :class="['input-item', { 'error': userNameFlag == 0 }]">
        <i class="iconfont icon-yonghu"></i>
        <span class="line"></span>
        <input type="text" placeholder="请输入用户名" v-model="userName" @blur="userNameVerify">
        <i class="iconfont icon-ok" v-show="userNameFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="userNameFlag == 0"></i>
      </div>
      <div :class="['input-item', { 'error': pwdFlag == 0 }]">
        <i class="iconfont icon-password"></i>
        <span class="line"></span>
        <input type="password" placeholder="请输入密码" v-model="password" @blur="passwordVerify">
        <i class="iconfont icon-ok" v-show="pwdFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="pwdFlag == 0"></i>
      </div>
      <button @click="login">登录</button>
      <router-link tag="button" to="/register" class="register_btn">注册</router-link>
    </form>
  </div>
</template>

<script>
    export default {
        name: "Logo",
        data() {
            return {
                userName: "",
                password: "",
                userNameFlag: 3,
                pwdFlag: 3
            }
        },
        methods: {
            // 用户名验证
            userNameVerify() {
                if (this.userName == '') {
                    mui.toast('用户名不能为空！', {duration: 1000, type: 'div'});
                    this.userNameFlag = 0;
                } else {
                    this.userNameFlag = 1;
                }
            },
            // 密码验证
            passwordVerify() {
                if (this.password == ''){
                    mui.toast('密码不能为空！',{ duration: 1000, type:'div' });
                    this.pwdFlag = 0;
                } else if (this.password.length < 6 || this.password.length >20) {
                    mui.toast('密码6位到20位数！',{ duration: 1000, type:'div' });
                    this.pwdFlag = 0;
                }  else {
                    this.pwdFlag = 1;
                }
            },
            // 登录
            login() {
                this.userNameVerify();
                this.passwordVerify();
                if (this.userNameFlag === 1 && this.pwdFlag === 1) {
                    this.$post(this.api.login,{
                        username: this.userName,
                        password: this.password
                    }).then(response => {
                        // 设置 Cookie
                        window.CookieUtil.set('id', response.id, 1000*60*60*24);
                        window.CookieUtil.set('username', response.username, 1000*60*60*24);
                        window.CookieUtil.set('email', response.email, 1000*60*60*24);
                        this.getShopCarInfo();
                        this.$router.push('/');
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    mui.toast('表单输入不完整',{ duration: 1000, type:'div' })
                }
            },
            // 更新购物车信息
            getShopCarInfo() {
                // this.$store.dispatch('updateShopCarInfo');
            }
        },
        computed: {
            shopCarCount() {
                return this.$store.state.shopCarCount;
            },
            shopCarTotalPrice() {
                return this.$store.state.shopCarTotalPrice;
            }
        }
    }
</script>

<style scoped lang="less">
  .logo_container {
    position: relative;
    background-color: #fff;
    height: 100%;
    img {
      width: 100%;
    }
    .title {
      position: absolute;
      left: 50%;
      top: 9rem;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      color: #fff;
      font-weight: 600;
    }
    form {
      margin: 3.767rem 1.54rem 0;
      .input-item {
        position: relative;
        height: 3rem;
        background-color: #ffffff;
        border-radius: 1.467rem;
        box-shadow: .233rem .233rem .5rem rgba(0,0,0,.03);
        margin-bottom: 2.8rem;
        &.error {
          box-shadow: .233rem .233rem .3rem rgba(255, 0, 0, .3);
        }
        i {
          position: absolute;
          line-height: 3rem;
          margin-left: 1rem;
          color: #fcb84f;
          font-size: 1rem;
          &.icon-ok {
            top: 0;
            right: 13px;
            font-size: 1.5rem;
            color: forestgreen;
          }
          &.icon-chahao {
            top: 0;
            right: 13px;
            font-size: 1.3rem;
            color: red;
          }
        }
        .line {
          position: absolute;
          left: 3rem;
          top: 1.1rem;
          width: 0.067rem;
          height: 0.8rem;
          background-color: #eaeaea;
        }
        input {
          width: 21rem;
          height: 2rem;
          font-size: 1rem;
          margin: .5rem 1rem .5rem 4.06rem;
          line-height: 2rem;
          padding: 0;
          box-sizing: border-box;
          border: none;
        }
      }
      button {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        background-color: #fcb84f;
        border-radius: 1.467rem;
        color: #fff;
        font-size: 1.067rem;
        &.register_btn {
          margin-top: 1.5rem;
          background-color: #fff;
          color: #000;
          box-shadow: .233rem .233rem .5rem rgba(0,0,0,.09);
          margin-bottom: 1rem;
        }
      }
    }
  }
</style>
