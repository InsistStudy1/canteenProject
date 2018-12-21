export default {
    // 设置购物车数量
    setShopCarCount(state, count) {
        state.shopCarCount = count;
    },
    // 修改购物车数量
    updateShopCarCount(state, count) {
        state.shopCarCount += count;
    },
    // 设置购物车价格
    setShopCarTotalPrice(state, price) {
        state.shopCarTotalPrice = price;
    },
    // 设置购物车总数量
    setShopCarAllCount(state, count) {
        state.shopCarAllCount = count;
    }
}
