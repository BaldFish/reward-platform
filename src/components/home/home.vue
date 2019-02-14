<template>
  <div class="home">
    <div class="head_wrap">
      <div class="head">
        <span>后台管理系统</span>
        <ul class="nav">
          <li class="">
            <router-link to="/home/userManagement"><span>用户管理</span></router-link>
          </li>
          <li class="">
            <router-link to="/home/articleManagement"><span>文章管理</span></router-link>
          </li>
          <li class="">
            <router-link to="/home/systemManagement"><span>系统管理</span></router-link>
          </li>
        </ul>
        <Dropdown style="margin-left: 20px" trigger="click" class="user_info">
          <Button type="primary">
            {{"admin"}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>修改密码</DropdownItem>
            <DropdownItem>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!--<el-dropdown class="user_info" trigger="click" placement="top" @mouseleave.stop.native="leaveUl" v-if="isLogin">
          <el-button type="primary"  @click.native="toggle">
            {{"admin"}}
            <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </el-button>
          <ul v-if="switchover">
          <li>修改密码</li>
          <li @click.stop="dropOut">退出登录</li>
          </ul>
        </el-dropdown>-->
      </div>
    </div>
    <router-view class="home_main"></router-view>
  </div>
</template>

<script>
  export default {
    name: "home",
    components: {},
    data() {
      return {
        isLogin: true,
        switchover: false,
      }
    },
    created() {
    },
    beforeMount() {
      if(!sessionStorage.myLogin){
        this.$router.push("/login")
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      toggle() {
        this.switchover = !this.switchover
      },
      leaveUl() {
        this.switchover = false
      },
      dropOut() {
      },
    },
  }
</script>

<style scoped lang="stylus">
  .home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .head_wrap {
      .head{
        min-width 1200px
        height 100px
        //margin 0 auto
        font-size 0;
        color #000000
        line-height 100px
        span{
          font-size 20px;
          font-weight 700
          vertical-align top
        }
        .nav {
          display inline-block
          font-size 0
          margin-left 50px
          height 100px
          li {
            display: inline-block;
            margin-right 50px
            height 100px
            a {
              cursor pointer
              span{
                padding-top 20px
                padding-bottom 20px
                color #000000
                font-size: 18px;
                font-weight normal
              }
              &.router-link-active, &:hover {
                span{
                  color #409EFF
                  border-bottom 1px solid #409EFF
                }
              }
            }
          }
        }
        .user_info{
          float right
          position relative
          margin-right 20px
          min-width 100px
          .ivu-btn{
            font-size 16px
          }
        }
      }
    }
    .home_main{
      flex: 1;
      min-width 1200px
      //margin: 0 auto;
    }
  }
</style>
<style lang="stylus">
  .user_info{
    .ivu-select-dropdown{
      position: absolute !important
      will-change: top, left;
      transform-origin: center top 0px !important;
      top: 70px !important;
      left: 0px !important;
      border 1px solid #409EFF
      .ivu-dropdown-menu{
        .ivu-dropdown-item{
          font-size 16px !important
          width 110px !important
        }
        .ivu-dropdown-item:hover{
          color #409EFF
        }
      }
    }
  }
</style>
