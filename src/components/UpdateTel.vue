<template>
  <div class="updatetel_container">
    <header class="sz_header white">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left black"></a>
      修改手机号
      <p class="right_icon">确定</p>
    </header>

    <mt-field placeholder="请输入你的手机号码" type="tel" v-model="phone"></mt-field>
  </div>
</template>

<script>
    export default {
        name: "updateTel",
        data() {
            return {
                phone: ''
            }
        }
    }
</script>

<style lang="less">
  .mint-cell {
    margin-top: 1rem;
  }
  .mint-cell-value {
  position: relative!important;
  .mint-field-clear {
    position: absolute;
    right: 10px;
    top: 50%;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}
</style>
