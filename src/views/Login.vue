<template>
    <!-- 登录页面 -->
    <section id="login">
        <div class="container" >
            <!-- 标题 -->
            <div class="title">办公宝运营管理后台</div>


            <div class="main">
                <!-- 顶部选项卡文本 -->
                <div class="text">
                    <div class="login">登录</div>
                    <!-- <div class="sign">注册</div> -->
                </div>
                <!-- 输入框容器 -->
                <div class="input">
                    <div class="username">
                        <!-- 图标 -->
                        <p class="user-icon"></p>                        
                        <input type="text" v-model="username" placeholder="账号"/>
                    </div>
                    <div class="passwd">
                        <p class="pwd-icon"></p>
                        <input @keypress.enter="login" :type="showPwd ? 'text' : 'password' " v-model="password" class="passwd" placeholder="密码" />
                        <!-- 显示隐藏图标 -->
                        <p class="show-icon" @click="showPwd = !showPwd"></p>
                    </div>

                    <p class="lose">忘记密码</p>
                </div>
                <!-- 登录按钮 -->
                <button v-on:keyup.enter="login" class="log" @click="login">登录</button>
            </div>
        </div>
    </section>
</template>


<script>
import { Loading } from 'element-ui';
export default {
    data() {
        return {
            showPwd: false, // 显示密码开关
            username: "",   // 账号
            password: "",   // 密码
            // loading: false, // 加载动画
        }        
    },
    methods: {
        login() {
            // 登录
            if(this.username == "" || this.password == "") {
                this.$message({
                    message: '请输入必要的信息',
                    type: 'warning'
                });
            } else {
                let loadingInstance = Loading.service({
                    text: "登录中，请稍后...",
                    // background: "transparent"
                });
                this.$axios.post("/admin/login",
                {adminName: this.username, adminPwd: this.password}
                ).then(res => {
                    console.log(res);
                    if(res.data.status == 500) {
                        // 验证账户失败
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    } else {
                        loadingInstance.close();
                        // 存储用户信息到 sessionStorageStorage
                        let userInfo = {
                            username: this.username,
                            password: this.password,
                            id: res.data.data.id
                        }
                        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        // 登录成功，跳转到主页
                        this.$router.push('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message.error('登录失败');
                });
            }
        }
    }
}
</script>



<style lang="scss" scoped>
    #login {
        width: 100vw;
        height: 100vh;
        background: url(../assets/img/1.5.png) left center no-repeat;
        background-size: 100vw 100vh;
        box-sizing: border-box;
        position: fixed;
        text-align: center;
        .container {
            width: 100%;
            box-sizing: border-box;
            margin:8% auto 0; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;

            .title {
                text-align: center;
                font-size: 47px;
                color: #fff;
                font-weight: bold;
            }
            .main {
                box-sizing: border-box;
                margin: 30px auto;
                width: 500px;
                height: 400px;
                background-color: #FFFFFF;
                box-shadow: 21px 21px 56px rgba(0, 0, 0, 0.1);
                border-radius: 14px;
                display: flex;
                flex-direction: column;
                padding: 25px 30px; 
                .text {
                    display: flex;
                    justify-content: space-around;
                    font-size: 24px;
                    color: #3E50FF;
                    font-weight: bold;
                    margin-bottom: 44px;
                    div {
                        cursor: pointer;
                    }
                    div.sign {
                        color: #333333;
                    }
                }
                .input {
                    display: flex;
                    flex-direction: column;
                    input {
                        box-sizing: border-box;
                        width: 444px;
                        height: 51px;
                        border: none;
                        outline: none;
                        background-color: #DDDDDD;
                        border-radius: 14px;
                        margin-bottom: 34px;
                        padding: 17px 80px;
                        font-size: 22px;
                        color: #333;
                    }
                    .username {
                        position: relative;
                        display: flex;
                        align-items: center;
                        .user-icon {
                            width: 25px;
                            height: 30px;
                            background: url(../assets/img/1.3.png) left center no-repeat;
                            background-size: 25px 30px;
                            position: absolute;
                            left: 25px;
                            top: 10px;
                            z-index: 9;
                        }
                    }
                    .passwd {
                        position: relative;
                        display: flex;
                        align-items: center;
                        .pwd-icon {
                            z-index: 9;
                            width: 25px;
                            height: 30px;
                            background: url(../assets/img/1.2.png) left center no-repeat;
                            background-size: 25px 30px;
                            position: absolute;
                            left: 25px;
                            top: 10px;
                        }
                        .show-icon {
                            z-index: 9;
                            width: 25px;
                            height: 19px;
                            background: url(../assets/img/1.4.png) left center no-repeat;
                            background-size: 25px 19px;
                            position: absolute;
                            right: 25px;
                            top: 17px;
                            cursor: pointer;
                        }
                    }
                    .lose {
                    text-align: right;
                    font-size: 18px;
                    color: #999;
                    margin: -21px 10px 21px 0;
                    }
                }
                
                // 登录按钮
                button.log {
                    border: none;
                    width: 440px;
                    height: 70px;
                    border-radius: 14px;
                    background: url(../assets/img/5.2.png) left center no-repeat;
                    background-size: 440px 70px;
                    overflow: hidden;
                    color: #fff;
                    font-size: 27px;
                    cursor: pointer;
                }

            }
        }
    }
</style>