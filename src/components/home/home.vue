<template>
  <div class="home">
    <div class="nav_wrap">
      <ul class="nav">
        <li>
          <router-link to="/login">|<span>发币管理</span></router-link>
        </li>
      </ul>
    </div>
    <router-view class="home_main"></router-view>
  </div>
</template>

<script>
  export default {
    name: "home",
    components: {},
    data() {
      return {}
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
    watch: {
    },
    computed: {},
    methods: {},
  }
</script>

<style scoped lang="stylus">
  .home {
    .nav_wrap{
      height 80px
      background-color: #c42923;
      margin 0 auto
      .nav{
        width 1400px
        height 80px
        margin 0 auto
        padding-left 50px
        li{
          height 80px
          line-height 80px
          a{
            color #ffffff
            font-size 20px
            span{
              margin-left 10px
            }
          }
        }
      }
    }
    .home_main{
      min-width 1400px
    }
  }
</style>
