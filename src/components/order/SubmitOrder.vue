<template>
  <div class="submit_order_container">
    <!-- 头部 Start -->
    <header class="sz_header">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left black"></a>
      <h2 class="black">提交订单</h2>
    </header>
    <!-- 头部 End -->

    <div class="container">
      <!-- 配送信息 Start -->
      <div class="user_info">
        <p class="header">商家配送</p>
        <router-link tag="div" to="/harvestaddress" class="info_details">
          <p class="address">{{ defaultAddressInfo.address }} {{ defaultAddressInfo.housenumber }}</p>
          <p class="info">{{ defaultAddressInfo.realname }}（{{ defaultAddressInfo.gender == "男" ? "先生" : "小姐" }}） {{
            defaultAddressInfo.tel }}</p>
          <i class="iconfont icon-youjiantou"></i>
        </router-link>
        <div class="order_info">
          <p class="left">立即送出</p>
          <p class="right">大约 {{ arrivalTime }} 送达</p>
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <!-- 配送信息 End -->

      <!-- 商品信息 Start -->
      <div class="goods_info" v-for="canteenItem in shopCarList">

        <div class="canteen_item">
          <div class="canteen_name">{{ canteenItem.canteenType }}</div>
          <div class="food_list">
            <div class="good_item" v-for="goodItem in canteenItem.data">
              <img v-lazy="goodItem.image" alt="foodItem.food_name">
              <div class="good_details">
                <p class="good_name">{{ goodItem.goods_name }}</p>
                <p class="good_number">× {{ goodItem.goods_num }}</p>
              </div>
              <div class="price">{{ goodItem.price | currency('¥', 0) }}</div>
            </div>
          </div>
          <div class="order_price">
            <div class="left">配送费</div>
            <div class="right">￥ 0</div>
          </div>
        </div>

      </div>
      <!-- 商品信息 End -->

    </div>

    <div class="footer">
      <p class="price">合计：<span class="price_number"> {{ totalPrice | currency('¥', 2) }}</span></p>
      <button @click="postOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                user_id: window.CookieUtil.get('id'),
                shopCarList: [],
                defaultAddressInfo: [],
                arrivalTime: ""
            }
        },
        created() {
            this.getShopCartList();
            this.getDefault();
        },
        methods: {
            // 获取购物车数据
            getShopCartList() {
                // 更新购物车详细信息
                this.$fetch(this.api.showChecked, {user_id: this.user_id}).then(res => {
                    // 把数据更新到 shopCarList
                    this.shopCarList = res;
                })
                // 更新购物车信息
                this.$store.dispatch('updateShopCarInfo');
            },
            getDefault() {
                this.$fetch(this.api.getDefaultAddress, {user_id: this.user_id}).then(res => {
                    // 没有默认地址
                    if (!res) {
                        return mui.alert('您还未设置默认地址，即将跳转设置', '提示', () => {
                            this.$router.push('/harvestaddress')
                        })
                    }
                    this.defaultAddressInfo = res.defaultaddressinfo[0];
                    let curTime = new Date();
                    let arrivalTime = new Date(curTime.setMinutes(curTime.getMinutes() + 30));
                    this.arrivalTime = `${arrivalTime.getHours()} : ${arrivalTime.getMinutes()}`;
                })
            },
            // 提交订单
            postOrder() {
                this.$fetch(this.api.makeOrders, {user_id: this.user_id}).then(res => {
                    mui.toast('提交订单成功', {duration: 1000, type:'div' })
                    this.$router.push('/order')
                })
            }
        },
        computed: {
            // 选中总数量
            checkedCount() {
                return this.$store.state.shopCarCount;
            },
            // 购物车数量
            shopCarCount() {
                return this.$store.state.shopCarCount;
            },
            // 总价格
            totalPrice() {
                return this.$store.state.shopCarTotalPrice;
            }
        }
    }
</script>

<style scoped lang="less">
  .submit_order_container {
    background: #fff url(../../assets/images/index_bg.jpg) repeat-x;
    background-size: 100% 75%;

    header {
      background-color: transparent !important;
    }

    .container {
      margin-top: .2rem;
      padding: 0 1rem;
      /* 配送信息 Start */
      .user_info {
        background-color: #ffffff;
        padding: 0 1rem;
        box-shadow: 0.033rem 0.057rem 0.267rem 0 rgba(0, 0, 0, 0.1);
        border-radius: 0.2rem;
        margin-bottom: .5rem;
        .header {
          padding-left: .1rem;
          height: 2.6rem;
          line-height: 2.6rem;
          color: #090909;
          border-bottom: 1px solid #eee;
          text-align: center;
        }
        .info_details {
          position: relative;
          height: 4.3rem;
          box-sizing: border-box;
          padding: .6rem 0;
          border-bottom: 1px solid #eee;
          .address {
            height: 1.6rem;
            line-height: 1.6rem;
            font-size: 1.067rem;
            padding-left: .1rem;
            font-weight: 600;
            color: #333;
          }
          .info {
            position: absolute;
            bottom: .5rem;
            left: .1rem;
            text-align: left;
            height: 1.24rem;
            line-height: 1.24rem;
            font-size: 1rem;
            color: #333;
            transform: scale(.8);
            transform-origin: left top;
          }
          i {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 4.3rem;
            font-size: .9rem;
          }
        }
        .order_info {
          position: relative;
          height: 3rem;
          line-height: 3rem;
          .left {
            float: left;
            left: .1rem;
            font-size: 0.933rem;
            color: #333;
          }
          .right {
            float: right;
            margin-right: 1.4rem;
            font-size: 0.933rem;
            color: #3586d7;
          }
          i {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 3rem;
            font-size: .9rem;
          }
        }
      }
      /* 配送信息 End */

      /*商品信息 Start*/
      .goods_info {
        padding-bottom: .6rem;
        .canteen_item {
          border-radius: 0.2rem;
          background-color: #fff;
          padding: 0 1rem;
          box-shadow: 0.033rem 0.057rem 0.267rem 0 rgba(0, 0, 0, 0.08);
          .canteen_name {
            height: 3rem;
            line-height: 3rem;
            color: #666;
            font-size: 0.8rem;
            padding-left: .3rem;
            border-bottom: 1px solid #eee;
          }
          .food_list {
            .good_item {
              position: relative;
              margin-top: 1rem;
              display: flex;
              img {
                width: 4.933rem;
                height: 3.9rem;
                margin-left: .133rem;
              }
              .good_details {
                margin-left: 1.33rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .good_name {
                  margin-top: .37rem;
                  color: #424344;
                  font-size: 0.8rem;
                  font-weight: 600;
                }
                .good_number {
                  font-size: 0.8rem;
                  color: #999;
                }
              }
              .price {
                position: absolute;
                width: 3rem;
                text-align: right;
                color: #333;
                font-weight: 600;
                right: 0;
                bottom: 0;
                font-size: 1rem;
              }
            }
          }
          .order_price {
            margin-top: 1rem;
            height: 3rem;
            line-height: 3rem;
            border-top: 1px solid #eee;
            .left {
              float: left;
              font-size: 0.867rem;
              color: #333;
            }
            .right {
              float: right;
              font-size: 1rem;
              color: #333;
              font-weight: 600;
            }
          }
        }
      }
      /*商品信息 End*/
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #525150;
      height: 3.3rem;
      line-height: 3.3rem;
      .price {
        margin-left: 1rem;
        font-size: 0.933rem;
        color: #fff;
        .price_number {
          font-size: 1.2rem;
        }
      }
      button {
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 0;
        width: 6.667rem;
        height: 100%;
        text-align: center;
        font-size: 1.067rem;
        color: #472d22;
        background-color: #ffcb57;
        font-weight: 600;
      }
    }
  }
</style>
