<template>
    <!-- 用户空间 -->
    <section id="user-space">
        <!-- 顶部导航文本 -->
        <div class="title">
            <h2>用户设置</h2>
            <span>&gt;</span>
            <h2>查询用户云盘空间</h2>
        </div>
        
        <div class="msg-box">
            <div class="search">
                <el-input class="input" placeholder="请输入用户id" v-model="id" clearable></el-input>
                <el-button class="btn" @click="getData" type="primary" icon="el-icon-search">查询</el-button>
            </div>
            <!-- 信息展示 -->
            <div class="space-info" v-if="data">
                <p><strong>用户ID : </strong>{{ data.userId }}</p>
                <p><strong>总空间 : </strong>{{ data.spaceSize }}</p>
                <p><strong>剩余空间 : </strong>{{ data.freeSpace }}</p>
                <p><strong>空间字节 : </strong>{{ data.freeSpaceNumber }}</p>
            </div>
        </div>


    </section>    
</template>

<script>
export default {
    name: "UserSpace",
    data() {
        return {
            id: "",
            data: null
        }
    },
    methods: {
        getData() {
            // 根据输入的id查询用户空间
            if(this.id == "") {
                this.$message({
                    message: "请输入用户id再查询",
                    type: "warning"
                });
            } else {
                this.$axios.post(`/userSpace/selectSpace?userId=${this.id}`)
                    .then(res => {
                        console.log(res);
                        this.$message({
                            message: "查询成功",
                            type: "success"
                        });
                        this.data = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                        this.$message.error("error: 查询失败");
                    });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

#user-space {
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
    width: 99%;
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
        margin: 0 .395rem;
        width: 90%;
        overflow: hidden;
        background: #fff;
        padding: .15rem .25rem;
        border-radius: .175rem;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
        p {
            padding: .125rem .125rem;
            font-size: .225rem;
            color: #333;
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            &:nth-child(1) {
                border-top: 1px solid #ccc;
                
            }
            strong {
                display: inline-block;
                width: 1.2rem;
            }
        }
    }
  }
}
</style>







