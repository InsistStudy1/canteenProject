<template>
  <div>
    <div class="information-container">
      <header class="sz_header">账户信息</header>

      <div class="items-list bn">
        <div class="head_portrait item">
          <div class="left">
            <span>头像</span>
          </div>
          <div class="right">
            <a href="#picture">
              <img src="../assets/images/logo2.jpg" alt="">
            </a>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
        <div class="item">
          <div class="left">
            <span>用户名</span>
          </div>
          <div class="right">{{ userName }}</div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </div>

      <div class="items-list">
        <div class="items-title">账号绑定</div>
        <div class="item">
          <div class="left">
            <i class="iconfont icon-phone_icon orange"></i>
            <span>手机</span>
          </div>
          <div class="right">
            <span v-if="tel">{{ tel }}</span>
            <span v-if="!tel" class="orange">未绑定</span>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
        <div class="item">
          <div class="left">
            <i class="iconfont icon-mail orange"></i>
            <span>邮箱</span>
          </div>
          <div class="right">
            <span>{{ email }}</span>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
        <router-link to="/harvestaddress" tag="div" class="item">
          <div class="left">
            <i class="iconfont icon-ico_site orange"></i>
            <span>地址</span>
          </div>
          <div class="right">
            <span class="orange" v-if="!addressFlag">未绑定</span>
            <span class="orange" v-if="addressFlag">设置</span>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </router-link>
      </div>

      <div class="items-list">
        <div class="items-title">安全设置</div>
        <div class="item">
          <div class="left">
            <span>修改密码</span>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </div>


      <div class="items-list logout" @click="logout">
        <div class="item">
          退出登录
        </div>
      </div>

    </div>

    <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#">拍照或录像</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="#">选取现有的</a>
        </li>
      </ul>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#picture"><b>取消</b></a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
    import CookieUtil from "../util/cookies";

    export default {
        data() {
            return {
                tel: '',
                headPortrait: '',
                addressFlag: false,
                userName: window.CookieUtil.get('username'),
                email: window.CookieUtil.get('email'),
                user_id: window.CookieUtil.get('id')
            }
        },
        created() {
            this.getDefault();
            // 更新购物车信息
            this.$store.dispatch('updateShopCarInfo');
        },
        methods: {
            logout() {
                mui.confirm('退出登录后无法查看订单，请重新登录后查看?', '确定退出？', data => {
                    // 点击取消
                    if (data.index == 0) return;
                    CookieUtil.unset('id');
                    CookieUtil.unset('username');
                    CookieUtil.unset('email');
                    this.$router.push('/login');
                });
            },
            getDefault() {
                this.$fetch(this.api.getDefaultAddress, {user_id: this.user_id}).then(res => {
                    if (!res) { return this.addressFlag = false}
                    this.addressFlag = true;
                })
            },
        }
    }
</script>

<style scoped lang="less">
  .orange {
    color: #fcb84f;
  }

  .bn {
    border: none !important;
  }

  .information-container {
    .items-list {
      border-top: 1px solid #e5e5e5;
      .items-title {
        padding-top: .6rem;
        padding-left: 1rem;
        height: 2.5rem;
        line-height: 1.767rem;
        color: #8b8b8b;
        background-color: #F7F7F7;
      }
      .item {
        position: relative;
        height: 3.33rem;
        line-height: 3.55rem;
        background-color: #ffffff;
        border-bottom: 1px solid #e5e5e5;
        padding-left: 1rem;
        padding-right: 2rem;
        font-size: 1rem;
        overflow: hidden;
        .left {
          float: left;
          color: #333;
          i {
            font-size: 14px;
            margin-right: .67rem;
          }
        }
        .right {
          float: right;
          color: #595959;
        }
        .icon-xiangyou {
          position: absolute;
          right: 3px;
          top: 0;
          font-size: .8rem;
          color: #b9b9b9;
        }
      }
      .head_portrait {
        height: 4.9rem;
        line-height: 4.9rem;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
      }
      &.logout {
        margin-top: 2.4rem;
        .item {
          text-align: center;
          color: #eb4925;
        }
      }
    }
  }
</style>
