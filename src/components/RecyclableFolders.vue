<template>
    <!-- 回收站文件表格 -->
    <section id="folders">
        <el-table :data="dataFilter(data, keyword)" 
            style="width: 100%; margin: .125rem auto 0;"
            max-height="7.3rem"
            height="7.1rem"
            :stripe="true" >
            <el-table-column label="文件夹名" prop="folderName"></el-table-column>
            <el-table-column label="文件夹状态" prop="fileState"></el-table-column>
            <el-table-column label="文件夹id" prop="id"></el-table-column>
            <el-table-column label="回收时间" prop="recoveryTime"></el-table-column>
            <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input  v-model="keyword" size="mini" placeholder="根据文件夹名"/>
            </template>
            <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 详情对话框 -->
        <el-dialog class="dialog" top="10vh" :visible.sync="showDetails">
            <h2 class="msg-title">文件夹详情</h2>
            <div class="message" v-if="details">
                <p v-if="details.id"><strong>文件夹id : </strong>{{ details.id }}</p>
                <p v-if="details.userId"><strong>用户id : </strong>{{ details.userId }}</p>
                <p v-if="details.folderName"><strong>文件夹名 : </strong>{{ details.folderName }}</p>
                <p v-if="details.folderPath"><strong>文件夹地址 : </strong>{{ details.folderPath }}</p>
                <p v-if="details.fileState"><strong>文件夹状态 : </strong>{{ details.fileState }}</p>
                <p v-if="details.creationTime"><strong >创建时间 : </strong>{{ details.creationTime }}</p>
                <p v-if="details.recoveryTime"><strong >回收时间 : </strong>{{ details.recoveryTime }}</p>
            </div>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: "Floders",
    props: {
        data: Array
    },
    data() {
        return {
            keyword: "",
            showDetails: false,
            details: {
                folderPath: "",
                creationTime: "",
                fileState: "",
                folderName: "",
                id: "",
                userId: "",
                recoveryTime: ""
            }
        }
    },
    methods: {
        // 详情按钮
        handleEdit(index, data) {
            console.log(index, data);
            // 详情
            this.details = null;
            this.details = data;
            this.showDetails = true;
        },
        dataFilter(data, keyword) {
            if(data) {
                return data.filter(item => {
                    // 根据文件名后后缀名搜索
                    return item.folderName.match(keyword);
                })
            } else {
                return [];
            }
        },
    }
}
</script>


<style lang="scss" scoped>
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
</style>




