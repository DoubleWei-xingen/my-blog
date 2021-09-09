<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input placeholder="请输入标题" v-model="form.title"> </el-input>
    </div>

    <div class="block">文章编辑</div>
    <Editor
      class="block"
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="400px"
    />

    <div class="block" style="margin-top: 15px">文章描述</div>
    <div style="margin-bottom: 15px">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入文章的的描述信息"
        v-model="form.description"
      >
      </el-input>
    </div>
    <div style="margin-bottom: 15px">
      <Upload uploadtitle="文章头图" v-model="form.thumb" />
    </div>
    <div class="block">选择分类</div>
    <el-select 
    @change="handelChange"
    v-model="form.select" 
    placeholder="分类等级" 
    size="medium">
      <el-option
        v-for="item in blogtype"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>

    <div style="margin-top: 15px">
      <el-button type="primary" @click="editBlog">发布文章</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css"
import { Editor } from "@toast-ui/vue-editor"
import Upload from "@/components/UploadImage"
import { getBlogType } from "@/api/blogsort"
import {fecthBlog,reviseBlog} from '@/api/blog'

export default {
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      blogtype: [],
      id:""
    };
  },
  created() {
    this.fetchBlogType();
  },

  components: {
    Editor,
    Upload,
  },
  methods: {
    async fetchBlogType() {
      const { data } = await getBlogType()
      this.blogtype = data
      this.intitBlogData()
    },
    editBlog() {
      let htmlContent = this.$refs.toastuiEditor.invoke("getHTML");
      let markdownContent = this.$refs.toastuiEditor.invoke("getMarkdown");

      let body = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: htmlContent,
        thumb: this.form.thumb,
        markdownContent: markdownContent,
      };
      // console.log(body)
      if(body.title && body.description && body.categoryId && body.htmlContent){
        reviseBlog({id:this.form.id,data:body}).then((res)=>{
          // console.log(res)
         this.$router.push('/blog/bloglist')
         this.$message.success('修改文章成功')
        })
      } else {
        this.$message.error('请将文章有关信息填写完整')
      }
    },
    async intitBlogData(){
    this.id = this.$route.params.id
    const {data} = await fecthBlog(this.id)
    this.$refs.toastuiEditor.invoke("setHTML",data.htmlContent);
    this.form = data
    this.form.select = data.category === null ? '' : data.category.id
    },
    handelChange(){
      this.$forceUpdate()
    }
  },
};
</script>

<style>
.block {
  font-size: 18px;
  font-weight: bold;
}
</style>

