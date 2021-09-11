<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        align="center"
        width="50"
      >
      </el-table-column>

      <el-table-column
        class-name="overflowContent"
        label="头像"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-avatar size="medium" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
        class-name="overflowContent"
        show-overflow-tooltip
        label="昵称"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        align="center"
        width="200"
        prop="createDate"
        :formatter="formatData"
      >
        <!-- <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
      </template> -->
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top-start"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 30px"></div>
    <el-pagination 
    background 
    :page-size="limit"
    :page-sizes="[2,6,8]"
    layout="prev, pager, next,total ,->,sizes,jumper" 
    :total="count"
    @size-change="pageChangehandel"
    @current-change="curentPagehandel"
    @prev-click="prevClick"
    @next-click="nextClick"
  >
    </el-pagination>
  </div>
</template>

<script>
import { deleteMessage, fetchMessage } from "@/api/message"
// import blogData from "@/utils/blogData"
import formatdata from "@/utils/formatData"
import { baseUrl, linkUrl } from "@/utils/BaseUrl"
export default {
  data() {
    return {
      tableData: [],
      srclist: [],
      count:0,
      curentPage:1,
      limit:2, 
      totalPage:0
    };
  },
  created() {
    this.getallMessages();
  },
  methods: {
    handleDelete(row) {
      // console.log(row);
      this.$confirm("是否删除该留言", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMessage(row.id).then((res) => {
            // console.log(res)
            if (!res.code) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getallMessages();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    indexMethod(index){
      return index + (this.curentPage - 1) * this.limit + 1;
    },
    async getallMessages(){
      const { data } = await fetchMessage(this.curentPage,this.limit)
      console.log(data)
      data.rows.filter((item) => {
        item.avatar = baseUrl + item.avatar;
        this.srclist.push(item.avatar);
      });
      this.tableData = data.rows
      this.count = parseInt(data.total) 
      this.totalPage = Math.ceil( data.total / this.limit)
      if(this.curentPage > this.totalPage){
        this.curentPage = this.totalPage
        this.getallMessages()
      }
    },
    formatData(row, column, value, index) {
      return formatdata(value, true);
    },
    pageChangehandel(pagesize){
        this.limit = pagesize
        this.curentPage = 1
       this.getallMessages()
    },
    curentPagehandel(pagenum){
      this.curentPage = parseInt(pagenum)
      this.getallMessages()
    },
    prevClick(){
      this.curentPage -= 1
     
    },
    nextClick(){
      this.curentPage += 1
    }
  },
};
</script>

<style>
.overflowContent {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>