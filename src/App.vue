<template>
  <div id="app">

    <!--<transition name="router">-->
      <router-view/>
    <!--</transition>-->

    <footer class="footer_tabbar" ref="footer_tabbar">
      <router-link to="/" tag="div" class="item">
        <i class="iconfont icon-shouye"></i>
        <p>首页</p>
      </router-link>
      <router-link to="order" tag="div" class="item">
        <i class="iconfont icon-dingdan"></i>
        <p>订单</p>
      </router-link>
      <router-link to="shoppingcar" tag="div" class="item">
        <i class="iconfont icon-gouwuche"></i>
        <p>购物车</p>
        <span class="count" v-show="shopCarAllCount>=1">{{ shopCarAllCount }}</span>
      </router-link>
      <router-link to="information" tag="div" class="item">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </footer>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                noCheckCookieList: ['/login', '/register', '/index']
            }
        },
        methods: {
            // 切换样式
            toggleColor() {
                let path = this.$route.path;
                if (path !== "/index" && path !== "/order" && path !== "/shoppingcar" && path !== '/information') {
                    document.body.classList.add('white');
                    this.$refs.footer_tabbar.classList.add('hide');
                }
                else {
                    document.body.classList.remove('white');
                    this.$refs.footer_tabbar.classList.remove('hide');
                }
            },
        },
        mounted() {
            this.toggleColor();
        },
        computed: {
            shopCarAllCount() {
                return this.$store.state.shopCarAllCount;
            }
        },
        watch: {
            $route(to, from) {
                this.toggleColor();
            }
        }
    }

</script>

<style lang="less">
  html, body {
    height: 100%;
    background-color: #F7F7F7!important;
    &.white {
      background-color: #FFF!important;
    }
  }
  #app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    padding-bottom: 3.96rem;
    height: 100%;
  }

  .router-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .router-leave-to {
    opacity: 0;
    position: absolute;
    transform: translateX(-100%);
  }

  .router-enter-active,
  .router-leave-active {
    transition: all 0.5s ease;
  }

  .footer_tabbar {
    display: flex;
    position: fixed;
    /*position: absolute;*/
    left: 0;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #b3b3b3;
    z-index: 999;
    background-color: #fff;
    &.hide {
      display: none;
    }
    .item {
      position: relative;
      flex: 1;
      text-align: center;
      color: #472d22;
      padding-top: .64rem;
      i {
        font-size: 1.742rem;
        line-height: 1.8rem;
      }
      p {
        font-size: 0.88rem;
        line-height: 1.52rem;
      }
      .count {
        position: absolute;
        left: 50%;
        top: -.3rem;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.3rem;
        text-align: center;
        color: #fff;
        background-color: #f0300a;
        border-radius: 50%;
        transform: scale(.6);
      }
      &.router-link-exact-active {
        color: orange;
        p {
          color: orange;
        }
      }
    }
  }

</style>
