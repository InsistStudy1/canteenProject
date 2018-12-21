<template>
  <div class="havest_address_container">
    <header class="sz_header">
      <a class="back mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="$router.push('/information')"></a>
      <h2>我的收获地址</h2>
      <router-link class="right_icon white" to="/addharvestaddress">新增地址</router-link>
    </header>
    <div class="address_list">
      <div class="item" v-for="item in addressList" :key="item.id">
        <p class="address"><span class="default" v-show="item.is_default == 1">默认</span>{{ item.address }} {{ item.housenumber }}</p>
        <p class="info"><span>{{ item.realname }}</span><span>（{{ item.gender == '男' ? '先生' : '小姐'  }}） </span> &nbsp;&nbsp;&nbsp;&nbsp;<span class="tel">{{ item.tel }}</span></p>
        <div class="operation">
          <span class="setting_default" v-show="item.is_default == 0" @click="settingDefault(item.id)">设置默认</span>
          <router-link tag="i" :to="'/editHarvestAddress/' + item.id" class="iconfont icon-bianji"></router-link>
          <i class="iconfont icon-shanchu" @click="deleteAddress(item.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HarvestAddress",
        data() {
            return {
                addressList: [],
                user_id: window.CookieUtil.get('id')
            }
        },
        created() {
          this.getAddressList();
        },
        methods: {
            // 获取地址列表
            getAddressList() {
                this.$fetch(this.api.showAllAddress, {user_id: this.user_id}).then(res => {
                    this.addressList = res;
                    // 如果只有一个地址并且不是默认地址，设置为默认地址
                    if (this.addressList.length == 1 && this.addressList.is_default == '0'){
                        this.settingDefault(this.addressList[0].id);
                    }
                })
            },
            // 设置默认地址
            settingDefault(id) {
              this.$fetch(this.api.setAddressDefault, {
                  user_id: this.user_id,
                  id: id
              }).then(res => {
                  this.addressList.forEach(item => {
                      if (item.id == id) {
                          item.is_default = true;
                      } else {
                          item.is_default = false;
                      }
                  })
              })
            },
            // 删除地址
            deleteAddress(id) {
                this.$fetch(this.api.deleteAddress, {
                    user_id: this.user_id,
                    id: id
                }).then(res => {
                    mui.toast('删除成功', {duration: 1000, type: 'div'})
                    this.getAddressList();
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .havest_address_container {
    .address_list {
      padding: 0 .66rem;
      color: #000;
      .item {
        position: relative;
        padding: .4rem 0;
        border-bottom: 1px solid #e6e6e6;
        height: 5.2rem;
        .address {
          .default {
            /*display: inline-block;*/
            width: 1.2rem;
            padding: 0 .5rem;
            background-color: #adffb2;
            font-weight: 400;
            font-size: .6rem;
            margin-right: .5rem;
            color: green;
          }
          line-height: 2rem;
          font-weight: 600;
          color: #000;
          font-size: 1rem;
          letter-spacing: .5px;
        }
        .info {
          line-height: 2.4rem;
          font-size: .9rem;
        }
        .operation {
          position: absolute;
          top: 0;
          right: .5rem;
          i {
            font-size: 1.4rem;
            line-height: 5.2rem;
          }
          .setting_default {
            margin-right: .2rem;
            font-size: .8rem;
            line-height: 5.2rem;
            color: orange;
          }
        }
      }
    }
  }
</style>
