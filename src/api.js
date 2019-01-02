const localUrl = 'http://localhost:82';
const version = 'http://192.168.43.136/Project/index.php/Home';

const api = {
    // 用户
    register: `${version}/Users/register`,     // 注册
    login: `${version}/Users/login`,           // 登录
    editTel: `${version}/Users/editTel`, // 修改手机号码
    editImage: `${version}/Users/editImage`, // 修改头像
    getInfo: `${version}/Users/getInfos`, // 获取手机号和地址
    updatePwd: `${version}/Users/setPassword`, // 修改密码

    // 首页
    goodsList: `${version}/Index/GoodsLists`,  // 商品详情
    foodRecommendList: `${version}/Index/Todaytj`, // 今日推荐
    getHealthRecommendList: `${version}/Index/getHealthRecommendList`, // 养生推荐
    ShowBanner: `${version}/Index/ShowBanner`, // 广告显示
    // 地址
    addAddress: `${version}/Address/add`, // 添加地址
    showAllAddress: `${version}/Address/showAllAddress`, // 添加地址
    setAddressDefault: `${version}/Address/setAddressDefault`, // 设置默认地址
    UpdateAddressInfo: `${version}/Address/UpdateAddressInfo`, // 修改地址
    selectAddress: `${version}/Address/getRow`, // 根据ID查询地址
    deleteAddress: `${version}/Address/deleteAddress`, // 根据ID查询地址,
    // 购物车
    getGoodInfo: `${version}/Index/ShowDesc`, // 根据 ID 获取商品信息
    addGoods: `${version}/Shopcar/addGoods`, // 添加商品到购物车
    getShopCarInfo: `${version}/Shopcar/total`, // 获取购物车数据
    getShopCarDetailInfo: `${version}/Shopcar/shopCarList`, // 获取购物车详细数据
    setGoodsChecked: `${version}/Shopcar/setChecked`, // 设置商品勾选状态
    CheckCanteenAllgoods: `${version}/Shopcar/CheckCanteenAllgoods`, // 设置同一类别购物选
    SelChangeAll: `${version}/Shopcar/SelChangeAll`, // 全选商品
    updateShopCar: `${version}/Shopcar/updateShopCar`, // 修改商品数量
    removeCarInfos: `${version}/Shopcar/removeCarInfos`, // 删除购物商品
    getDefaultAddress: `${version}/Shopcar/getDefaultAddress`, // 获取默认地址,
    showChecked: `${version}/Shopcar/showChecked`, // 获取提交订单的数据
    // 订单功能
    makeOrders: `${version}/Order/MakeOrders`, // 提交订单
    getOrderList: `${version}/Order/ShowOrder`, // 获取订单列表
    // 评论
    insertComment: `${version}/Comment/InsertComment`, // 插入评论信息
    getCommentList: `${version}/Comment/getCommentLists`, // 获取评论信息
}
module.exports = api;
