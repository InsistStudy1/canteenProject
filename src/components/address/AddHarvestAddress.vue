<template>
  <div class="havest_address_container">
    <header class="sz_header">
      <a class="back mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="$router.push('/harvestaddress')"></a>
      <h2>新增收货地址</h2>
    </header>

    <form>
      <div class="item">
        <label>收货地址：</label>
        <input type="text" name="address" placeholder="请填写收获地址" v-model="address">
      </div>
      <div class="item">
        <label>门牌号：</label>
        <input type="text" name="houseNumber" placeholder="详细地址，例：11栋宿舍201" v-model="houseNumber">
      </div>
      <div class="item linkman">
        <label>联系人：</label>
        <input type="text" name="name" placeholder="请填写联系人姓名" v-model="realName">
      </div>

      <div class="item gender-box">
        <label></label>
        <div class="mui-input-row mui-checkbox mui-left">
          <label>先生</label>
          <input name="gender" value="0" type="checkbox" v-model="gender" @click="gender2=false">
        </div>
        <div class="mui-input-row mui-checkbox mui-left">
          <label>女士</label>
          <input name="gender" value="1" type="checkbox" v-model="gender2" @click="gender=false">
        </div>
      </div>

      <div class="item">
        <label>手机号：</label>
        <input type="text" name="tel" placeholder="请填写收获手机号" v-model="tel">
      </div>

      <button @click.prevent="postAddressInfo">保存地址</button>
    </form>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                address: '',
                houseNumber: '',
                realName: '',
                gender: true,
                gender2: false,
                tel: ''
            }
        },
        methods: {
            postAddressInfo() {

                if (this.address == '') {
                    return mui.toast('收获地址不能为空');
                }
                else if (this.gender == false && this.gender2 == false) {
                    return mui.toast('性别不能为空');
                }
                else if (this.realName == ''){
                    return mui.toast('联系人不能为空');
                }
                else if (this.tel == '') {
                    return mui.toast('手机号不能为空');
                }
                else if (!myReg.tel.test(this.tel)) {
                    return mui.toast('手机号格式不正确');
                }
                this.$post(this.api.addAddress,{
                    user_id: CookieUtil.get('id'),
                    address: this.address,
                    housenumber: this.houseNumber,
                    realname: this.realName,
                    gender: this.gender ? 1 : 2,
                    tel: this.tel,
                    is_default: 0
                }).then(result => {
                    this.$router.push('/harvestaddress')
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .havest_address_container {
    form {
      padding: 0 1rem;
      input::-webkit-input-placeholder{
        color:#ccc;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#ccc;
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#ccc;
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#ccc;
      }
      .item {
        display: flex;
        padding: 1rem 0;
        line-height: 2rem;
        border-bottom: 1px solid #e6e6e6;
        &.linkman {
          border-bottom: none;
          input {
          }
        }
        &.gender-box {
          padding: .6rem 0;
          .mui-input-row {
            label {
              margin-left: 4rem;
              font-size: 1rem;
              width: 3rem;
              padding-right: 0;
            }
          }
        }
        label {
          width: 5.5rem;
          font-size: .8rem;
          padding-left: 3px;
        }
        input[type="text"] {
          flex: 1;
          margin: 0;
          padding: 0 25px 0 10px;
          height: 2rem;
          border: none;
          font-size: .8rem;
        }
      }
      button {
        margin-top: 2rem;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        background-color: #fcb84f;
        border-radius: 1.467rem;
        color: #fff;
      }
    }

  }
</style>
