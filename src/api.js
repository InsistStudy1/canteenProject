const localUrl = 'http://localhost:82';
const version = '/api/v1';
const version2 = 'http://192.168.43.136/Project/index.php/Home';

const api = {
    register: `${version2}/Users/register`,     // 注册
    login: `${version2}/Users/login`,           // 登录
    // 首页
    goodsList: `${version2}/Index/GoodsLists`,  // 商品详情
    foodRecommendList: `${version2}/Index/Todaytj`, // 今日推荐
    getHealthRecommendList: `${version2}/Index/getHealthRecommendList`, // 养生推荐
    ShowBanner: `${version2}/Index/ShowBanner`, // 广告显示
    // 地址
    addAddress: `${version2}/Address/add`, // 添加地址
    showAllAddress: `${version2}/Address/showAllAddress`, // 添加地址
    setAddressDefault: `${version2}/Address/setAddressDefault`, // 设置默认地址
    UpdateAddressInfo: `${version2}/Address/UpdateAddressInfo`, // 修改地址
    selectAddress: `${version2}/Address/getRow`, // 根据ID查询地址
    deleteAddress: `${version2}/Address/deleteAddress`, // 根据ID查询地址,
    // 购物车
    getGoodInfo: `${version2}/Index/ShowDesc`, // 根据 ID 获取商品信息
    addGoods: `${version2}/Shopcar/addGoods`, // 添加商品到购物车
    getShopCarInfo: `${version2}/Shopcar/total`, // 获取购物车数据
    getShopCarDetailInfo: `${version2}/Shopcar/shopCarList`, // 获取购物车详细数据
    setGoodsChecked: `${version2}/Shopcar/setChecked`, // 设置商品勾选状态
    CheckCanteenAllgoods: `${version2}/Shopcar/CheckCanteenAllgoods`, // 设置同一类别购物选
    SelChangeAll: `${version2}/Shopcar/SelChangeAll`, // 全选商品
    updateShopCar: `${version2}/Shopcar/updateShopCar`, // 修改商品数量
    removeCarInfos: `${version2}/Shopcar/removeCarInfos`, // 删除购物商品
    getDefaultAddress: `${version2}/Shopcar/getDefaultAddress`, // 获取默认地址,
    showChecked: `${version2}/Shopcar/showChecked`, // 获取提交订单的数据
    // 订单功能
    makeOrders: `${version2}/Order/MakeOrders`, // 提交订单
    getOrderList: `${version2}/Order/ShowOrder`, // 获取订单列表
}
module.exports = api;
