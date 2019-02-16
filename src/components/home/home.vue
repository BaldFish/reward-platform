<template>
  <div class="home">
    <div class="nav_wrap">
      <ul class="nav">
        <li class="">
          <router-link to="/home/issuingManagement"><span>发币管理</span></router-link>
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
    },
    mounted() {
    },
    watch: {},
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
      }
    }
    .home_main{
    }
  }
</style>
