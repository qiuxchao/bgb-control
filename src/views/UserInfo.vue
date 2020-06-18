<template>
  <!-- 管理员设置 -->
  <section id="user-info">
    <!-- 顶部导航文本 -->
    <div class="title">
      <h2>用户设置</h2>
      <span>&gt;</span>
      <h2>用户列表</h2>
    </div>

    <!-- 添加用户按钮 -->
    <!-- <div class="btn">
         <el-button type="primary" size="mini" round @click="showAddUser = true">添加用户</el-button>
    </div> -->
    <!-- 添加用户对话框 -->
    <!-- <el-dialog title="添加用户" :visible.sync="showAddUser">
    <el-form size="mini">
        <el-form-item label="账号" label-width="20%">
          <el-input v-model="editUser.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="20%">
          <el-input type="password" v-model="editUser.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" label-width="20%">
          <el-input v-model="editUser.invitationCode" autocomplete="off"></el-input>
        </el-form-item>        
        <el-form-item label="昵称" label-width="20%">
          <el-input v-model="editUser.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="20%">
          <el-input v-model="editUser.userAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人签名" label-width="20%">
          <el-input v-model="editUser.personalSignature" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像缩略图" label-width="20%">
          <el-input v-model="editUser.faceImage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像大图" label-width="20%">
          <el-input v-model="editUser.faceImageBig" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="根文件夹id" label-width="20%">
          <el-input v-model="editUser.rootFolderId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="vip状态" label-width="20%">
          <el-input v-model="editUser.vipState" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="vip初始时间" label-width="20%">
          <el-input v-model="editUser.rootFolderId" autocomplete="off"></el-input>
        </el-form-item>  
        <el-form-item label="vip到期时间" label-width="20%">
          <el-input v-model="editUser.vipExpirationTime" autocomplete="off"></el-input>
        </el-form-item>         
    </el-form>      
    <div slot="footer" class="dialog-footer">
        <el-button @click="showAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
    </el-dialog> -->

    <!-- 下方数据展示 -->
    <div class="msg-box">
      <div class="table">
        <el-table
          :data="dataFilter(data, search)" 
          style="width: 98%; margin: .125rem auto 0; border-radius: .135rem .135rem 0 0;"
          max-height="8.7rem"
          height="8.5rem"
          :stripe="true"
        >
          <!-- 表头 -->
          <el-table-column class-name="text-of" label="ID" prop="id"></el-table-column>
          <el-table-column label="账号" prop="userName"></el-table-column>
          <el-table-column label="昵称" prop="nickName"></el-table-column>
          <el-table-column label="是否VIP" prop="vipState"></el-table-column>
          <el-table-column label="创建时间" prop="creationTime"></el-table-column>
          <!-- 搜索框 -->
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="根据账号或昵称搜索用户" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
    </div>

    <!-- 用户详情对话框 -->
    <el-dialog top="10vh" :visible.sync="dialogTableVisible">
        <h2 class="msg-title">用户信息</h2>
        <div class="message" v-if="userInfo">
            <p v-if="userInfo.id"><strong>ID : </strong>{{ userInfo.id }}</p>
            <p v-if="userInfo.userName"><strong>用户名 : </strong>{{ userInfo.userName }}</p>
            <p v-if="userInfo.password"><strong>密码 : </strong>{{ userInfo.password }}</p>
            <p v-if="userInfo.nickName"><strong>昵称 : </strong>{{ userInfo.nickName }}</p>
            <p v-if="userInfo.userAge"><strong>年龄 : </strong>{{ userInfo.userAge }}</p>
            <p v-if="userInfo.invitationCode"><strong>邀请码 : </strong>{{ userInfo.invitationCode }}</p>
            <p v-if="userInfo.faceImage"><strong>头像缩略图 : </strong>
                <el-image style="width: 15px; height: 15px"
                :src="userInfo.faceImage" 
                :preview-src-list="[userInfo.faceImage]">
            </el-image>
                </p>
            <p v-if="userInfo.faceImageBig"><strong>头像大图 : </strong>
              <el-image style="width: 15px; height: 15px"
                :src="userInfo.faceImageBig" 
                :preview-src-list="[userInfo.faceImageBig]">
            </el-image>
            </p>
            <p v-if="userInfo.personalSignature"><strong>个人签名 : </strong>{{ userInfo.personalSignature }}</p>
            <p v-if="userInfo.rootFolderId"><strong>用户根文件夹id : </strong>{{ userInfo.rootFolderId }}</p>
            <p v-if="userInfo.creationTime"><strong>创建时间 : </strong>{{ userInfo.creationTime }}</p>
            <p v-if="userInfo.vipState"><strong>vip状态 : </strong>{{ userInfo.vipState }}</p>
            <p v-if="userInfo.vipExpirationTime"><strong>vip到期时间 : </strong>{{ userInfo.vipExpirationTime }}</p>
            <p v-if="userInfo.vipInitTime"><strong>vip初始时间 : </strong>{{ userInfo.vipInitTime }}</p>
        </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      total: 0, // 分页总条数
      currentPage: 1, // 分页默认显示
      pageSize: 12,  // 每页显示的条数
      data: null, // 所有用户数据
      search: "", // 搜索框内容
      userInfo: null, // 用户详情对话框数据
      dialogTableVisible: false, // 详情对话框开关
      showAddUser: false,   // 添加用户对话框开关
      editUser: {   // 添加用户表单数据
        creationTime: "",   // 创建时间
        faceImage: "",  // 头像缩略图
        faceImageBig: "",   // 图像大图
        invitationCode: "", // 邀请码
        nickName: "",   // 昵称
        passWord: "",   // 密码
        personalSignature: "",  // 个人签名
        rootFolderId: "",   // 用户根文件夹id
        userAge: "",    // 年龄
        userName: "",   // 账号
        vipExpirationTime: "",  // vip到期时间
        vipInitTime: "",    // vip初始时间
        vipState: ""    // vip状态
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      // 分页切换值
      console.log(val);
      this.$axios
        .post(`/user/findAllByPage?pageindex=${val}&pagesize=${this.pageSize}`)
        .then(res => {
          console.log(res);
          if (res.data.status == 500 || res.data.status == 401) {
            this.$message.error(`${res.data.status}:  服务器返回数据错误`);
          } else {
            this.data = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("error: 拉取用户数据失败");
        });
    },
    addUser() {
        // 添加用户
        this.showAddUser = false
    },
    getData() {
      // 拉取数据，默认获取第一页
      this.$axios
        .post(`/user/findAllByPage?pageindex=1&pagesize=${this.pageSize}`)
        .then(res => {
          console.log(res);
          if (res.data.status == 500 || res.data.status == 401) {
            this.$message.error(`${res.data.status}:  服务器返回数据错误`);
          } else {
            this.data = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("error: 拉取用户数据失败");
        });
    },
    dataFilter(data, search) {
      // 过滤数据，根据用户名或昵称过滤
      if (data) {
        return data.filter(item => {
          return item.nickName.match(search) || item.userName.match(search);
        });
      } else {
        return [];
      }
    },
    // 详情按钮事件
    handleEdit(index, data) {
      console.log(index, data);
      this.userInfo = null;
      this.userInfo = data;
      // 打开对话框
      this.dialogTableVisible = true;
    }
  },
  created() {
    // 请求数据
    this.getData();
  }
};
</script>


<style lang="scss" scoped>
#user-info {
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
    .btn {
        margin-top: -40px;
        padding: 0 10px;
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
    .text-of {
      width: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pagination {
      text-align: center;
      background: #fff;
      height: .5rem;
      width: 98%;
      margin: 0 auto;
      border-radius: 0 0 .135rem .135rem; 
      box-shadow:0px 1px 1px 0px rgba(76,76,76,0.68);
    }
  }
    .msg-title {
        margin-bottom: 15px;
    }
    .message {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        p {
            padding: 10px 25px;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            strong {
                display: inline-block;
                width: 150px;
            }
        }
        p:nth-child(1) {
            border-top: 1px solid #ccc;
        }
    }
}
</style>






