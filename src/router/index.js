import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//导入组件 路由懒加载
const Home = ()=>import('views/home/Home')
const Cart = ()=>import('views/cart/Cart')
const Category = ()=>import('views/category/Category')
const Profile = ()=>import('views/profile/Profile')
const Detail = ()=>import('views/detail/Detail')

const routes = [
  {
    path:'',
    redirect:'/home',
    component:Home,

  },
  {
    path:'/home',
    component:Home,
    meta:{title:'首页'}
  },
  {
    path:'/cart',
    component:Cart,
    meta:{title:'购物车'}
  },
  {
    path:'/category',
    component:Category,
    meta:{title:'分类'}
  },
  {
    path:'/profile',
    component:Profile,
    meta:{title:'用户'}
  },
  {
    path:'/detail/:iid',
    component:Detail,
    meta:{title:'商品详情'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
