<template>
  <div class="logo_container">

    <a class="back mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="$router.push('/login')">返回登录</a>

    <img src="../../assets/images/logo_bg.png" alt="">
    <p class="title">注册</p>
    <form>
      <div :class="['input-item', { 'error': userNameFlag == 0 }]">
        <i class="iconfont icon-yonghu"></i>
        <span class="line"></span>
        <input type="text" placeholder="请输入用户名" v-model="userName" @blur="userNameVerify">
        <i class="iconfont icon-ok" v-show="userNameFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="userNameFlag == 0"></i>
      </div>
      <div :class="['input-item', { 'error': emailFlag == 0 }]">
        <i class="iconfont icon-youxiang1"></i>
        <span class="line"></span>
        <input type="text" placeholder="请输入邮箱" v-model="email" @blur="emailVerify">
        <i class="iconfont icon-ok" v-show="emailFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="emailFlag == 0"></i>
      </div>
      <div :class="['input-item', { 'error': pwdFlag == 0 }]">
        <i class="iconfont icon-password"></i>
        <span class="line"></span>
        <input type="password" placeholder="请输入密码" v-model="password" @blur="passwordVerify">
        <i class="iconfont icon-ok" v-show="pwdFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="pwdFlag == 0"></i>
      </div>
      <div :class="['input-item', { 'error': confirmPwdFlag == 0 }]">
        <i class="iconfont icon-password"></i>
        <span class="line"></span>
        <input type="password" placeholder="请再次输入密码" v-model="confirmPwd" @blur="confirmPasswordVerify">
        <i class="iconfont icon-ok" v-show="confirmPwdFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="confirmPwdFlag == 0"></i>
      </div>
      <button @click="register">注册</button>
    </form>
  </div>
</template>

<script>
    import axios from 'axios';
    import myReg from "../../assets/script/RegExp";

    export default {
        name: "Logo",
        data() {
            return {
                userName: "",
                email: "",
                password: "",
                confirmPwd: "",
                userNameFlag: 3,
                emailFlag: 3,
                pwdFlag: 3,
                confirmPwdFlag: 3
            }
        },
        methods: {
            userNameVerify() {
                if (this.userName == '') {
                    mui.toast('用户名不能为空！', {duration: 1000, type: 'div'});
                    this.userNameFlag = 0;
                } else {
                    this.userNameFlag = 1;
                }
            },
            emailVerify() {
                if (this.email == '') {
                    mui.toast('邮箱不能为空！', {duration: 1000, type: 'div'});
                    this.emailFlag = 0;
                } else if (!myReg.email.test(this.email)) {
                    mui.toast('邮箱格式错误！', {duration: 1000, type: 'div'});
                    this.emailFlag = 0;
                } else {
                    this.emailFlag = 1;
                }
            },
            passwordVerify() {
                this.confirmPwdFlag = 3;
                if (this.password == '') {
                    mui.toast('密码不能为空！', {duration: 1000, type: 'div'});
                    this.pwdFlag = 0;
                    this.confirmPwd = "";
                } else if (this.password.length < 6 || this.password.length > 20) {
                    mui.toast('密码6位到20位数！', {duration: 1000, type: 'div'});
                    this.pwdFlag = 0;
                } else {
                    this.pwdFlag = 1;
                }
            },
            confirmPasswordVerify() {
                if (this.confirmPwdFlag == "") {
                    mui.toast('确认密码不能为空！', {duration: 1000, type: 'div'});
                    this.confirmPwdFlag = 0;
                }
                if (this.password !== this.confirmPwd) {
                    mui.toast('两次输入密码不一致！', {duration: 1000, type: 'div'});
                    this.confirmPwdFlag = 0;
                } else {
                    this.confirmPwdFlag = 1;
                }
            },
            register() {
                this.userNameVerify();
                this.emailVerify();
                this.passwordVerify();
                this.confirmPasswordVerify();
                if (this.userNameFlag === 1
                    && this.emailFlag === 1
                    && this.pwdFlag === 1
                    && this.confirmPwdFlag === 1) {
                    this.$post(this.api.register, {
                        username: this.userName,
                        password: this.password,
                        email: this.email
                    }).then(response => {
                        mui.alert('请5分钟内到自己的邮箱激活账号，否则账号销毁', '提示', () => {
                            this.$router.push('/login');
                        });
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    mui.toast('表单输入不完整', {duration: 1000, type: 'div'})
                }
            }
        }
    }
</script>

<style scoped lang="less">
  .logo_container {
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
        box-shadow: .233rem .233rem .5rem rgba(0, 0, 0, .03);
        margin-bottom: 2.8rem;
        &.error {
          box-shadow: .233rem .233rem .3rem rgba(255, 0, 0, .3);
        }
        i {
          position: absolute;
          line-height: 3rem;
          margin-left: 1rem;
          color: #fcb84f;
          &.icon-ok {
            right: 13px;
            font-size: 1.5rem;
            color: forestgreen;
          }
          &.icon-chahao {
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
      }
    }
  }
</style>
