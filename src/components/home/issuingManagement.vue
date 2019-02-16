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
      <div class="search"></div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "issuingManagement",
    components: {},
    data() {
      return {
        path: ""
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      uploadFile(e) {
        let that=this
        e.target.addEventListener("change", function () {
          console.log(this.value)
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
    }
  }
</style>
