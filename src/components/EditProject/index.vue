<template>
  <div>
    <el-form
      ref="formData"
      :label-position="labelPosition"
      label-width="80px"
      :model="formData"
      :rules="loginRules"
    >
      <el-form-item prop="name" label="项目名称">
        <el-input
          v-model="formData.name"
          placeholder="请输入项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="description"
        label="项目描述(每一项描述以英文逗号分割)"
      >
        <el-input
          v-model="formData.description"
          placeholder="请输入项目描述"
        ></el-input>
      </el-form-item>
      <el-form-item prop="url" label="项目链接">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item prop="github" label="github链接">
        <el-input v-model="formData.github"></el-input>
      </el-form-item>
      <el-form-item>
        <Upload :uploadtitle="'项目预览图'" v-model="formData.thumb" />
      </el-form-item>

      <el-form-item label="项目等级">
        <el-select v-model="formData.order" placeholder="请选择">
          <el-option v-for="item in 5" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="publishProject">{{
      buttonContent
    }}</el-button>
  </div>
</template>

<script>
import Upload from "@/components/UploadImage";

import { addProjiect, reviseProject } from "@/api/project";
export default {
  props: ["mode", "projectInfo"],
  data() {
    const validatevaule = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此项必须填写"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "top",
      buttonContent: "添加此项目",
      formData: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
      loginRules: {
        name: [{ required: true, trigger: "blur", validator: validatevaule }],
        description: [
          { required: true, trigger: "blur", validator: validatevaule },
        ],
        url: [{ required: true, trigger: "blur", validator: validatevaule }],
        github: [{ required: true, trigger: "blur", validator: validatevaule }],
      },
    };
  },
  components: {
    Upload,
  },
  created() {
    if (this.mode === "edit") {
      this.initformData();
    }
  },
  methods: {
    publishProject() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          let body = {
            ...this.formData,
            description: this.formData.description.split(","),
          };
          // console.log(body)
          if (this.mode === "add") {
            addProjiect(body)
              .then((res) => {
                if (!res.code && res.data) {
                  this.$message.success("添加成功");
                  this.formData = {};
                } else if (res.code === 406) {
                  this.$message.error(res.msg);
                }
              })
              .catch((error) => {
                const res = JSON.parse(error);
                if (res.code === 406) {
                  this.$message.error("请求错误");
                }
              });
          } else {
              const {id } = this.formData
              reviseProject(id,body).then(res=>{
                  this.$message.success('修改成功')
                  this.$emit('Isvisible')
              })
          }
        } else {
          this.$message.error("请将信息填写完整");
          return false;
        }
      });
    },
    initformData() {
      this.formData = this.projectInfo;
      this.buttonContent = "确认更改";
    },
  },
};
</script>

<style>
.el-form-item {
  margin-bottom: 5px;
}
.el-form--label-top .el-form-item__label {
  font-weight: bold;
  color: rgb(16, 16, 17);
  padding: 0;
}
.el-input {
  width: 70%;
}
</style>