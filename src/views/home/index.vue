<template>
  <div class="app-contanier">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="100"
        align="center"
      >
      </el-table-column>

      <el-table-column label="标题" width="200" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标语" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="大图预览" width="350" align="center" z>
        <template slot-scope="scope">
          <el-image
            style="width: 200px; height: 100px"
            :src="scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="小图预览" width="350" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 200px; height: 100px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
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
              @click="editBannerHandel(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编弹出框 -->
    <el-dialog title="设置首页信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <Upload :uploadtitle="'大图预览'" v-model="form.bigImg" />
          </el-col>
          <el-col :span="12">
            <Upload :uploadtitle="'小图预览'" v-model="form.midImg" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editBannerCancel">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import { fetchBanner, setBanner } from "@/api/banner"
import BannerData from "@/utils/bannerData"

import Upload from "@/components/UploadImage"
import { baseUrl } from "@/utils/BaseUrl"
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        bigImg: "",
        description: "",
        midImg: "",
        title: "",
        id: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    Upload,
  },
  created() {
    this.getBanner();
  },
  methods: {
    async getBanner() {
      // const res = await setBanner(BannerData);
      // console.log(res);
      const { data } = await fetchBanner();
      data.filter((item) => {
        if(!item.bigImg.includes(baseUrl) && item.bigImg.includes('/static')){
          item.bigImg = baseUrl + item.bigImg
        } else if(!item.midImg.includes(baseUrl) && item.midImg.includes('/static')){
          item.midImg = baseUrl + item.midImg
        }
      });
      this.tableData = data;
    },
    indexMethod(index) {
      return index + 1;
    },
    editBannerHandel(scope) {
      this.form = { ...scope };
      this.dialogFormVisible = true;
    },
    editBannerCancel() {
      this.dialogFormVisible = false;
    },
    editBannerConfirm() {
      const newBannerData = this.tableData.map((item) => {
        if (item.id === this.form.id) {
          item = this.form;
        }
        return item;
      });
      setBanner(newBannerData).then((res) => {
        if (!res.code && res.data) {
          this.dialogFormVisible = false;
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.getBanner()
        }
      });
    },
  },
};
</script>
<style>
</style>