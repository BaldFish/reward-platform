<template>
  <div class="bannerList">
    <section>
      <el-row>
        <h3 style="font-size: 20px;font-weight: bold;color: #000000">广告轮播管理</h3>
        <br>
        <el-col :span="24">
          <!--表格-->
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @filter-change="handleFilterChange">
            <el-table-column type="selection" align="center">
            </el-table-column>
            <el-table-column prop="broadcast_num" label="编号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="150" align="center">
            </el-table-column>
            <el-table-column prop="show_type_value" label="显示类型" width="150" align="center"
                             :filters="selectData"
                             column-key="_id">
            </el-table-column>
            <el-table-column prop="rank" label="排序" width="50" align="center">
            </el-table-column>
            <el-table-column prop="bc_status" label="状态" width="50" align="center">
            </el-table-column>
            <el-table-column prop="link_url" label="链接地址" width="300" align="center">
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="small">
                  <router-link :to="{ name: 'addBanner', query: { id: scope.row._id }}">
                    编辑
                  </router-link>
                </el-button>
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
          <router-link to="/home/systemManagement/addBanner"><el-button type="primary">新增</el-button></router-link>
          <el-button @click="handleDeletes">删除</el-button>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  export default {
    name: "bannerList",
    components: {},
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        multipleDelete: [],
        status: "",
        selectData: [],
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
        url: `${this.$baseURL}/v1/resource/search?type=show_type`
      })
        .then(res => {
          res.data.info.forEach((data)=>{
            this.selectData.push({text: data.Name, value: data._id })
          })
        })
        .catch(error => {
          this.selectData = [];
        });
    },
    watch: {},
    computed: {},
    
    methods: {
      //分页
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
      //显示类型下拉筛选
      handleFilterChange(filters){
        this.tableData = [];
        if(filters._id[0]){
          this.$axios({
            method: "GET",
            url: `${this.$baseURL}/v1/broadcast/s?type_id=${filters._id[0]}`
          }).then(res => {
            this.tableData = res.data;
            this.total = res.data.count;
            this.tableData =this.$_.map(this.tableData,function (o) {
              if(o.bc_status===1){
                o.bc_status="有效"
              }else {
                o.bc_status="无效"
              }
              return o
            });
          })
            .catch(error => {
              this.tableData = [];
            });
        }else {
          this.getClassifyList()
        }
      
      },
      //获取表格数据
      getClassifyList() {
        this.tableData = [];
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/broadcast?page=${this.page}&limit=${this.limit}`
        }).then(res => {
          for(var key in res.data.info) {
            this.tableData = this.tableData.concat(res.data.info[key])
          }
          this.total = res.data.count;
          this.tableData =this.$_.map(this.tableData,function (o) {
            if(o.bc_status===1){
              o.bc_status="有效"
            }else {
              o.bc_status="无效"
            }
            return o
          });
        })
          .catch(error => {
            this.tableData = [];
          });
      },
    
      //删除单个
      handleDelete(index, row) {
        this.$confirm('确认删除此条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
          var token = JSON.parse(sessionStorage.myLogin).token
          this.$axios({
            method: "DELETE",
            url: `${this.$baseURL}/v1/broadcast/${row._id}`,
            headers: {
              "X-Access-Token": token
            }
          }).then((res) => {
            this.tableData.splice(index, 1);
            this.getClassifyList();
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          }).catch((err) => {
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      
      },
    
      //删除多个
      handleDeletes() {
        this.$confirm('确认删除此条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
          var multipleDelete = this.$_.map(this.multipleSelection, function (item) {
            return item._id
          });
          if(multipleDelete.length===0){return}
          var multipleData = JSON.stringify({ids: multipleDelete});
          var token = JSON.parse(sessionStorage.myLogin).token
          var that = this
          this.$axios({
            method: "POST",
            url: `${this.$baseURL}/v1/broadcast/delete-batch`,
            data: multipleData,
            headers: {
              "X-Access-Token": token,
              "Content-Type": "application/json"
            }
          }).then((res) => {
            that.getClassifyList()
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          }).catch((err) => {
          })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
    }
  }
</script>

<style scoped lang="stylus">
  .bannerList {
    .el-pagination {
      text-align: center;
      margin-top: 30px;
    }
  
    .el-message-box__btns .cancel {
      float: right;
      margin-left: 10px;
    }
    .form-input{
      width: 300px;
    }
    .el-button--primary a{
      color: #ffffff;
    }
  }
</style>
