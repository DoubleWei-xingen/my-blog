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
        show-overflow-tooltip
        label="文章标题"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="right"
            :offset="200"
            width="230"
            title="博客预览图"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="cover"
              :preview-src-list="srclist"
            ></el-image>
            <div slot="reference" class="name-wrapper">
              <a
                href="#"
                target="_blank"
                size="medium"
                @click.prevent="handelToTitle(scope.row)"
                >{{ scope.row.title }}</a
              >
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        class-name="overflowContent"
        show-overflow-tooltip
        label="文章描述"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="浏览数" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.scanNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评论量" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.commentNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属分类" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.category === null ? "未分类" : scope.row.category.name
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="创建日期"
        width="200"
        align="center"
        prop="createDate"
        :formatter="formatData"
      >
        <!-- <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
      </template> -->
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
            ></el-button>
          </el-tooltip>

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
    :page-sizes="[2,4,5]"
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
import { fetchallBlog, deleteBlog } from "@/api/blog";
// import blogData from "@/utils/blogData"
import formatdata from "@/utils/formatData";
import { baseUrl, linkUrl } from "@/utils/BaseUrl";
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
    this.getallBlog();
  },
  methods: {
    handleEdit({ id }) {
      this.$router.push(`/blog/editBlog/${id}`);
    },
    handleDelete(row) {
      // console.log(row);
      this.$confirm("是否删除篇文章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteBlog(row.id).then((res) => {
            // console.log(res)
            if (!res.code) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getallBlog();
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
    indexMethod(index) {
      return index + (this.curentPage - 1) * this.limit + 1;
    },
    async getallBlog() {
      const { data } = await fetchallBlog(this.curentPage,this.limit)
      data.rows.filter((item) => {
        item.thumb = baseUrl + item.thumb;
        this.srclist.push(item.thumb);
      });
      this.tableData = data.rows
      this.count = parseInt(data.total) 
      this.totalPage = Math.ceil( data.total / this.limit)
      if(this.curentPage > this.totalPage){
        this.curentPage = this.totalPage
        this.getallBlog()
      }
    },
    formatData(row, column, value, index) {
      return formatdata(value, true);
    },
    handelToTitle({ id }) {
      window.open(`${linkUrl}/article/${id}`);
    },
    pageChangehandel(pagesize){
      this.limit = pagesize
      this.curentPage = 1
      this.getallBlog()
    },
    curentPagehandel(pagenum){
      this.curentPage = parseInt(pagenum)
      this.getallBlog()
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