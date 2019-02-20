<template>
  <div class="issuingManagement">
    <div class="import_wrap">
      <p class="tip">请按照Excel指定格式导入表格！</p>
      <div class="import">
        <span class="text">路径：</span>
        <input class="import_path" type="text" readonly="readonly" v-model="path">
        <label>
          <input class="import_file" type="file" @click="uploadFile($event)" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          <span class="import_btn">导入</span>
        </label>
        <span class="send" @click="openModal">发送</span>
      </div>
    </div>
    <div class="content_wrap">
      <div class="search">
        <p>奖励发放流水</p>
        <span>钱包地址：</span>
        <el-input v-model="walletAddress" placeholder="请输入钱包地址" clearable style="width: 920px" class="walletAddress_input" size="small"></el-input>
        <br>
        <span>手机号：</span>
        <el-input v-model="phone" placeholder="请输入手机号码" clearable style="width: 170px" class="phone_input" size="small"></el-input>
        <span>邮箱：</span>
        <el-input v-model="email" placeholder="请输入邮箱地址" clearable style="width: 230px" class="email_input" size="small"></el-input>
        <span>创建时间：</span>
        <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']" size="small">
        </el-date-picker>
        <span @click="getRecordsList" class="btn_search">搜索</span>
      </div>
      <div class="content">
        <table>
          <thead>
          <tr>
            <td>钱包地址</td>
            <td>姓名</td>
            <td>手机号</td>
            <td>邮箱</td>
            <td>奖励类型</td>
            <td>创建时间</td>
            <td>金额</td>
            <td>发放账号</td>
            <td>备注</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) of recordsList" :key="item.id" :class="index%2?'':'even'">
            <td>
              <div style="width: 220px">{{item.address}}</div>
            </td>
            <td>
              <div style="width: 100px">{{item.name}}</div>
            </td>
            <td>
              <div style="width: 144px">{{item.phone}}</div>
            </td>
            <td>
              <div style="width: 200px">{{item.email}}</div>
            </td>
            <td>
              <div style="width: 100px">{{item.rule}}</div>
            </td>
            <td>
              <div style="width: 150px">{{item.created_at}}</div>
            </td>
            <td>
              <div style="width: 100px">{{item.value}}</div>
            </td>
            <td>
              <div style="width: 200px">{{item.from}}</div>
            </td>
            <td>
              <div style="width: 150px">{{item.remark}}</div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging" style="text-align:center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size=limit
            :page-sizes="[5, 10, 20, 30]"
            layout="total, sizes, prev, pager, next,jumper"
            :total=total>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "issuingManagement",
    components: {},
    data() {
      return {
        token: "",
        path: "",
        walletAddress: "",
        phone: "",
        email: "",
        time: ["", ""],
        recordsList: [],
        page: 1,
        limit: 10,
        currentPage: 1,
        total: 10,
        file:"",
        //search: false,//是否搜索标识
      }
    },
    created() {
    },
    beforeMount() {
      this.getRecordsList()
    },
    mounted() {
    },
    watch: {
      time: function () {
        if (this.time === null) {
          this.time = ["", ""]
        }
      }
    },
    computed: {},
    methods: {
      //上传文件
      uploadFile(e) {
        let that = this;
        e.target.addEventListener("change", function () {
          let file = this.files[0];
          //that.path = that.getObjectURL(file);
          that.path=e.target.value;
          that.file = e.target.files[0];
        })
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjcectURL != undefined) {//ie
          url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {//火狐
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {//谷歌
          url = window.webkitURL.createObjectURL(file);
        }
        return url
      }
      ,
      //获取奖励发放流水列表
      getRecordsList() {
        this.token = JSON.parse(window.sessionStorage.getItem('myLogin')).token;
        this.$axios({
          method: 'GET',
          url: `${this.$baseURL}/v1/launchreward/token/ydd/records?address=${this.walletAddress}&phone=${this.phone}&email=${this.email}&since=${new
          Date(this.time[0]).toUTCString() === "Invalid Date" ? "" : new Date(this.time[0]).toUTCString()}&to=${new Date(this.time[1]).toUTCString() === "Invalid Date" ? "" : new Date(this.time[1]).toUTCString()}&page=${this.page}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.total = res.data.data.total_count;
          let that = this;
          res.data.data.records.forEach(function (item) {
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.recordsList = res.data.data.records;
        }).catch(error => {
          console.log(error)
        })
      }
      ,
      //点击搜索按钮获取奖励发放流水列表
      /*btnSearchRecordsList() {
      },*/
      //分页切换搜索用户列表
      /*pageSearchRecordsList() {
        this.search = true;
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/find`,
          data: this.$querystring.stringify(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          let that = this;
          res.data.users.forEach(function (item) {
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.userList = res.data.users;
        }).catch(error => {
          console.log(error)
        })
      },*/
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getRecordsList();
        //this.search ? this.pageSearchRecordsList() : this.getRecordsList();
      }
      ,
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getRecordsList();
        //this.search ? this.pageSearchRecordsList() : this.getRecordsList();
      }
      ,
      openModal() {
        //有无excel判断
        if (this.path){
          this.$confirm('确定发送元豆豆到账户？',  {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            //加载loading
            const loading = this.$loading({
              lock: true,
              text: '加载中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            //上传
            let param = new FormData(); //创建form对象
            param.append('file',this.file);//通过append向form对象添加数据
            this.$axios({
              method: 'post',
              url: `${this.$baseURL}/v1/launchreward/token/ydd/upload`,
              processData: false,
              data: param,
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-Access-Token':this.token,
                'token':this.token,
              }
            }).then(res => {
              //关闭loading
              loading.close();
              //结束提示
              this.$alert('发送成功！', {
                confirmButtonText: '确定',
                center: true,
                callback: () => {
                  console.log("关闭modal")
                }
              });
            }).catch(error => {
              console.log(error);
            });
          }).catch(() => {
            console.log("已取消")
          });
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
  .issuingManagement {
    width 1400px
    margin 0 auto

    .import_wrap {
      margin-top 10px
      width 1400px
      height: 110px;
      border: 2px solid #ffe9e8;
      padding-left 50px

      .tip {
        margin 20px 0 10px
        font-size: 18px;
        color: #000000;
      }

      .import {
        font-size 0

        .text {
          font-size 16px
        }

        .import_path {
          background: none;
          outline: none;
          border: 0px;
          font-size: 14px;
          color: #333333;
          width: 550px;
          height: 30px;
          background-color: #f8f8f8;
          border: 1px solid #ffe9e8;
          padding-left 20px
          margin-left 40px
          margin-right 80px

        }

        label {
          margin-right 20px

          .import_file {
            display none
          }

          .import_btn {
            display inline-block
            width: 106px;
            height: 40px;
            line-height 40px
            border-radius: 20px;
            border: 1px solid #c42923;
            font-size: 18px;
            color: #c42923;
            text-align center
            vertical-align top
            cursor pointer
          }
        }

        .send {
          display inline-block
          text-align center
          width: 106px;
          height: 40px;
          line-height 40px
          background-color: #c42923;
          border-radius: 20px;
          font-size 18px
          color: #fefefe;
          cursor pointer
        }
      }
    }

    .content_wrap {
      margin-top 20px
      margin-bottom 20px
      width 1400px
      //height 860px
      border: 2px solid #ffe9e8;

      .search {
        font-size 0
        padding-left 50px

        p {
          margin-top 20px
          margin-bottom 15px
          font-size: 18px;
          color: #000000;
        }

        span {
          font-size 16px
          color: #333333;
        }

        .btn_search {
          display inline-block
          width: 106px;
          height: 40px;
          line-height 40px
          background-color: #c42923;
          border-radius: 20px;
          text-align center
          font-size: 18px;
          color: #fefefe;
          cursor pointer
        }
      }

      .content {
        width 1364px
        margin 0 auto
        margin-top 30px
        overflow: auto;
        display: block;

        table {
          background-color #f8f8f8
          width 1364px
          table-layout automatic

          thead {
            tr {
              height 90px
              line-height 90px
              font-size: 18px;
              color: #222222;

              td:first-child {
                padding-left 25px
              }
            }
          }

          tbody {
            tr {
              height 40px
              line-height 40px
              font-size 14px
              color: #333333;

              td:first-child div {
                padding-left 25px
              }

              td {
                div {
                  padding-right 10px
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }

            .even {
              background-color #ffffff
            }
          }
        }

        .paging {
          height 100px
          padding-top 30px
        }
      }
    }
  }
</style>
<style lang="stylus">
  .search {
    .walletAddress_input, .phone_input, .email_input {
      .el-input__inner {
        background-color: #f8f8f8;
        border: 1px solid #ffe9e8;
        color #333333
      }
    }

    .phone_input {
      margin-left 15px
    }

    .phone_input, .email_input {
      margin-right 21px
    }

    .date_input {
      margin-top 20px
      margin-right 30px
      background-color #f8f8f8
      border: 1px solid #ffe9e8;

      input {
        background-color #f8f8f8
      }
    }

    .el-range-editor.is-active, .el-range-editor.is-active:hover {
      border-color: #ffe9e8;
    }
  }

  .el-message-box{
    width: 350px;
    height: 200px;
    border-radius: 10px;
    p{
      font-size: 20px;
      color: #333333;
      margin-bottom: 35px;
    }
    .el-message-box__btns{
      .el-button{
        width: 106px;
        height: 40px;
        border-radius: 10px;
        border: solid 1px #c42923;
        font-size: 18px;
        color: #c42923;
        background-color #c42923
      }
      .el-button:nth-child(1){
        background-color #ffffff
      }
      .el-button:nth-child(2){
        color #ffffff
        margin-left 40px
      }
      .el-button--primary{
        color #ffffff
        background-color #c42923 !important
      }
    }
  }
</style>
