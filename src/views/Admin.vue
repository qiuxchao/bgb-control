<template>
  <!-- 管理员设置 -->
  <section id="admin">
    <!-- 顶部导航文本 -->
    <div class="title">
      <h2>管理员设置</h2>
      <span>&gt;</span>
      <h2>管理员信息</h2>
    </div>

    <!-- 下方数据展示 -->
    <div class="msg-box">
      <div class="table">
        <el-table
          :data="dataFilter(tableData, search)"
          style="width: 98%; margin: .125rem auto 0; border-radius: .135rem; box-shadow:0px 1px 1px 0px rgba(76,76,76,0.68); "
          max-height="9.1rem" height="9rem"
          :stripe="true"
        >
          <!-- 表头 -->
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column label="用户名" prop="adminName"></el-table-column>

          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名" label-width="20%">
          <el-input v-model="editData.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="20%">
          <el-input type="password" v-model="editData.adminPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterEdit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      tableData: [], // 表格数据
      search: "", // 搜索框内容
      editData: {
        adminName: "",
        adminPwd: ""
      }, // 编辑管理员信息
      dialogFormVisible: false // 编辑对话框开关
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 搜索
    dataFilter(tableData, search) {
      return tableData.filter(item => {
        return item.adminName.match(search);
      });
    },
    // 编辑按钮
    handleEdit(index, data) {
      console.log(data);
      this.editData = null;
      this.editData = data;
      // 显示对话框
      this.dialogFormVisible = true;
    },
    // 编辑提交事件
    enterEdit() {
      if (this.editData.adminName == "" || this.editData.adminPwd == "") {
        this.$message({
          message: "请输入必要的信息",
          type: "warning"
        });
      } else {
        this.$axios
          .post("/admin/updateAdminPwd", this.editData)
          .then(res => {
            console.log(res);
            if (res.data.status != 500) {
              this.dialogFormVisible = false;
              this.getData();
              this.$message({
                message: "修改成功",
                type: "success"
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("修改失败");
            this.dialogFormVisible = false;
          });
      }
    },
    // 删除按钮
    handleDelete(index, data) {
      console.log(index, data);
      this.$axios
        .post(`/admin/deleteAdmin?id=${data.id}`)
        .then(res => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除失败");
        });
    },
    // 获取管理员数据
    getData() {
      this.$axios
        .post("/admin/selectAllAdmin")
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
#admin {
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
    margin: 0.195rem auto 0;
    background: linear-gradient(
      -90deg,
      rgba(0, 246, 255, 0.17),
      rgba(138, 0, 255, 0.17)
    );
    border-radius: 14px;
  }
}
</style>

