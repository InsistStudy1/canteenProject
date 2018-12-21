<template>
  <div class="shopping_car_container">
    <header class="sz_header">购物车( {{ shopCarCount }} )
      <span class="right_icon" @click="deleteFlag=true" v-show="!deleteFlag">管理</span>
      <span class="right_icon" @click="deleteFlag=false" v-show="deleteFlag">取消</span>
    </header>

    <!-- 购物车列表 Start -->
    <div class="shopcar_list_container">

      <div class="type" v-for="canteenItem in shopCarList">
        <div class="type_title">
          <div class="mui-input-row mui-checkbox mui-left">
            <label>{{ canteenItem.canteenType }}</label>
            <input :name="canteenItem.canteenType + 'P'" :value="canteenItem.canteenType" type="checkbox"
                   @click="typeSelect(canteenItem.canteenType, $event)" ref="canteenTypeCheck"
                   v-model="canteenItem.is_checked">
          </div>
        </div>

        <div class="type_item" v-for="foodItem in canteenItem.data" :key="foodItem.id">
          <div class="mui-checkbox">
            <input :name="canteenItem.canteenType" :value="foodItem.food_name" type="checkbox"
                   v-model="foodItem.is_checked == 1" @click="foodSelect(canteenItem.canteenType, $event, foodItem.id)"
                   ref="goodsCheckList">

          </div>
          <img v-lazy="foodItem.image" alt="foodItem.food_name">
          <div class="details">
            <div class="title">{{ foodItem.goods_name }}</div>
            <div class="price-box">
              <p class="price">{{ foodItem.price | currency('¥', 2) }}</p>
              <div class="number-box" @click="editNum($event, foodItem.id)">
                <button class="reduce">-</button>
                <input type="number" :value="foodItem.goods_num">
                <button class="add">+</button>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
    <!-- 购物车列表 End -->
    <!-- 全选 结算 Start -->
    <div class="settle_accounts ">
      <div class="mui-checkbox">
        <input name="checkbox1" value="全选" type="checkbox" v-model="checkAllFlag" @click="selectCheckAll">
      </div>
      <div class="content">
        <span>全选</span>
        <span v-show="!deleteFlag"> （ 不含运费 ）{{ totalPrice | currency('¥', 2) }}</span>
      </div>
      <button :class="{active: checkedCount >= 1}" v-show="!deleteFlag" @click="buyShop">选好了</button>
      <button :class="{active: checkedCount >= 1}" v-show="deleteFlag" @click="removeGoodsList">删除</button>
    </div>
    <!--全选 结算 End -->
  </div>
</template>

<script>
    export default {
        data() {
            return {
                // 购物车数量
                shopCarList: [],
                // shopCarList: [
                //     {
                //         canteenType: '一饭二楼',
                //         data: [
                //             {
                //                 img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg',
                //                 food_name: '茄瓜煲仔菜',
                //                 food_price: '8.5',
                //                 food_number: 1,
                //                 checked: true
                //             },
                //             {
                //                 img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg',
                //                 food_name: '茄瓜煲仔菜',
                //                 food_price: '8.5',
                //                 food_number: 1,
                //                 checked: false
                //             }
                //         ]
                //     },
                //     {
                //         canteenType: '一饭一楼',
                //         data: [
                //             {
                //                 img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg',
                //                 food_name: '茄瓜煲仔菜',
                //                 food_price: '8.5',
                //                 food_number: 1,
                //                 checked: false
                //             },
                //             {
                //                 img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2710064199,2180614330&fm=27&gp=0.jpg',
                //                 food_name: '茄瓜煲仔菜',
                //                 food_price: '8.5',
                //                 food_number: 1,
                //                 checked: false
                //             }
                //         ]
                //     }
                // ],
                deleteFlag: false,
                user_id: window.CookieUtil.get('id')
            }
        },
        created() {
            this.getShopCartList();
        },
        methods: {
            // 修改数字
            editNum($event, id) {
                if ($event.target.nodeName == 'BUTTON') {
                    let name = $event.target.className;
                    let input = $event.currentTarget.children[1];
                    if (name == 'add') {
                        window.$fetch(window.api.updateShopCar, {user_id: this.user_id, id: id, flag: 1}).then(res => {
                            input.value++;
                            this.getShopCartList();
                        })
                    } else if (name == 'reduce') {
                        if (input.value == 1) {
                            mui.toast('不能再少啦！', {duration: 700, type: 'p'})
                            return;
                        }
                        window.$fetch(window.api.updateShopCar, {user_id: this.user_id, id: id, flag: -1}).then(res => {
                            input.value--;
                            this.getShopCartList();
                        })
                    }


                }
            },
            // 选中饭堂种类
            typeSelect(type, $event) {
                // let goodsCheckList = this.$refs.goodsCheckList;
                let isChecked = $event.currentTarget.checked;
                this.$post(this.api.CheckCanteenAllgoods, {user_id: this.user_id,  canteenType: type, flag: (isChecked ? 1 : -1)}).then(res => {
                    this.getShopCartList();
                })

                // goodsCheckList.forEach((item) => {
                //     if (item.name == type) {
                //         item.checked = isChecked;
                //     }
                // })
            },
            // 选中商品复选框
            foodSelect(type, $event, id) {
                this.$fetch(this.api.setGoodsChecked, {user_id: this.user_id, id: id}).then(res => {
                    this.getShopCartList();
                })
                // let goodsCheckList = this.$refs.goodsCheckList;
                // let isChecked = $event.currentTarget.checked;
                // let canteenTypeCheck = this.$refs.canteenTypeCheck;
                // let flag = true;
                //
                // if (isChecked == false) {
                //     canteenTypeCheck.forEach(item => {
                //         if (item.name == type + 'P') {
                //             item.checked = isChecked;
                //         }
                //     })
                // }
                //
                // // 遍历 checkbox，判断如果是同一类型的数据的所有复选框都打钩了
                // goodsCheckList.forEach(item => {
                //     if (item.name == type) {
                //         if (isChecked !== item.checked) {
                //             flag = false
                //         }
                //     }
                // })
                // if (flag) {
                //     // typeCheck.checked = isChecked;
                //     canteenTypeCheck.forEach(item => {
                //         if (item.name == type + 'P') {
                //             item.checked = isChecked;
                //         }
                //     })
                // }

            },
            // 点击选好了购买商品
            buyShop() {
                this.$router.push('/submitorder');
            },
            // 全选/取消全选 商品
            selectCheckAll() {
                this.$fetch(this.api.SelChangeAll, {
                    user_id: this.user_id,
                    flag: this.checkAllFlag ? 0 : 1
                }).then(res => {
                    this.getShopCartList();
                })
            },
            // 获取购物车数据
            getShopCartList() {
                // 更新购物车详细信息
                this.$fetch(this.api.getShopCarDetailInfo, {user_id: window.CookieUtil.get('id')}).then(res => {
                    // 把数据更新到 shopCarList
                    this.shopCarList = res;
                    // 初始化 复选框
                    this.initCheckBox();
                })
                // 更新购物车信息
                this.$store.dispatch('updateShopCarInfo');
            },
            // 初始化复选框
            initCheckBox() {
                this.shopCarList.forEach((item, index) => {
                    let count = 0;
                    item.data.forEach(item => {
                        if (item.is_checked == 1) {
                            count++;
                        }
                    })
                    if (count == item.data.length) {
                        this.shopCarList[index].is_checked = true;
                    }
                })
            },
            // 删除商品
            removeGoodsList() {
                mui.confirm('你确定删除商品吗？', '提示', data => {
                    if (data.index == 0) return;
                    this.$fetch(this.api.removeCarInfos, {user_id: window.CookieUtil.get('id')}).then(res => {
                        this.getShopCartList();
                    })
                })

            }
        },
        computed: {
            // 选中总数量
            checkedCount() {
                return this.$store.state.shopCarCount;
            },
            // 全选 Flag
            checkAllFlag() {
                if ((this.checkedCount == this.shopCarCount) && this.checkedCount != 0) return true;
                return false;
            },
            // 购物车数量
            shopCarCount() {
                return this.$store.state.shopCarAllCount;
            },
            // 总价格
            totalPrice() {
                return this.$store.state.shopCarTotalPrice;
            }
        }
    }
</script>

<style scoped lang="less">
  .type_title input[type=checkbox] {
    left: .85rem;
  }

  .shopping_car_container {
    /*购物车列表 Start*/
    .shopcar_list_container {
      margin-bottom: 3.5rem;
      .type_title {
        height: 2.733rem;
        line-height: 2.733rem;
      }
      .type_item {
        display: flex;
        height: 6.667rem;
        background-color: #ffffff;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        box-sizing: border-box;
        padding: .867rem 0;
        .mui-checkbox {
          width: 3.2rem;
          text-align: center;
        }
        img {
          width: 5rem;
          height: 5rem;
        }
        .details {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 0 1rem;
          .title {
            height: 1.1rem;
            line-height: 1.1rem;
            font-size: 0.933rem;
          }
          .price-box {
            flex: 1;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .price {
              font-size: 1.2rem;
              color: #282828;
            }
            .number-box {
              display: flex;
              height: 2rem;
              width: 6.933rem;
              border: 1px solid #e5e5e5;
              input {
                flex: 1;
                height: 100%;
                border-radius: 0;
                border-top: none;
                border-bottom: none;
                padding: 0;
                text-align: center;
              }
              button {
                width: 2rem;
                height: 100%;
                background-color: #fff;
                border-color: #e5e5e5;
              }
            }
          }
        }
      }
    }
    /*购物车列表 End*/

    /*全选 结算 Start*/
    .settle_accounts {
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 4rem;
      height: 3.333rem;
      background-color: #ffffff;
      border-top: 1px solid #F7F7F7;
      z-index: 999999;
      display: flex;
      .content {
        flex: 1;
        margin-left: 3rem;
        line-height: 3.333rem;
        height: 3.333rem;
        font-size: 1rem;
        color: #282828;
        -webkit-transition: all .6s ease;
        transition: all .6s ease;
        .price {
          color: #000;
          margin-left: 1rem;
          font-size: 1.2rem;
        }
      }
      button {
        width: 6.667rem;
        background-color: #8f8a82;
        color: #ffffff;
        text-align: center;
        line-height: 3.333rem;
        height: 3.333rem;
        border-radius: 0;
        &.active {
          background-color: #ffcb57;
          color: #472d22;
          font-weight: 600;
        }
      }
    }
    /*全选 结算 End*/
  }
</style>
