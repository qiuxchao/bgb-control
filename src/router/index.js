import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',  // 主页
        // name: 'index',
        component: () =>
            import ('../views/Index.vue'),
        children: [  // 子路由
            {
                path: '',
                redirect: '/home' // 将 index 页面重定向到 home
            },
            {
                path: "/home",
                name: "home",
                component: () => import('../views/Home.vue')
            },
            {
                path: "/admin", // 管理员页面
                name: "admin",
                component: () => import('../views/Admin.vue')
            },
            {
                path: "/usercontrol",   // 用户数据配置
                name: "usercontrol",
                component: () => import('../views/UserControl.vue')  
            },
            {
                path: "/versioncontrol",    // 应用版本控制
                name: "versioncontrol",
                component: () => import('../views/VersionControl.vue')
            },
            {
                path: "/userinfo", // 用户信息
                name: "userinfo",
                component: () => import('../views/UserInfo.vue')
            },
            {
                path: "/userspace", // 用户空间
                name: "userspace",
                component: () => import('../views/UserSpace.vue')
            },
            {
                path: "/filesetting", // 用户下载文件查询
                name: "filesetting",
                component: () => import('../views/FileSet.vue')
            },
            {
                path: "/searchfiles",   // 用户云盘文档查询
                name: "searchfiles",
                component: () => import('../views/SearchFiles.vue')
            },
            {
                path: "/uploadfiles",   // 用户上传文件查询
                name: "uploadfiles",
                component: () => import('../views/UploadFiles.vue')
            },
            {
                path: "/folder",    // 回收站查询
                name: "folder",
                component: () => import('../views/Folder.vue')
            },
            {
                path: "/recyclable",    // 用户已回收文档查询
                name: "recyclable",
                component: () => import('../views/Recyclable.vue')
            },
            {
                path: "/picture",   // 用户上传图片查询
                name: "picture",
                component: () => import('../views/Picture.vue')
            },
            {
                path: "/editdata", // 修改数据
                name: "editdata",
                component: () => import('../views/EditData.vue')
            },
            {
                path: "/vip", // Vip
                name: "vip",
                component: () => import('../views/Vip.vue')
            }
        ]
    }, 
    {
        // 登录页面
    path: '/login',
    name: 'login',
    component: () =>
        import ('../views/Login.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 解决 Element-ui 重复点击导航栏报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由守卫（当在此页面中改变到其他路径都会重新跳转回来）
router.beforeEach((to, from, next) => {
    // 判断本地存储中是否有用户登录的信息，有信息证明登录成功
    const isLogin = sessionStorage.userInfo ? true : false;
    if (to.path == "/login") {
      next();
    } else {
      // 是否在登录状态下
      isLogin ? next() : next("/login");
    }
});

export default router