<template>
    <!-- 已经回收的文件表格 -->
    <section id="recyclable">
        <el-table :data="dataFilter(data, keyword)" 
            style="width: 100%; margin: .125rem auto 0;"
            max-height="7.3rem" 
            height="7.1rem"
            :stripe="true" >
            <el-table-column label="文件名" prop="docName"></el-table-column>
            <el-table-column label="文件类型" prop="docType"></el-table-column>
            <el-table-column label="文件大小" prop="docSize"></el-table-column>
            <el-table-column label="文件状态" prop="fileState"></el-table-column>
            <el-table-column label="回收时间" prop="recoveryTime"></el-table-column>
            <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input  v-model="keyword" size="mini" placeholder="根据文件名或后缀名搜索"/>
            </template>
            <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 详情对话框 -->
        <el-dialog class="dialog" top="10vh" :visible.sync="showDetails">
            <h2 class="msg-title">文件详情</h2>
            <div class="message" v-if="details">
                <p v-if="details.id"><strong>文件id : </strong>{{ details.id }}</p>
                <p v-if="details.userId"><strong>用户id : </strong>{{ details.userId }}</p>
                <p v-if="details.docName"><strong>文件名 : </strong>{{ details.docName }}</p>
                <p v-if="details.docType"><strong>文件类型 : </strong>{{ details.docType }}</p>
                <p v-if="details.docPath"><strong>文件地址 : </strong>{{ details.docPath }}</p>
                <p v-if="details.docSize"><strong>文件大小 : </strong>{{ details.docSize }}</p>
                <p v-if="details.fileState"><strong>文件状态 : </strong>{{ details.fileState }}</p>
                <p v-if="details.creationTime"><strong >创建时间 : </strong>{{ details.creationTime }}</p>
                <p v-if="details.recoveryTime"><strong>回收时间 : </strong>{{ details.recoveryTime }}</p>
            </div>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: "RecyclableFiles",
    props: {
        data: Array
    },
    data() {
        return {
            keyword: "",
            showDetails: false,
            details: {
                id: "",
                docName: "",
                docPath: "",
                docType: "",
                userId: "",
                folderId: "",
                fileState: "",
                docSize: "",
                creationTime: "",
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
                    return item.docName.match(keyword) || item.docType.match(keyword);
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




