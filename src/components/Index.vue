<template>
  <div class="index_container">
    <!-- 头部 Start -->
    <header>
      <div class="weather-box">
        <p class="current_city">东莞</p>
        <p class="content">
          <span class="temperature">小雨</span>
          <span class="weather">20°</span>
        </p>
      </div>

      <div class="search-box">
        <i class="iconfont icon-fangdajing"></i>
        <input class="search" placeholder="请输入菜品"/>
      </div>

      <div class="message">
        <router-link to="/login" v-if="!loginFlag">登录</router-link>
        <a @click="logout" v-if="loginFlag">登出</a>
      </div>
    </header>
    <!-- 头部 End -->

    <!--广告 Start-->
    <div class="banner_box">
      <img v-lazy="bannerImgVal" alt="">
    </div>
    <!--广告 End-->

    <!-- 今日推荐 Start -->
    <div class="food_recommend">
      <h2>今日推荐</h2>
      <ul class="recommend-slide clearfix" ref="food_recommend_ul">
        <router-link tag="li" :to="'/dishesdetails/' + item.id" v-for="item in foodRecommendList" ref="food_recommend_li" :key="item.key">
          <img v-lazy="item.sml_image" alt="">
          <div class="title" v-text="item.goodsname"></div>
          <div class="price">{{item.price | currency('¥', 2)}}</div>
        </router-link>
      </ul>
    </div>
    <!-- 今日推荐 End -->

    <!--养生推荐 Start -->
    <div class="health_recommend">
      <div class="header clearfix">
        <h2>养生推荐</h2>
        <div class="more">更多 &nbsp;&nbsp;></div>
      </div>
      <div class="content">
        <div class="item" v-for="item in healthRecommendList">
          <img v-lazy="item.src" alt="">
          <div class="title" v-text="item.title"></div>
        </div>
      </div>
    </div>
    <!--养生推荐 End -->

    <!--菜品列表 Start -->
    <div class="foodlist-container">
      <div class="select-container clearfix">
        <div class="select-title" @click="selectFlag=true">
          <span>{{ selectCanteenVal }}</span>
          <i class="iconfont icon-shixiangxiajiantou-"></i>
        </div>
        <span>销量</span>
      </div>
      <div class="foodlist">
        <router-link tag="div" :to="'/dishesdetails/' + item.id" class="item" v-for="item in foodList" :key="item.id">
          <img v-lazy="item.sml_image">
          <div class="content">
            <div class="title" v-text="item.title"></div>
            <p>[{{ item.canteenType }}] {{ item.type }}</p>
            <div class="price"><span>{{ item.price | currency('¥', 2) }}</span></div>
          </div>
          <div class="order">
            <span>已售{{item.sold_num}} &nbsp;&nbsp; <i class="iconfont icon-youjiantou"></i></span>
          </div>
        </router-link>
      </div>
    </div>
    <!--菜品列表 End -->

    <!-- 选择饭堂选择器 Start -->
    <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" v-show="selectFlag"></mt-picker>
    <div class="mask" v-show="selectFlag" @click="selectFlag=false"></div>
  </div>
  <!-- 选择饭堂选择器 End -->
</template>

<script>
    import axios from 'axios'
    import {canteenType} from '../assets/script/mock'
    import {mapState} from 'vuex';
    import CookieUtil from "../util/cookies";


    export default {
        data() {
            return {
                // 饭堂选择数据
                slots: [
                    {
                        flex: 1,
                        values: Object.keys(canteenType),
                        className: 'slot1',
                        textAlign: 'right',
                        defaultIndex: 0
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    },
                    {
                        flex: 1,
                        values: ["全部"],
                        className: 'slot3',
                        textAlign: 'left'
                    }
                ],
                // 当前选中饭堂
                nowCanteenType: Object.keys(canteenType)[0], // 当前饭堂
                selectFlag: false, // 控制选择饭堂选择器显示隐藏
                selectCanteenVal: '全部', // 选择饭堂值
                bannerImgVal: "", // banner 图片链接
                foodRecommendList: [],// 今日推荐数据
                // 养生推荐数据
                healthRecommendList: [
                    {src: "", title: "冬季养生之选材"},
                    {src: "", title: "秋天吃什么补气血"}
                ],
                foodList: [], // 菜品数据
                loginFlag: false, // 是否已登录
                // foodRecommendList: [ //今日推荐数据测试数据
                //     {
                //         sml_image: "http://img5.imgtn.bdimg.com/it/u=2516636342,875614527&fm=11&gp=0.jpg",
                //         goodsname: "肉沫茄子煲",
                //         price: 12
                //     },
                //     {
                //         sml_image: "http://img5.imgtn.bdimg.com/it/u=2516636342,875614527&fm=11&gp=0.jpg",
                //         goodsname: "肉沫茄子煲",
                //         price: 12
                //     },
                //     {
                //         sml_image: "http://img5.imgtn.bdimg.com/it/u=2516636342,875614527&fm=11&gp=0.jpg",
                //         goodsname: "肉沫茄子煲",
                //         price: 12
                //     },
                //     {
                //         sml_image: "http://img5.imgtn.bdimg.com/it/u=2516636342,875614527&fm=11&gp=0.jpg",
                //         goodsname: "肉沫茄子煲",
                //         price: 12
                //     },
                //     {
                //         sml_image: "http://img5.imgtn.bdimg.com/it/u=2516636342,875614527&fm=11&gp=0.jpg",
                //         goodsname: "肉沫茄子煲",
                //         price: 12
                //     },
                //     {
                //         sml_image: "http://img5.imgtn.bdimg.com/it/u=2516636342,875614527&fm=11&gp=0.jpg",
                //         goodsname: "肉沫茄子煲",
                //         price: 12
                //     }
                // ],
                // 测试数据
                // foodList: [
                //     {
                //         sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
                //         title: "烧鸭饭",
                //         canteenType: "一饭二楼",
                //         type: "一饭二楼",
                //         price: "10",
                //         sold_num: 28
                //     },
                //     {
                //         sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
                //         title: "烧鸭饭",
                //         canteenType: "一饭二楼",
                //         type: "一饭二楼",
                //         price: "10",
                //         sold_num: 28
                //     },
                //     {
                //         sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
                //         title: "烧鸭饭",
                //         canteenType: "一饭二楼",
                //         type: "一饭二楼",
                //         price: "10",
                //         sold_num: 28
                //     },
                //     {
                //         sml_image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg",
                //         title: "烧鸭饭",
                //         canteenType: "一饭二楼",
                //         type: "一饭二楼",
                //         price: "10",
                //         sold_num: 28
                //     }
                // ]
            };
        },
        created() {
            this.getHealthRecommendList();
            this.getFoodRecommendList();
            this.getGoodsList();
            this.cookieCheck();
            this.getBannerPic();
        },
        methods: {
            cookieCheck() {
                if (CookieUtil.get('id')) {
                    return this.loginFlag = true;
                }
                this.loginFlag = false;
            },
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
            // 选择饭堂修改事件
            onValuesChange(picker, values) {
                this.nowCanteenType = values[0];
                picker.setSlotValues(1, canteenType[this.nowCanteenType]);
                switch (values[0]) {
                    case '全部':
                        this.selectCanteenVal = '全部';
                        break;
                    default:
                        this.selectCanteenVal = values[0].substring(1, 3) + values[1];
                        break;
                }
                setTimeout(() => {
                    this.getGoodsList();
                }, 20)
            },
            // 轮播图
            slide() {
                try {
                    let foodRecommendUl = this.$refs['food_recommend_ul'];
                    // let foodRecommendLi = foodRecommendUl.children;
                    // 设置 UL 的宽度
                    // foodRecommendUl.style.width = foodRecommendLi.length * foodRecommendLi[0].offsetWidth + 10 + 'px';
                    foodRecommendUl.style.width = 6 * 8.24 + 'rem';
                    // Ul 最大 margin 值
                    let maxMl = 0;
                    // Ul 最小 margin 值
                    // let minMl = document.body.offsetWidth - foodRecommendUl.offsetWidth;
                    let minMl = document.body.offsetWidth - 6 * 8.24 * document.documentElement.style.fontSize.split('px')[0] - 10;
                    foodRecommendUl.addEventListener("touchstart", function (e) {
                        let startx = e.targetTouches[0].clientX;
                        let offsetL = foodRecommendUl.offsetLeft;
                        foodRecommendUl.addEventListener("touchmove", function (e) {
                            let movex = e.targetTouches[0].clientX - startx + offsetL;
                            foodRecommendUl.style.marginLeft = `${movex}px`;
                        })

                        foodRecommendUl.addEventListener("touchend", function (e) {
                            if (foodRecommendUl.offsetLeft > maxMl) {
                                foodRecommendUl.transition = 'all .5s ease';
                                foodRecommendUl.style.marginLeft = `${maxMl}px`;
                            }
                            else if (foodRecommendUl.offsetLeft < minMl) {
                                foodRecommendUl.transition = 'all .5s ease';
                                foodRecommendUl.style.marginLeft = `${minMl}px`;
                            }
                        })
                    }, false);
                } catch(e) {

                }
            },

            // 获取菜品列表
            getGoodsList() {
                if (this.selectCanteenVal == '全部') {
                    this.$fetch(this.api.goodsList).then(res => {
                        this.foodList = res;
                    })
                } else {
                    this.$fetch(this.api.goodsList, {canteentype: this.selectCanteenVal}).then(res => {
                        this.foodList = res;
                    })
                }
            },
            // 获取今日推荐数据
            getFoodRecommendList() {
                this.$fetch(this.api.foodRecommendList).then(res => {
                    this.foodRecommendList = res;
                    this.slide();
                })
            },
            // 获取养生推荐数据
            getHealthRecommendList() {
                this.$fetch(this.api.getHealthRecommendList).then(res => {
                    this.healthRecommendList[0].src = res[0];
                    this.healthRecommendList[1].src = res[1];
                })
            },
            // 广告
            getBannerPic() {
                this.$fetch(this.api.ShowBanner).then(res => {
                    this.bannerImgVal = res[0];
                })
            }
        }
    };
</script>

<style scoped lang="less">
  .index_container {
    background: #fff url(../assets/images/index_bg.jpg) repeat-x;
    background-size: 100% 600px;
    color: #333333;
  }

  /*头部 Start*/
  header {
    display: flex;
    height: 3.52rem;
    font-size: 16px;
    padding: 0.6rem 0;
    box-sizing: border-box;
    color: #333;

    .weather-box {
      width: 4.56rem;
      text-align: center;
      height: 100%;
      .current_city {
        font-size: 1.04rem;
        line-height: 1.52rem;
        font-weight: 600;
        color: #333;
      }
      .content {
        font-size: 0.72rem;
        line-height: 1rem;
        color: #333;
      }
    }

    .search-box {
      position: relative;
      flex: 1;
      height: 100%;
      i {
        position: absolute;
        left: 5px;
        top: 0;
        font-size: 1.6rem;
        color: #666;
        line-height: 2.5rem;
      }
      .search {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 0.4rem;
        padding: 0 10px 0 28px;
        font-size: 1.04rem;
        box-sizing: border-box;
      }
    }

    .message {
      width: 3.72rem;
      text-align: center;
      line-height: 2.48rem;
      a {
        font-size: 1.2rem;
        color: #000;
      }
    }
  }

  /*头部 End*/

  /*广告 Start*/
  .banner_box {
    padding: 0 .8rem;
    margin-top: .1rem;

    img {
      width: 100%;
      height: 9.28rem;
      border-radius: 0.4rem;
    }

  }

  /*广告 End*/

  /*今日推荐 Start*/
  .food_recommend {
    padding: 0 .4rem;

    h2 {
      margin-top: .52rem;
      margin-left: .4rem;
      line-height: 2.6rem;
      font-size: 1.36rem;
      font-weight: 500;
    }

    .recommend-slide {
      overflow: scroll;
      margin-right: .8rem;
      li {
        float: left;
        width: 8.24rem;
        padding: 0 .4rem;
        img {
          width: 7.44rem;
          height: 5.6rem;
          border-radius: 0.32rem;
        }
        .title {
          line-height: 1.48rem;
          font-size: 0.88rem;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          height: 1.08rem;
          color: #f56c20;
          font-size: 1.04rem;
        }
      }
    }

  }

  /*今日推荐 End*/

  /*养生推荐 Start*/
  .health_recommend {
    padding: 0 .8rem;
    .header {
      margin-top: .36rem;
      line-height: 2.6rem;
      h2 {
        float: left;
        font-size: 1.36rem;
        font-weight: 500;
      }
      .more {
        float: right;
        font-size: 0.96rem;
        color: #afafae;;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      .item {
        position: relative;
        flex: 1;
        height: 6rem;
        border-radius: 0.32rem;
        overflow: hidden;
        &:first-child {
          margin-right: .8rem;
        }
        &:last-child {
          margin-last: .8rem;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .title {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1.4rem;
          padding-left: .8rem;
          line-height: 1.4rem;
          font-size: 0.733rem;
          color: #fff;
          background-color: rgba(0, 0, 0, .3);
        }
      }
    }
  }

  /*养生推荐 End*/

  /*菜品列表 Start*/
  .foodlist-container {
    padding: 1.52rem .8rem 1rem 1.56rem;
    .select-container {
      line-height: 1.4rem;
      .select-title {
        float: left;
        margin-right: 1.36rem;
        font-size: 0.96rem;
        color: #545454;
        i {
          font-size: 0.3rem;
        }

        &.active {
          color: #333;
          font-weight: 600;
        }
      }
      & > span {
        font-size: .8rem;
      }

    }
    .item {
      padding: .8rem 0;
      display: flex;
      img {
        width: 5.6rem;
        height: 5.6rem;
        border-radius: 0.32rem;
      }
      .content {
        flex: 1;
        margin-left: .8rem;
        .title {
          font-size: 1.2rem;
          font-weight: 600;
        }
        p {
          margin-top: .6rem;
          font-size: 0.8rem;
          color: #545454;
        }
        .price {
          color: #f56c20;
          margin-top: .6rem;
          .flag {
            font-size: .8rem;
          }
          span {
            font-size: 1rem;
          }
        }
      }
      .order {
        line-height: 5.6rem;
        & > span {
          font-size: .8rem;
        }
        i {
          font-size: 1rem;
        }
      }
    }
  }

  /*菜品列表 End*/

  /* 选择饭堂选择器 Start */
  .picker {
    padding: 20px 0;
    width: 100%;
    position: fixed;
    z-index: 99999;
    background-color: #eee;
    bottom: 0;
    left: 0;
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99998;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
  }

  /* 选择饭堂选择器 End */
</style>
