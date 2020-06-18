<template>
    <!-- 用户空间 -->
    <section id="user-control">
        <!-- 顶部导航文本 -->
        <div class="title">
            <h2>管理员设置</h2>
            <span>&gt;</span>
            <h2>用户管理数据配置</h2>
        </div>
        
        <div class="msg-box">
            <!-- 添加会员 -->
            <div class="add-vip">
                <el-button type="primary" icon="el-icon-plus" @click="showVip">添加配置</el-button>
            </div>
            <!-- 信息展示 -->
            <div class="wrap" v-if="data">
                <el-card class="card card-1" shadow="hover" v-for="(item, index) in data" :key="item.id">
                    <h2 class="vip-title">配置 {{ index+1 }}</h2>
                    <div class="setting">
                        <p >每天转换次数 : <b>{{ item.conversionNumber }}</b> 次</p>   
                        <p >每天扫描次数 : <b>{{ item.scanningNumber }}</b> 次</p>
                        <p >文字处理可使用次数 : <b>{{ item.useNumber }}</b> 次</p>
                        <p >普通用户空间大小 : <b>{{ item.spaceSize }}</b></p>
                        <p >普通用户空间字节 : <b>{{ item.spacesizeNumber }}</b></p>
                        <p >VIP空间大小 : <b>{{ item.vipSpace }}</b></p>
                        <p >VIP空间字节 : <b>{{ item.vipspacesizeNumber }}</b></p>
                        <p >回收站过期时间 : <b>{{ item.expirationTime }}</b> 天</p>
                        <p >奖励天数 : <b>{{ item.rewards }}</b> 天</p>
                        <div class="btn">
                            <el-button type="primary" plain icon="el-icon-edit" circle @click="editVip(item)">
                            </el-button>
                        </div>
                    </div>
                </el-card>               
            </div>  
        </div>


        <!-- 编辑对话框 -->
        <el-dialog title="修改用户配置数据" :fullscreen="true" :visible.sync="showEdit">
        <el-form>
            <el-form-item label="每天转换次数" label-width="30%">
            <el-input v-model="single.conversionNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="每天扫描次数" label-width="30%">
            <el-input v-model="single.scanningNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文字处理可使用次数" label-width="30%">
            <el-input v-model="single.useNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="普通用户空间大小" label-width="30%">
            <el-input v-model="single.spaceSize" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="普通用户空间字节" label-width="30%">
            <el-input v-model="single.spacesizeNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="VIP空间大小" label-width="30%">
            <el-input v-model="single.vipSpace" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="VIP空间字节" label-width="30%">
            <el-input v-model="single.vipspacesizeNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="回收站过期时间" label-width="30%">
            <el-input v-model="single.expirationTime" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="奖励天数" label-width="30%">
            <el-input v-model="single.rewards" autocomplete="off"></el-input>
            </el-form-item>                                                
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showMsg = true" type="danger" > 删 除</el-button>
            <el-button @click="showEdit = false">取 消</el-button>
            <el-button type="primary" @click="enterEdit">确 定</el-button>
        </div>
        </el-dialog>


        <!-- 添加vip对话框 -->
        <el-dialog title="添加配置" :fullscreen="true" :visible.sync="showAddVip">
        <el-form>
            <el-form-item label="每天转换次数" label-width="30%">
            <el-input v-model="single.conversionNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="每天扫描次数" label-width="30%">
            <el-input v-model="single.scanningNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文字处理可使用次数" label-width="30%">
            <el-input v-model="single.useNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="普通用户空间大小" label-width="30%">
            <el-input v-model="single.spaceSize" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="普通用户空间字节" label-width="30%">
            <el-input v-model="single.spacesizeNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="VIP空间大小" label-width="30%">
            <el-input v-model="single.vipSpace" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="VIP空间字节" label-width="30%">
            <el-input v-model="single.vipspacesizeNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="回收站过期时间" label-width="30%">
            <el-input v-model="single.expirationTime" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="奖励天数" label-width="30%">
            <el-input v-model="single.rewards" autocomplete="off"></el-input>
            </el-form-item>                                                
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showAddVip = false">取 消</el-button>
            <el-button type="primary" @click="addVip">确 定</el-button>
        </div>
        </el-dialog>

        <!-- 删除vip弹出层 -->
        <el-dialog
        title="提示"
        :visible.sync="showMsg"
        width="25%" center >
        <p style="text-align:center; font-size: 20px;">确定删除吗？</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showMsg = false">取 消</el-button>
            <el-button type="primary" @click="deleteItem">确 定</el-button>
        </span>
        </el-dialog>
    </section>    
</template>

<script>
export default {
    name: "UserControl",
    data() {
        return {
            id: "",
            data: null,  
            single: {   // 单个用户配置的数据
                conversionNumber: "", // 每天转换次数
                expirationTime: "",  // 回收站过期时间
                id: "",
                rewards: "",  // 奖励天数
                scanningNumber: "",  // 每天扫描次数
                spaceSize: "",  // 普通用户空间大小
                spacesizeNumber: "",  // 普通用户空间字节大小
                useNumber: "",  // 文字处理可使用次数
                vipSpace: "",  // VIP空间大小
                vipspacesizeNumber: ""  // vip 空间字节大小
            },
            showEdit: false,    // 编辑vip对话框开关
            showMsg: false, // 确认删除对话框开关
            showAddVip: false,  // 添加配置对话框开关
        }
    },
    created() {
        // 获取VIP数据
        this.getData();
    },
    methods: {
        showVip() {
            // 初始化single对象，显示添加vip对话框
            this.single = {
                conversionNumber: "", // 每天转换次数
                expirationTime: "",  // 回收站过期时间
                id: "",
                rewards: "",  // 奖励天数
                scanningNumber: "",  // 每天扫描次数
                spaceSize: "",  // 普通用户空间大小
                spacesizeNumber: "",  // 普通用户空间字节大小
                useNumber: "",  // 文字处理可使用次数
                vipSpace: "",  // VIP空间大小
                vipspacesizeNumber: ""  // vip 空间字节大小
            };
            this.showAddVip = true;
        },
        addVip() {
            // 添加Vip
            if(!this.single.conversionNumber) {
                this.$message({
                    message: "请输入每天转换次数",
                    type: "warning"
                });
            }else if(this.single.scanningNumber == "") {
                this.$message({
                    message: "请输入每天扫描次数",
                    type: "warning"
                });
            }else if(this.single.useNumber == "") {
                this.$message({
                    message: "请输入文字处理可使用次数",
                    type: "warning"
                });
            }else if(this.single.spaceSize == "") {
                this.$message({
                    message: "请输入普通用户空间大小",
                    type: "warning"
                });
            }else if(this.single.spacesizeNumber == "") {
                this.$message({
                    message: "请输入普通用户空间字节",
                    type: "warning"
                });
            }else if(this.single.vipSpace == "") {
                this.$message({
                    message: "请输入VIP空间大小",
                    type: "warning"
                });
            }else if(this.single.vipspacesizeNumber == "") {
                this.$message({
                    message: "请输入VIP空间字节大小",
                    type: "warning"
                });
            }else if(this.single.expirationTime == "") {
                this.$message({
                    message: "请输入回收站过期时间",
                    type: "warning"
                });
            }else if(this.single.rewards == "") {
                this.$message({
                    message: "请输入奖励天数",
                    type: "warning"
                });
            } else {
                console.log(this.single);
                this.$axios.post("/adminNumber/addAdminNumber", this.single)
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
        deleteItem() {
            // 删除
            if(this.single) {
                this.$axios.post(`/adminNumber/deleteBykeyId?id=${this.single.id}`)
                    .then(res => {
                        console.log(res);
                        this.getData();
                        this.showMsg = false;
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.showEdit = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.$message.error("删除失败");
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
                this.$axios.post("/adminNumber/updateById", this.single)
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
            // 获取用户配置数据
            this.$axios.post("/adminNumber/selectAll")
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

#user-control {
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
        padding-top: .05rem;
        width: 90%;
        height: 90%;
        margin: .05rem auto;
        // display: flex;
        // flex-wrap: nowrap;
        white-space: nowrap;
        .card {
            display: inline-block;
            box-sizing: border-box;
            border-radius: .1875rem;
            position: relative;
            width: 4.5rem;
            font-size: .22rem;
            height: 95%;
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












