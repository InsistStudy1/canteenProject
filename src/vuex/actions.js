export default {
    updateShopCarInfo(context) {
        window.$fetch(window.api.getShopCarInfo, {user_id: window.CookieUtil.get('id')}).then(res => {
            context.commit('setShopCarCount', res.total);
            context.commit('setShopCarTotalPrice', res.totalprice);
            context.commit('setShopCarAllCount', res.AllGoodsCount);
        })
    },
    // editGoodsNumber(content) {
    //     window.$fetch(window.api.updateShopCar, {user_id: window.CookieUtil.get('id')}).then(res => {
    //         console.log(res);
    //     })
    // }
}
