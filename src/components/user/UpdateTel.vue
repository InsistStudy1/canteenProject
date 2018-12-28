<template>
  <div class="updatetel_container">
    <header class="sz_header white">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left black"></a>
      修改手机号
      <p class="right_icon" @click="editTel">确定</p>
    </header>

    <mt-field placeholder="请输入你的手机号码" type="tel" v-model="tel"></mt-field>
  </div>
</template>

<script>
    export default {
        name: "updateTel",
        data() {
            return {
                tel: this.$route.params.tel || '',
                user_id: window.CookieUtil.get('id')
            }
        },
        created() {
        },
        methods: {
            editTel() {
                this.$post(this.api.editTel, {user_id: this.user_id, tel: this.tel}).then(res => {
                    mui.toast('修改成功！');
                    this.$router.push('/information')
                })
            }
        }
    }
</script>

<style lang="less">
  .mint-cell {
    margin-top: 1rem;
  }

  .mint-cell-value {
    position: relative !important;
    .mint-field-clear {
      position: absolute;
      right: 10px;
      top: 50%;
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }
  }
</style>
