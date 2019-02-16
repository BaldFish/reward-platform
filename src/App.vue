<template>
  <div id="app">
    <router-view class="main" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    provide() {//回退刷新
      return {
        reload: this.reload,
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    watch: {
      //监听路由变化执行方法
      $route(to, from) {
        if(!sessionStorage.myLogin){
          //this.$router.push("/login")
        }
      }
    },
    computed: {},
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
    },
  };
</script>

<style lang="stylus">
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    
    .main {
      flex: 1;
      width 100%
      min-width 1400px
      margin: 0 auto;
    }
  }
</style>
