<template>
  <div class="categoryList">
    <section>
      <el-row>
        <h3 style="font-size: 20px;font-weight: bold;color: #000000">分类管理</h3>
        <br>
        <el-col :span="24">
          <!--表格-->
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center">
            </el-table-column>
            <el-table-column prop="essay_category_num" label="编号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="category_name" label="分类名称" width="200" align="center">
            </el-table-column>
            <el-table-column prop="type_name" label="文章类型" width="200" align="center">
            </el-table-column>
            <el-table-column prop="catg_status" label="状态" width="200" align="center">
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block" style="text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
      <el-row>
        <el-col style="margin-top: 20px">
          <el-button type="primary" @click="addType">新增</el-button>
          <el-button @click="handleDeletes">删除</el-button>
        </el-col>
      </el-row>
    
      <el-dialog title="修改类型信息" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="form.category_name"></el-input>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="form.type_name" placeholder="请选择文章类型" style="width: 200px;" @change="changeValue">
              <el-option v-for="(item,index) of selectData" :label=item.Name :value=item.Name :key="item.Code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.catg_status" placeholder="请选择状态" style="width: 200px;" @change="editChangeStatus">
              <el-option label="有效" value=1></el-option>
              <el-option label="无效" value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editHandleSave" :loading="editLoading">确定</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="新增类型信息" :visible.sync="addFormVisible">
        <el-form ref="form_add" :model="form_add" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="form_add.category_name"></el-input>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="form_add.type_name" placeholder="请选择文章类型" style="width: 200px;" @change="addChangeValue">
              <el-option v-for="(item,index) of selectData" :label=item.Name :value=item.Name :key="item.Code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="status" placeholder="请选择状态" style="width: 200px;" @change="addChangeStatus">
              <el-option label="有效" value=1></el-option>
              <el-option label="无效" value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addHandleSave" :loading="editLoading">确定</el-button>
            <el-button @click="addFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </section>
  </div>
</template>

<script>
  export default {
    name: "categoryList",
    components: {},
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        multipleDelete: [],
        status: "",
        selectData: [],
        dialogFormVisible: false,
        addFormVisible: false,
        editLoading: false,
        form: {
          category_name: "",
          category_code: "",
          type_name: "",
          type_code: "",
          catg_status: "",
        },
        form_add: {
          category_name: "",
          type_name: "",
          type_code: "",
          category_status: "",
        },
        table_index: 999,
        page:0,
        limit:10,
        currentPage:1,
        total: 20,
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      //获取分类列表
      this.getClassifyList();
      //获取新增、编辑弹出框下拉列表
      this.$axios({
        method: "GET",
        url: `${this.$baseURL}/v1/resource/search?type=essay_type`
      })
        .then(res => {
          this.selectData = res.data.info;
        })
        .catch(error => {
          this.selectData = [];
        });
    },
    watch: {},
    computed: {},
    methods: {
      handleSizeChange(val) {
        this.limit=val;
        this.getClassifyList()
      },
      handleCurrentChange(val) {
        this.page=val-1;
        this.getClassifyList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //获取分类列表
      getClassifyList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/essay-catg?page=${this.page}&limit=${this.limit}`
        })
          .then(res => {
            this.tableData = res.data.info;
            this.total = res.data.count;
            this.tableData =this.$_.map(this.tableData,function (o) {
              if(o.catg_status===1){
                o.catg_status="有效"
              }else {
                o.catg_status="无效"
              }
              return o
            });
          })
          .catch(error => {
            this.tableData = [];
          });
      },
      addType() {
        this.form_add.category_name = "";
        this.form_add.category_name = "";
        this.form_add.type_name = "";
        this.form_add.type_code = "";
        this.form_add.category_status = "";
        this.status = "";
        this.addFormVisible = true;
      },
      addChangeValue() {
        var that = this;
        var addSelect = this.$_.find(this.selectData, function (o) {
          return o.Name === that.form_add.type_name
        });
        this.form_add.type_code = addSelect.Code;
      },
      addChangeStatus() {
        this.form_add.category_status = this.status;
      },
      addHandleSave() {
        this.$confirm("确认提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel"
        }).then(() => {
          this.editLoading = true;
          var token = JSON.parse(sessionStorage.myLogin).token;
          var data = "category_name=" + this.form_add.category_name + "&type_name=" + this.form_add.type_name + "&type_code=" +
            this.form_add.type_code + "&category_status=" + this.form_add.category_status;
          this.$axios({
            method: "POST",
            url: `${this.$baseURL}/v1/essay-catg`,
            data: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Access-Token": token
            }
          }).then((res) => {
            this.getClassifyList();
            this.editLoading = false;
            this.addFormVisible = false;
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          }).catch(err => {
            console.log(err)
          });
        })
          .catch(() => {
          });
      },
      handleDelete(index, row) {
        var token = JSON.parse(sessionStorage.myLogin).token;
        this.$axios({
          method: "DELETE",
          url: `${this.$baseURL}/v1/essay-catg/${row._id}`,
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
        if(multipleDelete.length===0){return}
        var multipleData = JSON.stringify({ids: multipleDelete});
        var token = JSON.parse(sessionStorage.myLogin).token;
        var that = this;
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/essay-catg/delete-batch`,
          data: multipleData,
          headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json"
          }
        }).then((res) => {
          that.getClassifyList();
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
      },
      changeValue() {
        var that = this;
        var editSelect = this.$_.find(this.selectData, function (o) {
          return o.Name === that.form.type_name
        });
        this.form.type_code = editSelect.Code;
      },
      editChangeStatus(){
      
      },
      editHandleSave() {
        this.$confirm("确认提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel"
        }).then(() => {
          this.editLoading = true;
          var id = this.form._id;
          var token = JSON.parse(sessionStorage.myLogin).token;
          var data = {};
          data.category_name = this.form.category_name;
          data.category_code = this.form.category_code;
          data.type_name = this.form.type_name;
          data.type_code = this.form.type_code;
          data.catg_status =Number(this.form.catg_status);
          this.$axios({
            method: "PUT",
            url: `${this.$this.$baseURL}/v1/essay-catg/${id}`,
            data: data,
            headers: {
              "Content-Type": "application/json",
              "X-Access-Token": token
            }
          }).then((res) => {
            if(this.form.catg_status==="1"){
              this.form.catg_status="有效"
            }else{
              this.form.catg_status="无效"
            }
            this.tableData.splice(this.table_index, 1, this.form);
            this.editLoading = false;
            this.dialogFormVisible = false;
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          });
        })
          .catch((err) => {
          });
      },
    }
  }
</script>

<style scoped lang="stylus">
  .categoryList {
    .el-pagination {
      text-align: center;
      margin-top: 30px;
    }
  
    .el-message-box__btns .cancel {
      float: right;
      margin-left: 10px;
    }
  }
</style>
