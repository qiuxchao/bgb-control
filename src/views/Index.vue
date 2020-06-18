<template>
    <!-- index -->
    <section id="index">
        <el-container>
            <!-- 头部 -->
            <el-header class="header">
                <h1 class="logo">
                    金蝉子办公宝后台
                </h1>
                <div class="user-info">
                    <p class="change" @click="dialogFormVisible = true">修改密码</p>
                    <p class="logout" @click="showMsg = true">注销</p>
                    <!-- 头像 -->
                    <img class="author" src="../assets/logo.png" alt="">
                </div>
            </el-header>
            <!-- 修改密码弹出层 -->
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible" center>
                <el-form>
                    <el-form-item label="新密码" label-width="1.5rem">
                    <el-input v-model="newPwd" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="change">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 注销用户弹出层 -->
            <el-dialog
            title="提示"
            :visible.sync="showMsg"
            width="25%" center >
            <p style="text-align:center; font-size: 20px;">确定注销吗？</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showMsg = false">取 消</el-button>
                <el-button type="primary" @click="logout">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 内容区 -->
            <el-container class="body">
                <!-- 左侧菜单 -->
                <el-aside class="aside">
                    <!-- 第一栏用户信息 -->
                    <div class="author">
                        <img src="../assets/img/author.png" alt="用户">
                        <div class="msg">
                            <h2>{{ userInfo.username }}</h2>
                            <p>ID:{{ userInfo.id }}</p>
                        </div>
                    </div>
                    
                    <!-- 下拉菜单组 -->
                     <el-menu
                        :router="true"
                        :unique-opened="true"
                        default-active="1"
                        class="el-menu-vertical-demo menu"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#fff"
                        text-color="#656565"
                        active-text-color="#11D7FF">
                            <!-- 第一栏 首页-->
                            <el-menu-item index="/home">
                                <i class="el-icon-s-home"></i>
                                <span>首页</span>
                            </el-menu-item>
                           
                           <!-- 第二栏 管理员设置-->
                            <el-submenu index="2" class="menu-2 submenu">
                                <!-- 标题和图标 -->
                                <template slot="title">
                                    <i class="el-icon-s-custom"></i>
                                    <span>管理员设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/admin">
                                    <i class="el-icon-s-custom"></i>
                                    <span>管理员信息</span>
                                    </el-menu-item>
                                    <el-menu-item index="/usercontrol">
                                    <i class="el-icon-s-tools"></i>
                                    <span>用户管理数据配置</span>
                                    </el-menu-item>
                                    <el-menu-item index="/versioncontrol">
                                    <i class="el-icon-info"></i>
                                    <span>应用版本配置</span>
                                    </el-menu-item>                                    
                                </el-menu-item-group>
                            </el-submenu>
                            <!-- 第三栏 用户信息-->
                            <el-submenu index="3" class="menu-3 submenu">
                                <!-- 标题和图标 -->
                                <template slot="title">
                                    <i class="el-icon-user-solid"></i>
                                    <span>用户设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/userinfo">
                                    <i class="el-icon-user-solid"></i>
                                    <span>用户列表</span>
                                    </el-menu-item>
                                    <el-menu-item index="/userspace">
                                    <i class="el-icon-search"></i>
                                    <span>查询用户云盘空间</span>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <!-- 第四栏 文档上传下载-->
                            <el-submenu index="4" class="menu-4 submenu">
                                <!-- 标题和图标 -->
                                <template slot="title">
                                    <i class="el-icon-folder-opened"></i>
                                    <span>云盘文件信息</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/filesetting">
                                        <i class="el-icon-download"></i>
                                        <span>用户下载文件查询</span>
                                    </el-menu-item>
                                    <el-menu-item index="/uploadfiles">
                                        <i class="el-icon-upload2"></i>
                                        <span>用户上传文件查询</span>
                                    </el-menu-item>
                                    <el-menu-item index="/searchfiles">
                                        <i class="el-icon-upload"></i>
                                        <span>用户云盘文档查询</span>
                                    </el-menu-item>
                                    <el-menu-item index="/folder">
                                        <i class="el-icon-delete"></i>
                                        <span>用户回收站文档查询</span>
                                    </el-menu-item>          
                                    <el-menu-item index="/recyclable">
                                        <i class="el-icon-refresh"></i>
                                        <span>用户已回收文档查询</span>
                                    </el-menu-item>                                                              
                                    <el-menu-item index="/picture">
                                        <i class="el-icon-picture-outline"></i>
                                        <span>用户上传图片查询</span>
                                    </el-menu-item>                                                                          
                                </el-menu-item-group>
                            </el-submenu>
                            <!-- 第五栏 VIP-->
                            <el-menu-item index="/vip">
                                <!-- 标题和图标 -->
                                <template slot="title">
                                    <i class="el-icon-s-goods"></i>
                                    <span>VIP设置</span>
                                </template>
                            </el-menu-item>
                    </el-menu>

                </el-aside>

                <!-- 右侧内容 -->
                <el-main class="main">
                    <div class="content">
                        <!-- 路由页面展示 -->
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>

        </el-container>
    </section>
</template>


<script>
export default {
    name: "Index",
    data() {
        return {
            showMsg: false,
            userInfo: null, // 用户数据
            dialogFormVisible: false,   // 修改密码对话框开关
            newPwd: "", // 新密码
        }
    },
    created() {
        // 获取 sessionStorage 中的用户数据
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    },
    methods: {
        // 注销
        logout() {
            // 删除用户信息
            this.showMsg = false;
            this.$axios.post("/admin/logout")
            .then(res => {
                console.log('注销成功', res);
                sessionStorage.removeItem('userInfo');
                this.$router.push('/login');
                this.$message('注销成功');
            })
            .catch(err => {
                this.$message.error("error: 注销失败");
            });
        },
        // 修改用户密码
        change() {
            if(this.newPwd == "") {
                this.$message({
                    message: "请输入新密码",
                    type: "warning"
                });
            } else {
                // 获取用户名和密码
                let data = {
                    adminName: this.userInfo.username,
                    adminPwd: this.newPwd
                };
                // console.log(data);
                // 提交修改
                this.$axios.post("/admin/updateAdminPwd",data)
                    .then(res => {
                        console.log(res);
                        this.$message({
                            message: "修改密码成功",
                            type: "success"
                        });
                        // 关闭弹窗
                        this.dialogFormVisible = false
                    })
                    .catch(err => {
                        console.log(err);
                        this.$message.error("修改密码失败");
                        this.dialogFormVisible = false
                    });
            }

        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
}
</script>

<style lang="scss" scoped>

    #index {
        width: 100vw;
        height: 100vh;
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: .75rem;
            background: url(../assets/img/2.1.png) left center no-repeat;
            background-size: 100vw 60px;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;
            padding: .1875rem .4375rem;

            h1.logo {
                height: .4375rem;
                color: #FEFEFE;
                font-size: .2625rem;
                padding-left: .5rem;
                background: url(../assets/img/logo.png) left -3px no-repeat;
                background-size: 35px 35px;
            }
            .user-info {
                display: flex;
                justify-content: space-between;

                p {
                    font-weight: bold;
                    margin: 0 .25rem;
                    color: rgb(228, 227, 227);
                    font-size: .2rem;
                    cursor: pointer;
                    margin-top: 0.07rem;
                }
                .author {
                    cursor: pointer;
                    margin-top: -0.0625rem;
                    margin-left: .375rem;
                    width: .4875rem;
                    height: .4875rem;
                    border-radius: 50%;
                }
            }
        }
        .body {
            max-width: 1920px;
            min-width: 1024px;
            // 侧边菜单
            .aside {
                padding-top: .125rem;
                width: 3.125rem;
                margin-top: .75rem;   
                height: calc(100vh - .75rem);
                background: linear-gradient(-90deg,rgba(0,246,255,0.51),rgba(116,219,251,0.51));
                margin-right: .125rem;
                box-shadow: 1px 0 13px rgba(0, 0, 0, 0.39);
                display: flex;
                flex-direction: column;
                // 用户信息
                .author {
                    width: 100%;
                    height: 1.025rem;
                    display: flex;
                    padding: .1875rem;
                    background: #FFFFFF;
                    margin-bottom: 4px;
                    img {
                        width: .675rem;
                        height: .675rem;
                        border-radius: 50%;
                        box-shadow: 0 0 .0825rem rgba(0, 0, 0, 0.39);
                    }
                    .msg {
                        font-family:Adobe Heiti Std;
                        margin-left: .1875rem;
                        letter-spacing: 1px;
                        h2 {
                            font-size: .225rem;
                            color: #333;
                            margin-bottom: .125rem;
                        }
                        p {
                            font-size: .175rem;
                            color: #656565;
                            white-space: nowrap;
                            letter-spacing: 0;

                        }
                    }
                }

                // 下拉菜单
                .menu {
                    overflow-y: auto;
                    border-radius: 0 14px 14px 0;
                    min-height: 580px;
                    max-height: 1500px;
                    .submenu {
                        margin-bottom: .175rem;
                    }
                }
            }
            // 右侧内容
            .main {
                padding: 0 !important;
                margin-top: .825rem;
                width: 20.625rem;
                height: calc(100vh - .975rem);
                background: #FFFFFF;
                box-shadow: 1px 0 13px rgba(0, 0, 0, 0.39);
                border-radius: .225rem;
                margin-right: .125rem;
                box-sizing: border-box;
            }
        }
    }
</style>




