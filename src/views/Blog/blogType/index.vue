<template>
  <div class="app-container">
    <div>
      <el-input
        placeholder="请输入要添加的分类，左边选择分类等级"
        v-model="name"
        class="input-with-select"
      >
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option
            v-for="index in 5"
            :key="index"
            :label="index"
            :value="index"
          ></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        size="small"
        plain
        style="margin-left: 15px"
        @click="postAddType"
        >添加</el-button
      >
    </div>

    <div>
      <el-table :data="tableData" height="500" style="width: 100%" border>
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="50"
          align="center"
        >
        </el-table-column>

        <el-table-column label="博客类别" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="文章数量" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.articleCount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" align="center">
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

    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option
              v-for="index in 5"
              :key="index"
              :label="index"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmUpdata">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,
  reviseBlog,
  deleteBlogType,
  getOneBlogType,
  getBlogType,
} from "@/api/blogsort";
export default {
  data() {
    return {
      tableData: [],
      name: "",
      value: 1,
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.fetchBolgType();
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },

    // 表单回填
    async handleEdit({ id }) {
      const res = await getOneBlogType(id);
      this.form = res.data;
      this.dialogFormVisible = true;
    },
    handleDelete({ id }) {
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
          deleteBlogType(id).then((res) => {
            if (!res.code) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchBolgType();
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
    // 添加博客分类
    async postAddType() {
      console.log(this.name, this.value);
      if (this.name && this.value) {
        const res = await addBlogType({ name: this.name, order: this.value });
        if (!res.code && res.data) {
          this.$message({
            showClose: true,
            message: "分类添加成功",
            type: "success",
          });
          this.name = ''
          this.tableData.push(res.data);
        }
      } else {
        this.$message({
          showClose: true,
          message: "请填写分类等级或博客类别",
          type: "error",
        });
      }
    },
    // 获取博客分类
    async fetchBolgType() {
      const res = await getBlogType();
      this.tableData = res.data;
    },
    // 取消编辑
    cancelEdit() {
      this.dialogFormVisible = false;
    },
    //编辑分类信息
    confirmUpdata() {
      reviseBlog({
        id: this.form.id,
        data: this.form,
      }).then((res) => {
        console.log(res);
        this.$message.success("修改成功");
        this.fetchBolgType();
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>

<style>
.el-select .el-input {
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group {
  width: 40%;
}
</style>