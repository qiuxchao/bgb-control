<template>
    <!-- 下载文件查询 -->
    <section id="file-set">
        <!-- 顶部导航文本 -->
        <div class="title">
            <h2>云盘文件信息</h2>
            <span>&gt;</span>
            <h2>用户下载文件查询</h2>
        </div>

         <div class="msg-box">
            <div class="search">
                <el-input class="input" placeholder="请输入用户id" v-model="search" clearable></el-input>
                <el-button class="btn" @click="getData" type="primary" icon="el-icon-search">查询</el-button>
            </div>
            <!-- 信息展示 -->
            <div class="space-info" v-if="dataFilter(data, keyword) != []">
                <el-table :data="dataFilter(data, keyword)" 
                style="width: 100%; margin: .125rem auto 0; border-radius: .135rem; box-shadow:0px 0px 5px rgba(76,76,76,0.3);"
                max-height="7.3rem"
                height="7.1rem"
                :stripe="true"
                >
                    <el-table-column label="文件名" prop="fileName"></el-table-column>
                    <el-table-column label="文件大小" prop="fileSize"></el-table-column>
                    <!-- <el-table-column label="文件地址" prop="filePath"></el-table-column> -->
                    <el-table-column label="文件类型" prop="fileType"></el-table-column>
                    <el-table-column label="下载时间" prop="downloadTime"></el-table-column>
                    <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input  v-model="keyword" size="mini" placeholder="根据文件名或后缀名搜索"/>
                    </template>
                    <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页组件 -->
                <div class="pagination">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total"></el-pagination>
                </div>
            </div>

            <!-- 详情对话框 -->
            <el-dialog class="dialog" top="10vh" :visible.sync="showDetails">
                <h2 class="msg-title">文件详情</h2>
                <div class="message" v-if="details">
                    <p v-if="details.id"><strong>文件id : </strong>{{ details.id }}</p>
                    <p v-if="details.userId"><strong>用户id : </strong>{{ details.userId }}</p>
                    <p v-if="details.fileName"><strong>文件名 : </strong>{{ details.fileName }}</p>
                    <p v-if="details.fileType"><strong>文件类型 : </strong>{{ details.fileType }}</p>
                    <p v-if="details.filePath"><strong>文件地址 : </strong>{{ details.filePath }}</p>
                    <p v-if="details.fileSize"><strong>文件大小 : </strong>{{ details.fileSize }}</p>
                    <p v-if="details.filePicPath"><strong >文件图片路径 : </strong>{{ details.filePicPath }}</p>
                    <p v-if="details.downloadTime"><strong>下载时间 : </strong>{{ details.downloadTime }}</p>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
export default {
    name: "FileSet",
    data() {
        return {
            search: "", // id 输入框
            copyId: "",    // 搜索备份
            data: null, // 数据
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
            currentPage: 1, // 分页默认显示页数 
            total: 0,   // 全部条数
            selectPage: 0,  // 当前选中的页数
            pageSize: 10,   // 每页默认条数
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.selectPage = val;
            if(this.copyId != "") {
                this.$axios.post(`/download/selectByIdPage?userId=${this.copyId}&pageindex=${val}&pagesize=${this.pageSize}`)
                    .then(res => {
                        console.log(res);
                        this.data = res.data.data.list;
                    })
                    .catch(err => {
                        console.log(res);
                        this.$message.error("error: 查询失败");
                    });
            }
        },
        handleEdit(index, data) {
            console.log(index, data);
            // 详情
            this.details = null;
            this.details = data;
            this.showDetails = true;
            
        },
        handleDelete(index, data) {
            // 删除文件
            console.log(index, data);
            this.$axios.post("/download/deleteById?ids="+data.id)
                .then(res => {
                    console.log(res);
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$axios.post(`/download/selectByIdPage?userId=${this.copyId}&pageindex=${this.selectPage}&pagesize=${this.pageSize}`)
                    .then(res => {
                        console.log(res);
                        this.data = res.data.data.list;
                        this.total = res.data.data.total;
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.$message.error("error: 删除失败");
                });
        },
        dataFilter(data, keyword) {
            if(data) {
                return data.filter(item => {
                    // 根据文件名或后缀名搜索
                    return item.fileName.match(keyword) || item.fileType.match(keyword);
                })
            } else {
                return [];
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
                this.selectPage = 1;
                this.$axios.post(`/download/selectByIdPage?userId=${this.search}&pageindex=${1}&pagesize=${this.pageSize}`)
                    .then(res => {
                        console.log(res);
                        this.data = res.data.data.list;
                        this.total = res.data.data.total;
                        this.$message({
                            message: "查询成功",
                            type: "success"
                        });
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
#file-set {
  padding: 0.25rem;
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
        margin: .25rem .375rem;
        display: flex;
        width: 50%;
        .input {
            margin-left: .15rem;
            margin-right: .25rem;
        }
    }
    .space-info {
        margin: 0 .20rem;
        width: 95%;
        overflow: hidden;
        background: #fff;
        padding: .15rem .15rem;
        border-radius: .175rem;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
        .pagination {
            // 分页器
            height: .5rem;
            text-align: center;
            padding: .125rem 0;
        }
        
    }

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

