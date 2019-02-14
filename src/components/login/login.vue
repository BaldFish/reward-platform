<template>
  <div class="login">
    <div class="login-container">
      <div class="content">
        <p class="title">后台管理系统</p>
        <ul>
          <li>
            <i></i>
            <input type="text" placeholder="请输入用户名" v-model="userName">
          </li>
          <li>
            <i></i>
            <input type="password" placeholder="请输入密码" v-model="password">
          </li>
          <li>
            <i></i>
            <input type="text" placeholder="请输入验证码" v-model="captchaCode">
            <img @click="getCaptcha" :src="captcha_number" alt="">
          </li>
        </ul>
        <p class="login-btn" @click="login">登录</p>
        <div class="errorTip_wrap" >
          <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "login",
    components: {},
    data() {
      return {
        userName: "",
        password: "",
        captchaCode: "",
        captcha_number: "",
        captcha_id: "",
        errorMessage: "",//错误提示信息
        errorTip: false,
      }
    },
    created() {
    },
    beforeMount() {
      this.$nextTick(() => {
        this.getCaptcha()
      });
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      //获取图片验证码
      getCaptcha() {
        this.$axios({
          method: 'post',
          url: `${this.$baseURL}/v1/captcha`,
          data: this.$querystring.stringify({})
        }).then(res => {
          this.captcha_number = `data:image/png;base64,${res.data.png}`;
          this.captcha_id = res.data.captcha_id;
        }).catch(error => {
          console.log(error);
        });
      },
      //登录
      login() {
        this.getCaptcha();
        let loginData = {
          username: this.userName,
          password: this.password,
          captcha_id: this.captcha_id,
          captcha_number: this.captchaCode,
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/mgt/session`,
          data: this.$querystring.stringify(loginData)
        }).then(res => {
          sessionStorage.setItem("myLogin", JSON.stringify(res.data));
          this.$router.push("/home")
        }).catch(error => {
          this.errorMessage = "登录失败";
          this.errorTip = true;
          let that = this;
          window.setTimeout(function () {
            that.errorTip = false;
          }, 2000);
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .login {
    width: 100%
    height: 100%
    background: url("../../common/images/bg.jpg") no-repeat center
    background-size 100% 100%
    
    .login-container {
      width: 464px;
      height: 421px;
      background-color: #ffffff;
      border-radius: 30px;
      margin-top 12%
      margin-left 48%
      
      .content {
        width: 326px
        margin 0 auto
        padding-top: 50px;
        position relative
        .title {
          font-size: 24px;
          color: #333333;
          text-align center
          margin-bottom 55px
        }
        
        ul {
          input {
            background: none;
            outline: none;
            border: 0px;
          }
          
          li {
            font-size: 14px;
            border-bottom: solid 1px #cecece;
            padding-bottom: 13px;
            margin-top: 13px;
            
            i {
              margin-right 12px
              position: relative
              top: 3px
            }
            
            img {
              width: 91px;
              height: 32px;
              float right
              margin-right 6px
            }
          }
          
          li:nth-child(1) i {
            width: 16px;
            height: 18px;
            display inline-block
            background url("../../common/images/icon_user.png") no-repeat center
            background-size 100% 100%
          }
          
          li:nth-child(2) i {
            width: 16px;
            height: 22px;
            display inline-block
            background url("../../common/images/iicon_password.png") no-repeat center
            background-size 100% 100%
          }
          
          li:nth-child(3) i {
            width: 16px;
            height: 18px;
            display inline-block
            background url("../../common/images/icon_code.png") no-repeat center
            background-size 100% 100%
          }
        }
        
        .checkError {
          font-size: 14px;
          color: #e60000;
          margin: 14px 0 22px 0
        }
        
        .login-btn {
          margin-top 30px
          cursor pointer
          width: 326px;
          height: 40px
          background-color: #1d79fe;
          border-radius: 20px;
          line-height 40px
          text-align center
          color #ffffff
          font-size: 18px;
        }
        .login-btn:active {
          background-color: #ffffff;
          color #1d79fe
          moz-user-select: -moz-none;
          -moz-user-select: none;
          -o-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .errorTip_wrap {
          width 100%
          text-align center
          font-size 0
          position absolute
          top 50%
          .errorTip {
            display inline-block
            box-sizing border-box
            line-height 1.2
            max-width 520px;
            padding 20px 30px
            background-color #000000
            opacity 0.7
            font-size 18px;
            color #ffffff
            border-radius 30px
          }
        }
  
      }
    }
    
    
  }
</style>
