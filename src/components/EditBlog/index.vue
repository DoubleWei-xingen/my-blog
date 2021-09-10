<template>
  <div>
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
      :options="editoroption"
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
    <el-select v-model="form.select" 
    placeholder="分类等级" 
    @change="handelChange"
    size="medium">
      <el-option
        v-for="item in blogtype"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>

    <div style="margin-top: 15px">
      <el-button type="primary" @click="publicBlog">{{buttonContent}}</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/UploadImage";
import { getBlogType } from "@/api/blogsort";
import { publishBlog ,reviseBlog,fecthBlog} from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  props: ["mode"],
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
      editoroption: {
        language: "zh-CN",
      },
      buttonContent:'发布文章'
    };
  },
  created() {
    this.fetchBlogType();
    if(this.mode === "edit"){
      this.intitBlogData()
      this.buttonContent = '确认修改'
    }
  },

  components: {
    Editor,
    Upload,
  },
  methods: {
    async fetchBlogType() {
      const { data } = await getBlogType();
      this.blogtype = data;
    },
    publicBlog() {
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
      if (
        body.title &&
        body.description &&
        body.categoryId &&
        body.htmlContent
      ) {
        if (this.mode === "add") {
          publishBlog(body).then((res) => {
            // console.log(res)
            this.$router.push("/blog/bloglist");
            this.$message.success("添加文章成功");
          });
        } else {
         reviseBlog({id:this.form.id,data:body}).then((res)=>{
          // console.log(res)
         this.$router.push('/blog/bloglist')
         this.$message.success('修改文章成功')
        })
        }
      } else {
        this.$message.error("请将文章有关信息填写完整");
      }
    },
    handelChange() {
      this.$forceUpdate();
    },
    async intitBlogData(){
    this.id = this.$route.params.id
    const {data} = await fecthBlog(this.id)
    this.$refs.toastuiEditor.invoke("setHTML",data.htmlContent);
    this.form = data
    this.form.select = data.category === null ? '' : data.category.id
    },
  },
};
</script>

<style>
.block {
  font-size: 18px;
  font-weight: bold;
}
</style>

