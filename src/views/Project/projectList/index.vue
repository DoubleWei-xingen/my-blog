<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      v-loading="isloading"
      highlight-current-row
      border
    >
      <el-table-column
        label="序号"
        width="60"
        align="center"
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column align="center" label="项目名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目描述">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="预览图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.thumb"
            fit="fit"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="GitHub"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="info"
              icon="el-icon-guide"
              circle
              @click="handletoGithub(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="handleEditProject(scope.row)"
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
              @click="handleDeleteProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :modal="false"
      title="更改项目信息"
      fullscreen
      :visible.sync="dialogFormVisible"
    >
      <EditProject mode="edit" :projectInfo="info" @Isvisible="edittableData"/>
    </el-dialog>
  </div>
</template>

<script>
import EditProject from "@/components/EditProject"

import { fetchProject,deleteProject} from "@/api/project"
import { baseUrl } from "@/utils/BaseUrl"
export default {
  data() {
    return {
      tableData: [],
      isloading: false,
      srcList: [],
      dialogFormVisible: false,
      info:{}
    };
  },
  components: {
    EditProject,
  },
  created(){
    this.inittableData()
  },
  methods: {
    handletoGithub({github}) {
      window.open(github)
    },
    indexMethod(index) {
      return index + 1;
    },
    handleEditProject(row) {
      this.dialogFormVisible = true
      this.info = {...row}
    },
    handleDeleteProject({id}) {
       this.$confirm('此操作将永久删除该项目, 是否继续?', '删除项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProject(id).then(()=>{
            this.$message({
            type: 'success',
            message: '删除成功!'
            })
            this.inittableData()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
    },
    async inittableData(){
    const {data} = await fetchProject()
    data.filter(item =>{
      // console.log(item)
      item.thumb = baseUrl + item.thumb
      item.description = item.description.toString()
      this.srcList.push(item.thumb)
      return item
    }) 
    this.tableData = data
    },
     edittableData(){
      this.inittableData()
      this.dialogFormVisible = false
    }
  },
};
</script>

<style>
.el-dialog__header {
  padding: 10px 0px 10px 10px;
}
.el-dialog__body {
  padding: 10px 10px 0px 10px;
}
</style>