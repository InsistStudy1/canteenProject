<template>
  <div class="order-container">
    <header class="sz_header">订单</header>

    <!-- NarBar Start -->
    <!--<div class="nav-bar" ref="nav-bar" v-on:click="changBar($event)">-->
      <!--<div class="tab-item" data-id="noEvaluated">待评价</div>-->
      <!--<div class="tab-item" data-id="all_orders">全部订单</div>-->
      <!--<p class="line right" ref="line"></p>-->
    <!--</div>-->
    <!--NarBar End -->

    <!-- NarContainer Start -->

    <!--<div class="tab-container right" ref="tabContainer">-->
      <!--<div class="tab-container-item">-->
        <!--sadsad11-->
      <!--</div>-->

      <!-- 全部订单 Start -->
      <div class="tab-container-item">
        <div class="all_orders_list">
          <div class="item" v-for="item in orderList" :key="item.id">
            <img v-lazy="item.image" alt="">
            <div class="info">
              <h2>{{ item.name }} </h2>
              <p class="time">{{ item.create_time | timeFormat }}</p>
              <p class="foodname">{{ item.goods_name }}（{{ item.type_name }}）   {{ item.goods_num }} 件</p>
            </div>
            <div class="remark">
              <span class="status">待评价</span>
              <span class="price">{{ item.price * item.goods_num | currency('¥', 2) }}</span>
              <button v-show="item.commit_state == 0">评价</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 全部订单 End -->
    </div>
    <!--NarContainer End -->

    <!--{{date | timeFormat}}-->
  <!--</div>-->

</template>

<script>
    export default {
        data() {
            return {
                selected: 'noEvaluated', //默认选中选项卡
                orderList: [],
                date: new Date(),
                user_id: window.CookieUtil.get('id')
            }
        },
        created() {
            this.getOrderList();
            this.$store.dispatch('updateShopCarInfo');
        },
        mounted() {
            // let navBar = this.$refs['nav-bar'];
        },
        methods: {
            changBar(event) {
                let e = event || window.event;
                let target = e.target || e.srcElement;
                let line = this.$refs.line;
                let tabContainer = this.$refs.tabContainer;
                if (target.nodeName.toUpperCase() == 'DIV') {
                    let id = target.dataset.id;
                    switch (id) {
                        case 'noEvaluated':
                            line.classList.remove('right');
                            tabContainer.classList.remove('right');
                            break;
                        case 'all_orders':
                            line.classList.add('right');
                            tabContainer.classList.add('right');
                            break;
                    }
                }
            },
            // 获取订单列表
            getOrderList() {
                this.$fetch(this.api.getOrderList, {user_id: this.user_id}).then(res => {
                    this.orderList = res;
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .order-container {
    background-color: #F7F7F7;

    /*NarBar Start*/
    .nav-bar {
      position: relative;
      height: 3rem;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      .tab-item {
        flex: 1;
        font-size: 0.933rem;
        height: 100%;
        line-height: 3rem;
        text-align: center;
      }
      .line {
        position: absolute;
        bottom: 0;
        left: 25%;
        transform: translateX(-50%);
        width: 4.033rem;
        height: 0.067rem;
        background-color: #fec851;
        transition: all .5s ease;
        &.right {
          left: 75%;
        }
      }

      .mint-tab-item {
        font-size: 0.933rem;
        color: #000;
      }
      .mint-navbar {
        position: relative;

      }
    }

    /*NarContainer Start*/
    .tab-container {
      display: flex;
      width: 200%;
      -webkit-transition: all .5s ease;
      -moz-transition: all .5s ease;
      -ms-transition: all .5s ease;
      -o-transition: all .5s ease;
      transition: all .5s ease;
      &.right {
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
      }
      .tab-container-item {
        flex: 1;
      }
    }
    /*NarContainer End*/

    /* 全部订单 Start */
    .all_orders_list {
      padding: .667rem;
      .item {
        display: flex;
        height: 7.167rem;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.08);
        border-radius: 0.167rem;
        padding: .7rem .667rem .5rem;
        img {
          width: 3rem;
          height: 3rem;
          background-color: #fb0718;
          border-radius: 0.167rem;
        }
        .info {
          flex: 1;
          margin: 0 .667rem;
          h2 {
            height: 1.6rem;
            line-height: 1.6rem;
            font-size: 0.933rem;
            color: #030303;
          }
          .time {
            height: 1.5rem;
            line-height: 1.5rem;
            font-size: 0.667rem;
            color: #8c8c8c;
          }
          .foodname {
            line-height: 1.3rem;
            font-size: 0.8rem;
            color: #8c8c8c;
          }
        }
        .remark {
          text-align: right;
          display: flex;
          flex-direction: column;
          .status {
            flex: 1;
            font-size: 0.8rem;
            color: #ffcb57;
            padding-right: 2px;
          }
          .price {
            flex: 1;
            height: 0.6rem;
            font-size: 0.8rem;
            color: #010101;
            padding-right: 2px;
          }
          button {
            flex: 1;
            padding: 0 1rem;
            height: 1.4rem;
            line-height: 1.4rem;
            font-size: 0.8rem;
            text-align: center;
            color: #f56c20;
            background-color: #fff;
            border: 1px solid #f56c20;
            border-radius: 3px;
          }
        }
      }
    }
    /* 全部订单 End */
  }
</style>
