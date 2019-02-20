<template>
  <div class="login">
    <div class="login_head_wrap">
      <img src="./images/logo.png" alt="">
    </div>
    <div class="login_main_wrap">
      <div class="login_main">
        <div class="content">
          <p class="title">元征奖励后台系统</p>
          <ul>
            <li>
              <input type="text" placeholder="请输入用户名" v-model="userName">
            </li>
            <li>
              <input type="password" placeholder="请输入密码" v-model="password">
            </li>
            <li>
              <input type="text" placeholder="请输入验证码" v-model="captcha_code">
              <img @click="getCaptcha" :src="captcha_number" alt="验证码">
            </li>
          </ul>
          <p class="login-btn" @click="login">登录</p>
          <div class="errorTip_wrap">
            <div class="errorTip" v-if="errorTip">{{errorMessage}}</div>
          </div>
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
        captcha_code: "",
        captcha_number: "",
        errorTip: false,
        errorMessage: "",
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
        if(!this.userName){
          this.errorTip = true;
          this.errorMessage = "用户名不能为空";
          return false
        }else if(!this.password){
          this.errorTip = true;
          this.errorMessage = "密码不能为空";
          return false
        }else if(!this.captcha_code){
          this.errorTip = true;
          this.errorMessage = "验证码不能为空";
          return false
        }
        let data = {
          username: this.userName,
          password: this.password,
          captcha_id: this.captcha_id,
          captcha_code: this.captcha_code,
        };
        this.$axios({
          method: 'post',
          url: `${this.$baseURL}/v1/launchreward/sessions`,
          data: this.$querystring.stringify(data)
        }).then(res => {
          sessionStorage.setItem("myLogin", JSON.stringify(res.data.data));
          this.$router.push("/home")
        }).catch(error => {
          this.errorTip = true;
          this.errorMessage = error.response.data.message;
        });
        this.getCaptcha();
      },
    },
  }
</script>

<style scoped lang="stylus">
  .login {
    min-width 1400px

    .login_head_wrap {
      width 1400px
      height 80px
      margin 0 auto
      font-size 0
      display: flex;
      align-items: center

      img {
        align-items: center;
        margin-left 20px
      }
    }

    .login_main_wrap {
      height 1000px
      background-image: url('./images/bg.png');
      background-position: top center;
      background-repeat: no-repeat;
      padding-top 235px

      .login_main {
        width: 440px;
        height: 450px;
        margin 0 auto
        background-color: #ffffff;
        box-shadow: -12px 16px 50px 18px rgba(105, 58, 219, 0.07);
        border-top: 5px solid #c42923

        .content {
          .title {
            text-align center
            font-size: 28px;
            color: #333333;
            margin-top 50px
          }

          ul {
            margin-top 58px

            li {
              margin-bottom 24px

              input {
                background: none;
                outline: none;
                border: 0px;
                font-size: 16px;
                color: #000000;
                width: 300px;
                height: 40px;
                background-color: #f8f8f8;
                border-radius: 15px;
                margin-left 70px
                padding-left 20px
              }
              input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                color: #999999;
                font-size: 16px;
              }
              input:-moz-placeholder, textarea:-moz-placeholder {
                color: #999999;
                font-size: 16px;
              }
              input::-moz-placeholder, textarea::-moz-placeholder {
                color: #999999;
                font-size: 16px;
              }
              input:-ms-input-placeholder, textarea:-ms-input-placeholder {
                color: #999999;
                font-size: 16px;
              }
            }

            li:last-child {
              font-size 0

              input {
                font-size: 16px;
                width 166px
                margin-right 7px
              }

              img {
                width 127px
                height 40px
                background-color: #f8f8f8;
                border-radius: 15px;
                vertical-align top
                font-size: 16px;
                cursor pointer
              }
            }
          }
          .login-btn {
            width: 304px;
            height: 40px;
            line-height 40px
            background-color: #c42923;
            border-radius: 15px;
            text-align center
            margin 0 auto
            font-size: 18px;
            color: #ffffff;
            cursor pointer
          }
          .errorTip_wrap{
            text-align: center;
            color: #c42923;
            margin-top: 16px;
          }
          /*.errorTip_wrap {
              width 100%
              text-align center
              font-size 0
              position fixed
              top 50%
  
              .errorTip {
                display inline-block
                box-sizing border-box
                line-height 1.6
                max-width 520px;
                padding 20px 30px
                background-color #000000
                opacity 0.7
                font-size 26px; !*px*!
                color #ffffff
                border-radius 30px
              }
            }*/
        }
      }
    }
  }
</style>
