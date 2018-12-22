import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index' // 主页
import Order from '@/components/order/Order'  // 订单页面
import ShoppingCar from '@/components/ShoppingCar'  // 购物车页面
import Information from '@/components/Information'  // 我的页面
import DishesDetails from '@/components/DishesDetails'  // 我的页面

// 登录 注册
import Login from '@/components/user/Login'  // 登录
import Register from '@/components/user/Register'  // 注册

// 订单
import SubmitOrder from '@/components/order/SubmitOrder'  // 提交订单

// 评论
import Comment from '@/components/Comment'

// 地址管理
import HarvestAddress from '@/components/address/HarvestAddress'  // 收货地址
import AddHarvestAddress from '@/components/address/AddHarvestAddress'  // 新增收货地址
import EditHarvestAddress from '@/components/address/EditHarvestAddress'  // 修改收货地址

import UpdateTel from '@/components/user/UpdateTel'  // 修改手机号
import UpdatePwd from '@/components/user/UpdatePwd'  // 修改密码



Vue.use(Router)

export default new Router({
    routes: [

        {path: '/', redirect: '/index'},
        // Tarbar 菜单栏
        {path: '/index', name: 'Index', component: Index},
        {path: '/order', name: 'Order', component: Order},
        {path: '/shoppingcar', name: 'ShoppingCar', component: ShoppingCar},
        {path: '/information', name: 'Information', component: Information},

        // 登录注册
        {path: '/login', name: 'Login', component: Login},
        {path: '/register', name: 'Register', component: Register},

        // 菜品详情
        {path: '/dishesdetails/:id', name: 'DishesDetails', component: DishesDetails},

        // 提交订单
        {path: '/submitorder', name: 'SubmitOrder', component: SubmitOrder},

        //评论
        {path: '/comment', name: 'Comment', component: Comment},

        // 地址管理
        {path: '/harvestaddress', name: 'HarvestAddress', component: HarvestAddress},
        {path: '/addharvestaddress', name: 'AddHarvestAddress', component: AddHarvestAddress},
        {path: '/editharvestaddress/:id', name: 'EditHarvestAddress', component: EditHarvestAddress},

        {path: '/updatetel', name: 'UpdateTel', component: UpdateTel},// 修改手机号码
        {path: '/updatepwd', name: 'UpdatePwd', component: UpdatePwd},// 修改密码
    ]
})
