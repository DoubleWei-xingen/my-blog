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
    <el-table-column label="文章标题" width="180" align="center">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <el-image
            style="width: 150px;"
            :src="scope.row.thumb" 
            fit="cover"
          ></el-image>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="文章描述" width="300" align="center">
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
        <span style="margin-left: 10px">{{ scope.row.category === null ? "未分类" : scope.row.category.name}}</span>
      </template>
    </el-table-column>

    <el-table-column label="创建日期" width="200" align="center" prop="createDate" :formatter="formatData">
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
          placement="top-start"
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
</div>
 
</template>

<script>
import { fetchallBlog,deleteBlog} from "@/api/blog"
// import blogData from "@/utils/blogData"
import formatdata from '@/utils/formatData'
import { baseUrl } from "@/utils/BaseUrl"
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getallBlog();
  },
  methods: {
    handleEdit({id}) {
      this.$router.push(`/blog/editBlog/${id}`)
    },
    handleDelete(row) {
      // console.log(row);
      this.$confirm(
        "删除该分类后,此分类下的文章将变为未分类状态, 是否继续?",
        "是否删除该分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
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
      return index + 1;
    },
    async getallBlog() {
      const {data} = await fetchallBlog()
      data.rows.filter(item=>{
       item.thumb = baseUrl + item.thumb
      })
      this.tableData = data.rows
    },
    formatData(row,column,value,index){
      return formatdata(value,true)
    }
  },
};
</script>