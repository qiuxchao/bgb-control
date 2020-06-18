<template>
    <!-- 回收站查询 -->
    <section id="folder">
        <!-- 顶部导航文本 -->
        <div class="title">
            <h2>文件信息</h2>
            <span>&gt;</span>
            <h2>用户回收站文档查询</h2>
        </div>

         <div class="msg-box">
            <div class="search">
                <div class="btn1">
                    <el-input class="input" placeholder="根据用户id查询" v-model="search" clearable></el-input>
                    <el-button class="btn" @click="getData" type="primary" icon="el-icon-search">查询</el-button>  
                </div>
                <div class="btn2">
                    <el-input class="input" placeholder="根据文件夹id查询" v-model="folder" clearable></el-input>
                    <el-button class="btn" @click="searchFolder" type="primary" icon="el-icon-search">查询</el-button>  
                </div>
            </div>
            <!-- 信息展示 -->
            <div class="tabs">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="文件" name="first">
                        <Files :data="data.documents"/>
                    </el-tab-pane>
                    <el-tab-pane label="文件夹" name="second">
                        <Folders :data="data.folders" />
                    </el-tab-pane>
                    <el-tab-pane label="图片" name="third">
                        <Photos :data="data.pictures" />
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </section>
</template>

<script>
// 文件组件
import Files from '../components/Files'
// 文件夹组件
import Folders from '../components/Folders'
// 图片组件
import Photos from '../components/Photos'
export default {
    name: "Folder",
    data() {
        return {
            folder: "", // 文件夹id
            activeName: 'first',   // 选项卡默认选中
            search: "", // 用户 id 输入框
            copyId: "",    // id 备份
            data: {
                documents: [],
                folders: [],
                pictures: []
            }, // 数据
            keyword: "", // 文件搜索输入框
            showDetails: false, // 详情对话框开关
            details: {   // 详情对话框数据
                id: "", // 文件 id
                userId: "", // 用户 id
                fileName: "",   //  文件名
                fileType: "",   // 文件类型
                filePath: "",   // 文件地址
                fileSize: "",   // 文件大小
                filePicPath: "", // 文件图片路径
                downloadTime: "",   // 下载时间 
            },
        }
    },
    components: {
        // 注册组件
        Files,
        Folders,
        Photos
    },
    methods: {
        searchFolder() {
            // 查询文件夹
            if(this.folder == "") {
                this.$message({
                    message: "请输入文件夹id再查询",
                    type: "warning"
                });
            } else {
                this.$axios.post(`/folder/selectById?id=${this.folder}`)
                    .then(res => {
                        console.log(res);
                        if(res.data.status == 500) {
                            this.$message.error("500: 服务器返回错误");
                        } else {
                            this.data = res.data.data;
                            this.$message({
                                message: "查询成功",
                                type: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(res);
                        this.$message.error("error: 查询失败");
                    });
            }
        },
        getData() {
            // 默认搜索第一页
            if(this.search == "") {
                this.$message({
                    message: "请输入用户id再查询",
                    type: "warning"
                });
            } else {
                this.copyId = "";
                this.copyId = this.search;
                this.$axios.post(`/folder/selectByUserId?userId=${this.search}`)
                    .then(res => {
                        console.log(res);
                        if(res.data.status == 500) {
                            this.$message.error("500: 服务器返回错误");
                        } else {
                            let data = res.data.data;
                            data.documents.forEach(item => {
                                item.creationTime = this.$timeCycle(item.creationTime);
                                if(item.recoveryTime) {
                                    item.recoveryTime = this.$timeCycle(item.recoveryTime);
                                }
                            });
                            data.pictures.forEach(item => {
                                item.creationTime = this.$timeCycle(item.creationTime);
                                if(item.recoveryTime) {
                                    item.recoveryTime = this.$timeCycle(item.recoveryTime);
                                }
                            });
                            this.data = data;
                            this.$message({
                                message: "查询成功",
                                type: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(res);
                        this.$message.error("error: 查询失败");
                    });
            }
        }
    }
}
</script>


<style lang="scss" scoped>
#folder {
  padding: 0.15rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .title {
    width: 99%;
    box-sizing: border-box;
    font-family: Adobe Heiti Std R;
    color: #000033;
    font-size: 0.1875rem;
    display: flex;
    padding-bottom: 0.1875rem;
    border-bottom: 2px solid #dddddd;
    h2,
    span {
      margin-right: 0.155rem;
    }
    span {
      font-size: 0.2225rem;
      font-weight: bold;
      margin-top: 5px;
    }
  }
  .msg-box {
    height: 9.3rem;
    width: 100%;
    margin: 0.05rem auto 0;
    background: linear-gradient(
      -90deg,
      rgba(0, 246, 255, 0.17),
      rgba(138, 0, 255, 0.17)
    );
    border-radius: 14px;
    
    .search {
        margin: .25rem .05rem;
        display: flex;
        width: 95%;
        justify-content: space-between;
        div {
            display: flex;

        }
        .input {
            margin-left: .25rem;
            margin-right: .15rem;
        }
    }

    // 选项卡
    .tabs {
        font-size: 0;
        width: 98%;
        height: 8.1rem;
        max-height: 8.3rem;
        margin: -0.15rem auto 0;
        padding: 5px 5px 0;
        box-sizing: border-box;
        background: #fff;
        border-radius: .175rem;
        box-shadow: 0 1px 5px rgba(0,0,0, .3);
    }


    // 对话框
    .dialog {
        .msg-title {
        margin-bottom: 15px;
        }
        .message {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            p {
                white-space: nowrap;
                overflow-x: auto;
                padding: 10px 25px;
                font-size: 16px;
                border-bottom: 1px solid #ccc;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                strong {
                    display: inline-block;
                    width: 110px;
                }
            }
            p:nth-child(1) {
                border-top: 1px solid #ccc;
            }
        }
    }
  }
}
</style>

