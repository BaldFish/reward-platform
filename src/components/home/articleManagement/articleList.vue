<template>
  <div class="articleList">
    <div class="list_wrap">
      <div>
        <h3 style="font-size: 20px;font-weight: bold;color: #000000">文章管理</h3>
        <br>
        <span>分类：</span>
        <el-select v-model="select_value" clearable placeholder="请选择" @change="changeValue">
          <el-option v-for="item in selectData" :key="item.category_code" :label="item.category_name" :value="item.essay_category_num">
          </el-option>
        </el-select>
        <span>名称：</span>
        <el-input v-model="title" placeholder="请输入标题" clearable style="width: 220px"></el-input>
        <el-button @click="toggleSelection()">搜索</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center">
        </el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.essay_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章类型" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.category_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章标题" width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.show_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size=5
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
      <div style="margin-top: 20px">
        <router-link to="/home/articleManagement/addArticle">
          <el-button type="primary">新增</el-button>
        </router-link>
        <el-button @click="handleDeletes">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "articleList",
    components: {},
    data() {
      return {
        tableData: [],
        selectData: [],
        select_value: "",
        title: "",
        multipleSelection: [],
        multipleDelete: [],
        loading: false,
        currentPage: 1,
        total: 10,
        page: 0,
        limit: 5
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      //获取下拉列表文章类型
      this.$axios({
        method: "GET",
        url: `${this.$baseURL}/v1/essay-catg/all`
      })
        .then(res => {
          this.selectData = res.data;
        })
        .catch(error => {
          this.selectData = [];
        });
      //获取文章列表
      this.getArticleList()
    },
    watch: {},
    computed: {},
    methods: {
      handleSizeChange(val) {
        this.limit = val;
        this.getArticleList()
      },
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getArticleList()
      },
      getArticleList() {
        if (this.select_value === "" && this.title !== "") {
          this.$layer.alert("请选择搜索类型！", {
            shadeClose: false,
            title: "提示框"
          });
          return;
        } else if (this.select_value === "" && this.title === "") {
          this.$axios({
            method: "GET",
            url: `${this.$baseURL}/v1/essay?page=${this.page}&limit=${this.limit}&essay_catg=${this.select_value}`
          })
            .then(res => {
              this.tableData = res.data.info;
              this.total = res.data.count;
            })
            .catch(error => {
              this.tableData = [];
            });
        } else {
          this.$axios({
            method: "GET",
            url: `${this.$baseURL}/v1/essay/search?page=${this.page}&limit=${this.limit}&essay_catg=${this.select_value}&title=${this.title}`
          })
            .then(res => {
              this.tableData = res.data.info;
              this.total = res.data.count;
            })
            .catch(error => {
              this.tableData = [];
            });
        }
      },
      changeValue() {
        this.page = 0;
        this.currentPage = 1;
        this.getArticleList()
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        var token = JSON.parse(sessionStorage.myLogin).token;
        this.$axios({
          method: "DELETE",
          url: `${this.$baseURL}/v1/essay/${row._id}`,
          headers: {
            "X-Access-Token": token
          }
        }).then((res) => {
          this.tableData.splice(index, 1);
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      handleDeletes() {
        var multipleDelete = this.$_.map(this.multipleSelection, function (item) {
          return item._id
        });
        if (multipleDelete.length === 0) {
          return
        }
        var multipleData = JSON.stringify({ids: multipleDelete});
        var token = JSON.parse(sessionStorage.myLogin).token
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/essay/delete-batch`,
          data: multipleData,
          headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json"
          }
        }).then((res) => {
          this.getArticleList();
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // remoteMethod(query) {
      //   if (query !== "") {
      //     this.loading = true;
      //     setTimeout(() => {
      //       this.loading = false;
      //       this.options4 = this.list.filter(item => {
      //         return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
      //       });
      //     }, 200);
      //   } else {
      //     this.options4 = [];
      //   }
      // }
    }
  }
</script>

<style scoped lang="stylus">
  .articleList {
    .list_wrap{
      margin 0 auto
    }
  }
</style>
