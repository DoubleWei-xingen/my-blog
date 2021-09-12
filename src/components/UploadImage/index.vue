<template>
  <div class="upload-container">
    <!-- 上传标题 -->
    <div class="upload-title">{{ uploadtitle }}</div>

    <!-- 图片展示 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  
import { getToken} from '@/utils/auth'
import  {baseUrl}  from '@/utils/BaseUrl'
export default {
  // props: {
  //   uploadtitle: {
  //     required: true,
  //     type: String,
  //   },
  //   value:{
  //     type: String,
  //   },
  // },
  props:['uploadtitle',"value"],
  created(){
    console.log(this.value)
  },
  computed:{
    imageUrl(){
      if(this.value.includes(baseUrl) || !this.value.includes('/static')){
        return this.value
      } else {
        return baseUrl + this.value
      }
    },
    headers(){
      return {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  methods: {
      handleAvatarSuccess(res) {
        console.log(res);
        console.log(this.value)
        if(!res.code && res.data){
          this.$emit('input',res.data)
        }
      },
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-title{
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
}
.upload-container{
    display: flex;
}
</style>