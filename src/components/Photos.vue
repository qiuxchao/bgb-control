<template>
    <!-- 用户上传图片查询 -->
    <section id="images">
            <!-- 信息展示 -->
                <el-table :data="dataFilter(data, keyword)" 
                style="width: 100%; box-sizing: border-box; margin: .125rem auto 0; "
                max-height="7.3rem"
                height="7.1rem"
                :stripe="true"
                >
                    <el-table-column label="图片名" prop="picName"></el-table-column>
                    <el-table-column label="图片大小" prop="picSize"></el-table-column>
                    <el-table-column label="图片类型" prop="picType"></el-table-column>
                    <el-table-column label="创建时间" prop="creationTime"></el-table-column>
                    <el-table-column align="right" style="box-sizing: border-box;">
                    <template slot="header" slot-scope="scope">
                        <el-input  v-model="keyword" size="mini" placeholder="根据图片名或后缀名搜索"/>
                    </template>
                    <template slot-scope="scope">
                    <el-image fit="contain" style="margin-right: 0.6rem;margin-bottom: -0.1rem; border-radius: 2px;" :src="scope.row.picSmallPath" >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>

            <!-- 详情对话框 -->
            <el-dialog class="dialog" top="10vh" :visible.sync="showDetails">
                <h2 class="msg-title">图片详情</h2>
                <div class="message" v-if="details">
                    <p v-if="details.id"><strong>图片id : </strong>{{ details.id }}</p>
                    <p v-if="details.userId"><strong>用户id : </strong>{{ details.userId }}</p>
                    <p v-if="details.picName"><strong>图片名 : </strong>{{ details.picName }}</p>
                    <p v-if="details.picType"><strong>图片类型 : </strong>{{ details.picType }}</p>
                    <p v-if="details.picPath"><strong>图片地址 : </strong>{{ details.picPath }}</p>
                    <p v-if="details.picSize"><strong>图片大小 : </strong>{{ details.picSize }}</p>
                    <p v-if="details.fileState"><strong>图片状态 : </strong>{{ details.fileState }}</p>
                    <p v-if="details.picSmallPath"><strong>图片缩略图地址 : </strong>{{ details.picSmallPath }}</p>
                    <p v-if="details.folderId"><strong>图片文件夹id : </strong>{{ details.folderId }}</p>
                    <p v-if="details.creationTime"><strong>创建时间 : </strong>{{ details.creationTime }}</p>
                    <p v-if="details.recoveryTime"><strong>回收时间 : </strong>{{ details.recoveryTime }}</p>
                </div>
            </el-dialog>
    </section>
</template>

<script>
export default {
    name: "Photos",
    props: {
        data: Array
    },
    data() {
        return {
            search: "", // id 输入框
            keyword: "", // 文件搜索输入框
            showDetails: false, // 详情对话框开关
            details: {   // 详情对话框数据
                id: "", // 图片 id
                userId: "", // 用户 id
                picName: "",   //  文件名
                picType: "",   // 文件类型
                folderId: "",   // 文件夹id
                fileState: "",  // 图片状态
                picPath: "",   // 文件地址
                picSmallPath: "",   // 小图路径
                picSize: "",   // 文件大小
                creationTime: "",   // 创建时间 
                recoveryTime: "",   // 回收时间
            }
        }
    },
    methods: {
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
                    // 根据文件名或后缀名搜索
                    return item.picName.match(keyword) || item.picType.match(keyword);
                })
            } else {
                return [];
            }
        }
    }
}
</script>


<style lang="scss" scoped>

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
                    width: 150px;
                }
            }
            p:nth-child(1) {
                border-top: 1px solid #ccc;
            }
        }
    }

</style>





