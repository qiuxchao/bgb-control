<template>
    <!-- 用户空间 -->
    <section id="vip">
        <!-- 顶部导航文本 -->
        <div class="title">
            <h2>VIP设置</h2>
        </div>
        
        <div class="msg-box">
            <!-- 添加会员 -->
            <div class="add-vip">
                <el-button type="primary" icon="el-icon-plus" @click="showVip">添加会员</el-button>
            </div>
            <!-- 信息展示 -->
            <div class="wrap" v-if="data">
                <el-card class="card card-1" shadow="hover" v-for="item in data" :key="item.id">
                    <h2 class="vip-title">{{ item.vipName }}</h2>
                    <div class="setting">
                        <p class="price">价格 : <b>{{ item.vipPrice }}</b> 元</p>   
                        <p class="space">容量 : <b>{{ item.vipSpace }}</b></p>
                        <p class="time">有效时间 : <b>{{ item.effectiveTime }}</b> 个月</p>
                        <p class="btn" style="text-align: right;">
                            <el-button type="primary" plain icon="el-icon-edit" circle @click="editVip(item)">
                            </el-button>
                        </p>
                    </div>
                </el-card>               
            </div>  
        </div>


        <!-- 编辑对话框 -->
        <el-dialog :title="single.vipName" :visible.sync="showEdit">
        <el-form>
            <el-form-item label="价格(元)" label-width="20%">
            <el-input v-model="single.vipPrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="容量" label-width="20%">
            <el-input v-model="single.vipSpace" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效时间(月)" label-width="20%">
            <el-input v-model="single.effectiveTime" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showMsg = true" type="danger" > 删 除</el-button>
            <el-button @click="showEdit = false">取 消</el-button>
            <el-button type="primary" @click="enterEdit">确 定</el-button>
        </div>
        </el-dialog>


        <!-- 添加vip对话框 -->
        <el-dialog title="添加VIP" :visible.sync="showAddVip">
        <el-form>
            <el-form-item label="VIP名称" label-width="20%">
            <el-input v-model="single.vipName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)" label-width="20%">
            <el-input v-model="single.vipPrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="容量" label-width="20%">
            <el-input v-model="single.vipSpace" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效时间(月)" label-width="20%">
            <el-input v-model="single.effectiveTime" autocomplete="off"></el-input>
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
    name: "Vip",
    data() {
        return {
            id: "",
            data: null,  
            single: {   // 单个的vip数据，通过点击右下角编辑赋值
                effectiveTime: 0,
                id: "",
                vipName: "",
                vipPrice: "",
                vipSpace: ""
            },
            showEdit: false,    // 编辑vip对话框开关
            showMsg: false, // 确认删除对话框开关
            showAddVip: false,  // 添加vio对话框开关
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
                effectiveTime: 0,
                vipName: "",
                vipPrice: "",
                vipSpace: ""
            };
            this.showAddVip = true;
        },
        addVip() {
            // 添加Vip
            if(!this.single.effectiveTime) {
                this.$message({
                    message: "请输入vip时长",
                    type: "warning"
                });
            }else if(this.single.vipName == "") {
                this.$message({
                    message: "请输入vip名称",
                    type: "warning"
                });
            }else if(this.single.vipPrice == "") {
                this.$message({
                    message: "请输入vip价格",
                    type: "warning"
                });
            }else if(this.single.vipSpace == "") {
                this.$message({
                    message: "请输入vip空间",
                    type: "warning"
                });
            } else {
                console.log(this.single);
                this.$axios.post("/vip/addVip", this.single)
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
                this.$axios.post(`/vip/deleteByKeyId?id=${this.single.id}`)
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
                this.$axios.post("/vip/updateByKeyId", this.single)
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
            // 获取VIP数据
            this.$axios("/vip/selectAllVip")
                .then(res => {
                    console.log(res);
                    if(res.data.status == 500) {
                        this.$message.error("500: 获取vip数据失败");
                    } else {
                        this.data = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message.error("error: 获取vip数据失败");
                });
        }
    }
}
</script>

<style lang="scss" scoped>

#vip {
  padding: 0.25rem;
  height: 9.65rem;
  max-height: 10rem;
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
    height: 9.3rem;
    width: 99%;
    margin: 0.05rem auto 0;
    background: linear-gradient(
      -90deg,
      rgba(0, 246, 255, 0.17),
      rgba(138, 0, 255, 0.17)
    );
    border-radius: 14px;
    .wrap {
        justify-content: center;
        padding-top: .25rem;
        width: 90%;
        height: 90%;
        margin: .125rem auto;
        display: flex;
        flex-wrap: wrap;
        .card {
            margin-bottom: .15rem;
            border-radius: .1875rem;
            position: relative;
            width: 4rem;
            font-size: .225rem;
            margin-right: .1875rem;
            height: 35%;
            background: #80A4DA linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
            
            .vip-title {
                color: #fff;
                text-align: center;
            }
            p {
                margin-top: .25rem;
                color: #fff;
                padding-left: 30%;
            }
            .btn {
                position: absolute;
                bottom: .125rem;
                right: .125rem;
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












