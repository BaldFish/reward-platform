<template>
  <div class="issuingManagement">
    <div class="import_wrap">
      <p class="tip">请按照Excel指定格式导入表格！</p>
      <div class="import">
        <span class="text">路径：</span>
        <input class="import_path" type="text" readonly="readonly" v-model="path">
        <label>
          <input class="import_file" type="file" @click="uploadFile($event)">
          <span class="import_btn">导入</span>
        </label>
        <span class="send">发送</span>
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
        <span @click="btnSearch" class="btn_search">搜索</span>
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
            <td width="220">{{item.address}}</td>
            <td width="100">{{item.name}}</td>
            <td width="144">{{item.phone}}</td>
            <td width="200">{{item.email}}</td>
            <td width="100">{{item.rule}}</td>
            <td width="150">{{item.created_at}}</td>
            <td width="100">{{item.value}}</td>
            <td width="200">{{item.from}}</td>
            <td width="150">{{item.remark}}</td>
          </tr>
          </tbody>
        </table>
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
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjYwMDkwNTAsInVzZXJfaWQiOiI1YzY2ODcxZGMzZGIzYjM3ZjQ3ZmFkNGIiLCJkZXZpY2VfaWQiOiJsYXVuY2gtcmV3YXJkIn0.T_BE32VXQnAM1AExq0Y-kgMUPecRTlHErRAtDLflIvQ",
        path: "",
        walletAddress: "",
        phone: "",
        email: "",
        time:["",""],
        page:"0",
        limit:"10",
        recordsList:[],
      }
    },
    created() {
    },
    beforeMount() {
      this.getList()
    },
    mounted() {
    },
    watch: {
      time: function () {
        if(this.time===null){
          this.time=["",""]
        }
      }
    },
    computed: {},
    methods: {
      uploadFile(e) {
        let that = this;
        e.target.addEventListener("change", function () {
          let file = this.files[0];
          that.path = that.getObjectURL(file)
        })
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjcectURL != undefined) {
          url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      getList(){
        this.$axios({
          method:'GET',
          url:`${this.$baseURL}/v1/launchreward/token/ydd/records?address=${this.walletAddress}&phone=${this.phone}&email=${this.email}&since=${this.time[0]}&to=${this.time[1]}&page=${this.page}&limit=${this.limit}`,
          headers: {
            'X-Access-Token':this.token,
          }
        }).then(res=>{
          this.recordsList=res.data.data.records;
          console.log(this.recordsList)
        }).catch(error=>{
          console.log(error)
        })
      },
      btnSearch() {
      },
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
      width 1400px
      height 860px
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
        }
      }
      .content{
        width 1364px
        margin 0 auto
        margin-top 30px
        overflow:auto;
        display: block;
        table{
          background-color #f8f8f8
          width 1364px
          table-layout automatic
          thead{
            tr{
              height 90px
              line-height 90px
              font-size: 18px;
              color: #222222;
              td:first-child{
                padding-left 25px
              }
            }
          }
          tbody{
            tr{
              height 40px
              line-height 40px
              font-size 14px
              color: #333333;
              td:first-child{
                padding-left 25px
              }
              td{
                padding-right 10px
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .even{
              background-color #ffffff
            }
          }
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
</style>
