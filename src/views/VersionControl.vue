<template>
    <!-- 用户空间 -->
    <section id="version-control">
        <!-- 顶部导航文本 -->
        <div class="title">
            <h2>管理员设置</h2>
            <span>&gt;</span>
            <h2>应用版本配置</h2>
        </div>
        
        <div class="msg-box">
            <!-- 添加版本 -->
            <div class="add-vip">
                <el-button type="primary" icon="el-icon-plus" @click="showVip">添加版本</el-button>
            </div>
            <!-- 信息展示 -->
            <div class="wrap" v-if="data">
                <el-card class="card card-1" shadow="hover" v-for="item in data" :key="item.id">
                    <h2 class="vip-title">办公宝 {{item.version}}</h2>
                    <div class="setting">
                        <p >版本号 : <b>{{ item.version }}</b></p>   
                        <p >版本描述 : <b>{{ item.note }}</b></p>
                        <p >版本地址: <b>{{ item.url }}</b></p>
                        <p >创建时间 : <b>{{ item.amendTime }}</b></p>
                        <div class="btn">
                            <el-button type="primary" plain icon="el-icon-edit" circle @click="editVip(item)">
                            </el-button>
                        </div>
                    </div>
                </el-card>               
            </div>  
        </div>


        <!-- 编辑对话框 -->
        <el-dialog title="修改应用版本" :visible.sync="showEdit">
        <el-form>
            <el-form-item label="版本号" label-width="30%">
            <el-input v-model="single.version" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本描述" label-width="30%">
            <el-input v-model="single.note" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本地址" label-width="30%">
            <el-input v-model="single.url" autocomplete="off"></el-input>
            </el-form-item>                                           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showEdit = false">取 消</el-button>
            <el-button type="primary" @click="enterEdit">确 定</el-button>
        </div>
        </el-dialog>

        <!-- 添加版本对话框 -->
        <el-dialog title="添加版本" :visible.sync="showAddVip">
        <el-form>
            <el-form-item label="版本号" label-width="30%">
            <el-input v-model="single.version" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本描述" label-width="30%">
            <el-input v-model="single.note" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="版本地址" label-width="30%">
            <el-input v-model="single.url" autocomplete="off"></el-input>
            </el-form-item>                                 
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showAddVip = false">取 消</el-button>
            <el-button type="primary" @click="addVip">确 定</el-button>
        </div>
        </el-dialog>
    </section>    
</template>

<script>
export default {
    name: "VersionControl",
    data() {
        return {
            id: "",
            data: null,  
            single: {   // 版本信息
                id: 1,
                version: "", // 版本号
                note: "",   // 描述
                url: "",    // 地址
                amendTime: "",  // 添加时间
            },
            showEdit: false,    // 编辑对话框开关
            showAddVip: false,  // 添加版本对话框开关
        }
    },
    created() {
        // 获取数据
        this.getData();
    },
    methods: {
        showVip() {
            // 初始化single对象，显示添加版本对话框
            this.single = {
                version: "", // 版本号
                note: "",   // 描述
                url: "",    // 地址
                // amendTime: "",  // 添加时间
            };
            this.showAddVip = true;
        },
        addVip() {
            // 添加版本
            if(!this.single.version) {
                this.$message({
                    message: "请输入版本号",
                    type: "warning"
                });
            }else if(this.single.note == "") {
                this.$message({
                    message: "请输入版本描述",
                    type: "warning"
                });
            }else if(this.single.url == "") {
                this.$message({
                    message: "请输入版本地址",
                    type: "warning"
                });
            }else {
                console.log(this.single);
                this.$axios.post("/appversion/addversion", this.single)
                    .then(res => {
                        console.log(res);
                        this.getData();
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.showAddVip = false;
                    })
                    .catch(err =>{
                        console.log(err);
                        this.$message.error("error: 添加失败");
                        this.showAddVip = false;
                    });
            }
        },
        editVip(item) {
            // 编辑vip事件
            console.log(item);
            this.single = null;
            this.single = item;
            this.showEdit = true;
        },
        enterEdit() {
            // 确定编辑事件，提交编辑内容到接口     
            console.log(this.single);
            if(this.single) {
                this.$axios.post("/appversion/updateByKeyId", this.single)
                    .then(res => {
                        console.log(res);
                        this.getData();
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        this.showEdit = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        getData() {
            // 获取版本数据
            this.$axios.post("/appversion/selectAll")
                .then(res => {
                    console.log(res);
                    if(res.data.status == 500) {
                        this.$message.error("500: 获取数据失败");
                    } else {
                        this.data = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message.error("error: 获取数据失败");
                });
        }
    }
}
</script>

<style lang="scss" scoped>

#version-control {
  padding: 0.25rem;
  height: 9rem;
  max-height: 9.1rem;
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
    overflow-y: auto;
    box-sizing: border-box;
    height: 98%;
    width: 99%;
    margin: 0.05rem auto 0;
    background: linear-gradient(
      -90deg,
      rgba(0, 246, 255, 0.17),
      rgba(138, 0, 255, 0.17)
    );
    border-radius: 14px;
    .wrap {
        overflow-x: auto;
        padding-top: 1rem;
        width: 90%;
        height: 90%;
        margin: .05rem auto;
        // text-align: center;
        // display: flex;
        // justify-content: center;
        // flex-wrap: nowrap;
        white-space: nowrap;
        .card {
            display: inline-block;
            box-sizing: border-box;
            border-radius: .1875rem;
            position: relative;
            width: 5rem;
            font-size: .22rem;
            height: 85%;
            margin-right: .15rem;
            background: #80A4DA linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
            .setting .btn {
                position: absolute;
                bottom: 5%;
                right: 5%;
            }
            .vip-title {
                color: #fff;
                text-align: center;
            }
            p {
                margin-top: .25rem;
                color: #fff;
                padding-left: 8%;
            }
        }
    }
    .add-vip {
        width: 90%;
        margin: 0 auto;
        text-align: right;
    }
  }
}
</style>












