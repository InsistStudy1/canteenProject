<template>
  <div class="updatepwd_container">

    <a class="back mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="$router.go(-1)">返回</a>

    <img :src="require('assets/images/logo_bg.png')" alt="">
    <p class="title">修改密码</p>
    <form>
      <div :class="['input-item', { 'error': oldPwdFlag == 0 }]">
        <i class="iconfont icon-password"></i>
        <span class="line"></span>
        <input type="password" placeholder="请输入原密码" v-model="oldPwd" @blur="passwordVerify(oldPwd, 'oldPwdFlag')">
        <i class="iconfont icon-ok" v-show="oldPwdFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="oldPwdFlag == 0"></i>
      </div>

      <div :class="['input-item', { 'error': newPwdFlag == 0 }]">
        <i class="iconfont icon-password"></i>
        <span class="line"></span>
        <input type="password" placeholder="请输入新密码" v-model="newPwd" @blur="passwordVerify(newPwd, 'newPwdFlag')">
        <i class="iconfont icon-ok" v-show="newPwdFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="newPwdFlag == 0"></i>
      </div>

      <div :class="['input-item', { 'error': confirmPwdFlag == 0 }]">
        <i class="iconfont icon-password"></i>
        <span class="line"></span>
        <input type="password" placeholder="请再次输入密码" v-model="confirmPwd" @blur="confirmPasswordVerify">
        <i class="iconfont icon-ok" v-show="confirmPwdFlag == 1"></i>
        <i class="iconfont icon-chahao" v-show="confirmPwdFlag == 0"></i>
      </div>
      <button @click="updatePwd" @keyup.enter="updatePwd">确认修改</button>
    </form>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                oldPwd: "",
                newPwd: "",
                confirmPwd: "",
                oldPwdFlag: 3,
                newPwdFlag: 3,
                confirmPwdFlag: 3,
                user_id: window.CookieUtil.get('id')
            }
        },
        methods: {
            passwordVerify(val, flag) {
                this.confirmPwdFlag = 3;
                console.log(flag);
                if (val == '') {
                    mui.toast('密码不能为空！', {duration: 1000, type: 'div'});
                    this[flag] = 0;
                } else if (val.length < 6 || val.length > 20) {
                    mui.toast('密码6位到20位数！', {duration: 1000, type: 'div'});
                    this[flag] = 0;
                } else {
                    this[flag] = 1;
                }
            },
            confirmPasswordVerify() {
                if (this.confirmPwdFlag == "") {
                    mui.toast('确认密码不能为空！', {duration: 1000, type: 'div'});
                    this.confirmPwdFlag = 0;
                }
                if (this.newPwd !== this.confirmPwd) {
                    mui.toast('两次输入密码不一致！', {duration: 1000, type: 'div'});
                    this.confirmPwdFlag = 0;
                } else {
                    this.confirmPwdFlag = 1;
                }
            },
            updatePwd() {
                this.passwordVerify(this.oldPwd, 'oldPwdFlag');
                this.passwordVerify(this.newPwd, 'newPwdFlag');
                this.confirmPasswordVerify();
                if (this.oldPwdFlag === 1
                    && this.confirmPwdFlag === 1) {
                    this.$post(this.api.updatePwd, {
                        user_id: this.user_id,
                        oldCode: this.oldPwd,
                        code: this.newPwd
                    }).then(response => {
                        if (response.check) {
                            mui.toast('修改成功');
                            this.$router.push('/information');
                        } else {
                            mui.toast('原密码错误');
                            this.oldPwd = '';
                            this.newPwd = '';
                            this.confirmPwd = '';
                            this.oldPwdFlag = 0;
                            this.newPwdFlag = 3;
                            this.confirmPwdFlag = 3;
                        }
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
  .updatepwd_container {
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
          font-size: 1rem;
          color: #fcb84f;
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
      }
    }
  }
</style>
