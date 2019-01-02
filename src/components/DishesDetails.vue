<template>
  <div class="dishesdetails-container">
    <!-- 头部 Start -->
    <header>
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"><span>返回</span></a>
    </header>
    <!-- 头部 End -->

    <!-- 商品信息 Start -->
    <div class="dishes-content">
      <img :src="goodInfo.image" alt="">
      <p class="title">{{ goodInfo.goodsname }}</p>
      <div class="order">
        <span>月售 {{ goodInfo.sold_num }} 份 </span>
        <span> 商品评分 {{ goodInfo.stars }}</span>
      </div>
      <div class="price-box">
        <p class="price"><span>￥</span>{{ goodInfo.price }}</p>
        <button @click="addShopCar"><i class="iconfont icon-jia"></i>加入购物车<span class="ball" ref="ball"></span></button>
      </div>
    </div>
    <!-- 商品信息 End -->

    <div class="comment-container">
      <!--<div class="no_available">-->
      <!--<h2 class="title">外卖评价</h2>-->
      <!--<div class="content">-->
      <!--<h4 class="not_have">暂无</h4>-->
      <!--</div>-->
      <!--</div>-->

      <div class="comment-item" v-for="item in commentList">
        <div class="avatar">
          <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3841743209,952064471&fm=27&gp=0.jpg"
               alt="">
        </div>
        <div class="detail">
          <p class="username">{{ item.username }}</p>
          <div class="grade-box">
            <div class="score">评分</div>
            <div class="bgImg">
              <img v-for="item in star" v-if="item == 1" src="static/images/star@2x.png" alt="星星图片"/>
              <img v-for="item in star" v-if="item == 0" src="static/images/star02@2x.png" alt="星星图片"/>
            </div>
          </div>
          <p class="content">还可以，没有那么油腻，味道也刚刚好，值得购买。</p>
          <div class="img-box">
            <div class="img-item">
              <img src="http://192.168.43.136/Project/Application/Admin/Public/Upload/2018-12-18/5c18dfa881206.jpg"
                   alt="">
            </div>
            <div class="img-item">
              <img src="http://192.168.43.136/Project/Application/Admin/Public/Upload/2018-12-18/5c18dfa881206.jpg"
                   alt="">
            </div>
          </div>
        </div>
        <p class="time">2017.07.06</p>
      </div>
    </div>

    <div :class="['shopping-nav', {active: shopCarCount >= 1}]">
      <router-link to="/shoppingcar" tag="p" class="icon-car" ref="shop_car">
        <i class="iconfont icon-gouwuche"></i>
        <span class="ball" ref="nowBallNum" :class="{'hide': shopCarCount == 0}">{{ shopCarCount }}</span>
      </router-link>
      <div class="price-box">
        <p>{{ shopCarTotalPrice | currency('¥', 2) }}</p>
        <p v-show="shopCarCount >= 1">免配送费</p>
      </div>
      <!--<button>￥0起送</button>-->
      <router-link to="/submitorder" tag="button">去结算</router-link>
    </div>
  </div>
</template>

<script>
    let starOffImg = 'static/images/star02@2x.png';
    let starOnImg = 'static/images/star@2x.png';
    export default {
        data() {
            return {
                goods_id: this.$route.params.id,
                // 商品数据
                goodInfo: {
                    goodsname: '',
                    stars: '',
                    image: '',
                    price: 0,
                    sold_num: 0
                },
                star: [1, 1, 1, 0, 0],
                user_id: window.CookieUtil.get('id'),
                commentList: []
            }
        },
        created() {
            this.getGoodInfo();
            this.$store.dispatch('updateShopCarInfo');
            // this.getCommentList();
        },
        mounted() {
            // this.settingShoppingNav();
        },
        methods: {
            // 获取商品信息
            getGoodInfo() {
                this.$fetch(this.api.getGoodInfo, {id: this.goods_id}).then(res => {
                    this.goodInfo.goodsname = res.goodsname;
                    this.goodInfo.stars = res.stars;
                    this.goodInfo.image = res.image;
                    this.goodInfo.price = res.price;
                    this.goodInfo.sold_num = res.sold_num;
                })
            },
            // 添加商品到购物车
            addShopCar() {
                this.$post(this.api.addGoods, {user_id: this.user_id, goods_id: this.goods_id}).then(res => {
                    this.$store.dispatch('updateShopCarInfo');
                })
            },

            settingShoppingNav() {
                let shopping_nav = this.$refs.shopping_nav;
                shopping_nav.style.top = document.body.clientHeight - shopping_nav.offsetHeight + 'px';
            },
            //获取评论信息
            getCommentList() {
                this.$fetch(this.api.getCommentList, {goods_id: this.goods_id}).then(res => {
                    this.commentList = res;
                })
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
    .comment-container {
      margin-top: 2rem;
      /* 暂无评论 */
      .no_available {
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

      /* 评论 */
      .comment-item {
        position: relative;
        margin-left: 1rem;
        margin-right: .633rem;
        margin-bottom: .5rem;
        padding-left: 3rem;
        .avatar {
          position: absolute;
          top: 0;
          left: 0;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .detail {
          .username {
            font-size: 0.9rem;
            line-height: 2rem;
            color: #060606;
          }
          .grade-box {
            display: flex;
            font-size: 0.7rem;
            line-height: 1.3rem;
            color: #858483;
            .score{
              padding-top: 2px;
              color: #333333;
              height: 1.03125rem;
              line-height: 1.03125rem;
              font-size: .875rem;
            }
            .bgImg {
              flex: 1;
              display: flex;
              margin-left: 5px;
              img {
                margin-left: 5px;
                width: 1.09375rem;
                height: 1.03125rem;
              }
            }
          }
          .content {
            margin-top: .5rem;
            font-size: 0.7rem;
            line-height: 1.3rem;
            color: #0d0c0c;
          }
        }
        .img-box {
          display: flex;
          flex-wrap: wrap;
          margin: .5rem 0;
          .img-item {
            width: 32%;
            padding-right: .5rem;
            padding-bottom: .5rem;
            img {
            width: 100%;
            height: 100%;
            }
          }
        }
        .time {
          position: absolute;
          right: 0;
          top: .5rem;
          font-size: .7rem;
          color: #777;
        }
      }
    }
    /* 外卖评价 Start */

    /* 购物栏 Start */
    .shopping-nav {
      position: fixed;
      /*position: absolute;*/
      width: 100%;
      left: 0;
      bottom: 0;
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
        span.hide {
          opacity: 0;
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
