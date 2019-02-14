<template>
  <div class="addArticle">
    <div>
      <router-link to="/home/articleManagement/articleList">
        <h3 style="font-size: 20px;font-weight: bold;color: #000000">返回列表</h3>
        <br>
      </router-link>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <el-form-item label="类型：" prop="category_code">
          <el-select v-model="ruleForm.category_code" placeholder="请选择文章类型" style="width: 200px;" @change="changeValue">
            <el-option v-for="(item,index) of article_type" :label=item.category_name :value=item.category_code :key="item.category_code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题：" prop="title">
          <el-input v-model="ruleForm.title" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="显示时间：" required>
          <el-col :span="11">
            <el-form-item prop="show_time">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.show_time" style="width: 200px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="图片地址:">
          <el-input v-model="ruleForm.picture_url" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="essay_status">
          <el-radio-group v-model="ruleForm.essay_status">
            <el-radio :label=1>有效</el-radio>
            <el-radio :label=2>无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <div class="components-container">
            <div class="editor-container">
              <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item label="上传图片:">
          <el-upload action="http://wallet-api-test.launchain.org:50000/v1/file" list-type="picture-card" :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove" name="uploadfile">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <img :src="select_imgUrl" alt="" style="height:145px;width:200px;display: block;margin-bottom: 10px;border: 1px solid #c0ccda">
                <input style="width: 130px;" type="text" id="contents" class="copy_btn" v-model=select_imgUrl>
                <el-button style="width: 60px; padding: 10px 5px" type="primary" round @click="jsCopy">复制</el-button>
              </div>
            </el-col>
            <el-col :span="18">
              <ul>
                <li style="display: inline-block;height: 145px;width: 200px" v-for="(item,index) of img_list" :key="index">
                  <img :src="'http://'+item.furl" alt="" style="display: inline-block;height: 145px;width: 200px;cursor:pointer "
                       @click="getImgUrl($event)">
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import UE from "@/components/home/ue/ue";
  
  export default {
    name: "addArticle",
    components: {UE},
    data() {
      return {
        token: "",
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Access-Token': this.token
        },
        select_imgUrl: "",
        img_list: [],
        article_type: [],
        ruleForm: {
          category_name: "",
          category_code: "",
          title: "",
          show_time: "",
          picture_url: "",
          essay_status: 0,
          content: "",
          delivery: false
        },
        rules: {
          category_code: [{required: true, message: "请选择类型", trigger: "change"}],
          title: [
            {required: true, message: "请输入文章标题", trigger: "blur"},
            {min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"}
          ],
          show_time: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ],
          essay_status: [
            {required: true, message: "请选择状态", trigger: "change"}
          ],
          content: [{required: true, message: "请填写内容", trigger: "blur"}, {min: 1, message: "长度在 1 到 50 个字符", trigger: "blur"}]
        },
        defaultMsg: "",
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350,
        },
        dialogImageUrl: "",
        dialogVisible: false,
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.token = JSON.parse(sessionStorage.myLogin).token;
      //获取下拉列表文章类型
      this.$axios({
        method: "GET",
        url:
          `${this.$baseURL}/v1/essay-catg/all`
      })
        .then(res => {
          this.article_type = res.data;
        })
        .catch(error => {
          this.article_type = [];
        });
      //获取服务器图片列表
      this.$axios({
        method: "GET",
        url: `${this.$baseURL}/v1/file/search?type=1`
      })
        .then(res => {
          this.img_list = res.data.info;
        })
        .catch(error => {
          this.img_list = [];
        });
    },
    watch: {},
    computed: {},
    methods: {
      changeValue() {
        var that = this;
        var select_article_type = this.$_.find(this.article_type, function (o) {
          return o.category_code === that.ruleForm.category_code
        });
        this.ruleForm.category_name = select_article_type.category_name;
      },
      getImgUrl() {
        this.select_imgUrl = event.target.src;
      },
      submitForm(formName) {
        this.getUEContent();
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.ruleForm.show_time = this.$utils.formatDate(
              new Date(this.ruleForm.show_time),
              "yyyy-MM-dd"
            );
            var data = {
              category_name: this.ruleForm.category_name,
              category_code: this.ruleForm.category_code,
              title: this.ruleForm.title,
              show_time: this.ruleForm.show_time,
              picture_url: this.ruleForm.picture_url,
              essay_status: this.ruleForm.essay_status,
              content: this.ruleForm.content
            };
            /*var
              data="category_name="+this.ruleForm.category_name+"&category_code="+this.ruleForm.category_code+"&title="+this.ruleForm.title+"&show_time="+this.ruleForm.show_time+"&picture_url="+this.ruleForm.picture_url+"&essay_status="+this.ruleForm.essay_status+"&content="+this.ruleForm.content;*/
            this.$axios({
              method: 'post',
              url: `${this.$baseURL}/v1/essay`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Access-Token': this.token,
              },
              data: data,
            }).then(res => {
              this.ruleForm.show_time = "";
              this.$layer.alert("新增成功！", {
                shadeClose: false,
                title: "提示框"
              });
            }).catch(err => {
              this.ruleForm.show_time = "";
              
            })
          } else {
            this.ruleForm.show_time = "";
            this.$layer.alert("新增失败！", {
              shadeClose: false,
              title: "提示框"
            });
            return false;
          }
        });
      },
      resetForm() {
        this.ruleForm.category_name = "";
        this.ruleForm.category_code = ""
        this.ruleForm.title = ""
        this.ruleForm.show_time = ""
        this.ruleForm.picture_url = ""
        this.ruleForm.essay_status = 0;
        this.ruleForm.content = ""
        this.$refs.ue.editor.setContent("")
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.ruleForm.content = content;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      jsCopy() {
        var e = document.getElementById("contents"); //对象是contents
        e.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
      }
    },
  }
</script>

<style scoped lang="stylus">
  .addArticle {
    input[type=file] {
      display: none;
    }
    
    .copy_btn {
      display: inline-block;
      outline: none
    }
  }
</style>
