<template>
  <div class="dishesdetails-container">
    <!-- 头部 Start -->
    <header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"><span>返回</span></a>
    </header>
    <!-- 头部 End -->

    <!-- 商品信息 Start -->
    <!--<div class="dishes-content">-->
    <!--<img :src="goodInfo.images" alt="">-->
    <!--<p class="title">{{ goodInfo.goodsname }}</p>-->
    <!--<div class="order">-->
    <!--<span>月售 {{ goodInfo.sold_num }} 份 </span>-->
    <!--<span> 商品评分 {{ goodInfo.stars }}</span>-->
    <!--</div>-->
    <!--<div class="price-box">-->
    <!--<p class="price"><span>￥</span>{{ goodInfo.price }}</p>-->
    <!--<button @click="addShopCar"><i class="iconfont icon-jia"></i>加入购物车<span class="ball" ref="ball"></span></button>-->
    <!--</div>-->
    <!--</div>-->
    <div class="dishes-content">
      <img :src="'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg'"
           alt="">
      <p class="title">烧鸭饭</p>
      <div class="order">
        <span>月售 10 份 </span>
        <span> 商品评分 5.0</span>
      </div>
      <div class="price-box">
        <p class="price"><span>￥</span>10</p>
        <button @click="addShopCar"><i class="iconfont icon-jia"></i>加入购物车<span class="ball" ref="ball"></span></button>
      </div>
    </div>
    <!-- 商品信息 End -->

    <div class="commit-box">
      <h2 class="title">外卖评价</h2>
      <div class="content">
        <h4 class="not_have">暂无</h4>
      </div>
    </div>

    <!--<div :class="['shopping-nav', {active: shopCarCount >= 1}]">-->
    <!--<router-link to="/shoppingcar" tag="p" class="icon-car" ref="shop_car">-->
    <!--<i class="iconfont icon-gouwuche"></i>-->
    <!--<span class="ball" ref="nowBallNum">{{ shopCarCount }}</span>-->
    <!--</router-link>-->
    <!--<div class="price-box">-->
    <!--<p>{{ shopCarTotalPrice | currency('¥', 2) }}</p>-->
    <!--<p v-show="shopCarCount >= 1">免配送费</p>-->
    <!--</div>-->
    <!--&lt;!&ndash;<button>￥0起送</button>&ndash;&gt;-->
    <!--<router-link to="/submitorder" tag="button">去结算</router-link>-->
    <!--</div>-->
    <div class="shopping-nav active" ref="shopping_nav">
      <router-link to="/shoppingcar" tag="p" class="icon-car" ref="shop_car">
        <i class="iconfont icon-gouwuche"></i>
        <span class="ball" ref="nowBallNum">5</span>
      </router-link>
      <div class="price-box">
        <p>10</p>
        <p>免配送费</p>
      </div>
      <!--<button>￥0起送</button>-->
      <router-link to="/submitorder" tag="button">去结算</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                goodId: this.$route.params.id,
                // 商品数据
                goodInfo: {
                    goodsname: '',
                    stars: '',
                    image: '',
                    price: 0,
                    sold_num: 0
                },
                user_id: window.CookieUtil.get('id')
            }
        },
        created() {
            console.log(document.body.clientHeight);
            this.getGoodInfo();
            this.$store.dispatch('updateShopCarInfo');
        },
        mounted() {
            this.settingShoppingNav();
        },
        methods: {
            getGoodInfo() {
                this.$fetch(this.api.getGoodInfo, {id: this.goodId}).then(res => {
                    this.goodInfo.goodsname = res.goodsname;
                    this.goodInfo.stars = res.stars;
                    this.goodInfo.image = res.image;
                    this.goodInfo.price = res.price;
                    this.goodInfo.sold_num = res.sold_num;
                })
            },
            // 添加商品到购物车
            addShopCar() {
                this.$post(this.api.addGoods, {user_id: this.user_id, goods_id: this.goodId}).then(res => {
                    this.$store.dispatch('updateShopCarInfo');
                })
            },

            settingShoppingNav() {
                let shopping_nav = this.$refs.shopping_nav;
                shopping_nav.style.top = document.body.clientHeight - shopping_nav.offsetHeight + 'px';
            },

            addShopCarAnimation() {

                // console.log(this.$refs.shop_car.children[1]);
                // let ball = this.$refs.ball,
                //     nowBallNum = this.$refs.nowBallNum,
                //     ballX = ball.getBoundingClientRect().x,
                //     ballY = ball.getBoundingClientRect().y,
                //     nowBallNumX = nowBallNum.getBoundingClientRect().x,
                //     nowBallNumY = nowBallNum.getBoundingClientRect().y;
                // // ball.getBoundingClientRect.x() = nowBallNumX;
                // console.log(ball.offsetLeft);
                // ball.style.left = ball.offsetLeft + nowBallNumX - ballX + 'px';
                // ball.style.top = ball.offsetTop + nowBallNumY - ballY + 'px';
                // console.log(nowBallNumX - ballX);
                // console.log(nowBallNumY - ballY);
            }
        },
        computed: {
            // 购物车数量
            shopCarCount() {
                return this.$store.state.shopCarCount;
            },
            // 购物车选中总价格
            shopCarTotalPrice() {
                return this.$store.state.shopCarTotalPrice;
            }
        }
    }
</script>

<style scoped lang="less">
  .dishesdetails-container {
    position: relative;
    padding: 0 .66rem;
    min-height: 100%;
    header {
      height: 3rem;
      a {
        height: 3rem;
        line-height: 3rem;
        font-size: 1.5rem !important;
        color: #fcb84f;
        span {
          font-size: 1.1rem;
          padding-left: .1rem;
        }
        &:active {
          color: #fcb84f;
        }
      }
    }

    /* 商品信息 Start */
    .dishes-content {
      img {
        width: 100%;
        border-radius: 0.333rem;
      }
      .title {
        margin-top: 1rem;
        font-size: 1.267rem;
        color: #333333;
        font-weight: 500;
      }
      .order {
        margin-top: .6rem;
        span {
          font-size: 0.8rem;
          color: #818181;
        }
      }
      .price-box {
        height: 4.167rem;
        border-bottom: 1px solid #e6e6e6;
        p {
          float: left;
          margin-top: 1.3rem;
          font-size: 1.3rem;
          color: #f56c20;
          span {
            font-size: 0.667rem;
          }
        }
        button {
          position: relative;
          i {
            font-size: .5rem;
            font-weight: 800;
            margin-right: .3rem;
          }
          float: right;
          width: 7.6rem;
          height: 2rem;
          margin-top: 1.2rem;
          font-size: 0.867rem;
          color: #472d22;
          background-color: #ffcb57;
          border-radius: 1rem;
          .ball {
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translateX(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 1rem;
            height: 1rem;
            background-color: #ff0;
            border-radius: 50%;
            transition: all 2s ease;
            opacity: 0;
          }
        }
      }
    }
    /* 商品信息 End */

    /* 外卖评价 Start */
    .commit-box {
      .title {
        font-size: 1.267rem;
        color: #333;
        line-height: 3rem;
        font-weight: 600;
      }
      .content {
        .not_have {
          height: 0.967rem;
          font-size: 0.933rem;
          color: #818181;
        }
      }
    }
    /* 外卖评价 Start */

    /* 购物栏 Start */
    .shopping-nav {
      position: absolute;
      width: 100%;
      left: 0;
      /*bottom: 0;*/
      height: 4rem;
      background-color: #5c5b5a;
      z-index: 99;
      transition: all .5s ease;
      .icon-car {
        position: absolute;
        left: 1.5rem;
        top: -1.2rem;
        width: 3.8rem;
        height: 3.8rem;
        box-sizing: border-box;
        border: .3rem solid #464544;
        background-color: #353535;
        border-radius: 50%;
        i {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.6rem;
        }
      }
      .price-box {
        margin-left: 5.8rem;
        p {
          text-align: left;
          &:first-child {
            margin-top: .533rem;
            font-size: 1rem;
            line-height: 1.3rem;
            color: #ffffff;
            opacity: 0.3;
          }
          &:last-child {
            line-height: 1.3rem;
            font-size: .667rem;
            color: #ffffff;
            opacity: 0.3;
          }
        }
      }
      button {
        position: absolute;
        font-size: 1rem;
        right: 0;
        top: 0;
        width: 6.667rem;
        height: 100%;
        text-align: center;
        background-color: #535257;
        color: #fff;
        border-radius: 0;
      }
      &.active {
        .icon-car {
          background-color: #f56c20;
          i {
            color: #fff;
          }
          /*&:after {*/
          /*content: '1';*/
          /*position: absolute;*/
          /*right: -.6rem;*/
          /*top: -.6rem;*/
          /*width: 2rem;*/
          /*height: 2rem;*/
          /*line-height: 2rem;*/
          /*font-size: 1.2rem;*/
          /*text-align: center;*/
          /*color: #fff;*/
          /*background-color: #f0300a;*/
          /*border-radius: 50%;*/
          /*transform: scale(.6);*/
          /*}*/
          .ball {
            position: absolute;
            right: -.6rem;
            top: -.6rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            font-size: 1.2rem;
            text-align: center;
            color: #fff;
            background-color: #f0300a;
            border-radius: 50%;
            transform: scale(.6);
          }
        }
        .price-box {
          p {
            &:first-child {
              opacity: 1;
            }
          }
        }
        button {
          background-color: #ffcb57;
          color: #472d22;
          font-weight: 600;
        }
      }
    }
    /* 购物栏 End */
  }

  @keyframes ballAnimation {
    0% {

    }
    30% {

    }
  }
</style>
