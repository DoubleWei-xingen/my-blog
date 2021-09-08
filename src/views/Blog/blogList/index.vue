<template>
<div class="app-contanier">
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
        <el-popover trigger="hover" placement="bottom">
          <el-image
            style="width: 200px; height: 200px"
            :src="scope.row.thumb"
            fit="fit"
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
        <span style="margin-left: 10px">{{ scope.row.category.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="创建日期" width="300" align="center" prop="createDate" :formatter="formatData">
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
            @click="handleEdit(scope.$index, scope.row)"
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
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</div>
 
</template>

<script>
import { fetchallBlog, publishBlog } from "@/api/blog"
import blogData from "@/utils/blogData"
import formatdata from '@/utils/formatData'
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    indexMethod(index) {
      return index + 1;
    },
    async getallBlog() {
      // const data = await publishBlog(blogData)
      // console.log(data)
      // const res = await fetchallBlog()
      // console.log(res)
      this.tableData.push(blogData[0].data);
    },
    formatData(row,column,value,index){
      
      return formatdata(value,true)
    }
  },
};
</script>