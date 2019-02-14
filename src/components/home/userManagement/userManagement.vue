<template>
  <div class="userManagement">
    <el-container>
      <el-aside width="200px" class="">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="userQuery" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                 unique-opened>
          <el-submenu index="userManagement">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="userQuery">
                <router-link to="/home/userManagement/userQuery">用户查询</router-link>
              </el-menu-item>
              <el-menu-item index="accountRanking">
                <router-link to="/home/userManagement/accountRanking">账户金额排行</router-link>
              </el-menu-item>
              <!--<el-menu-item index="yuanDouRecharge">
                <router-link to="/home/userManagement/yuanDouRecharge">元豆充值</router-link>
              </el-menu-item>
              <el-menu-item index="assetQuery">
                <router-link to="/home/userManagement/assetQuery">资产查询</router-link>
              </el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="" style="margin: 0;padding: 0;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "userManagement",
    components: {},
    data() {
      return {
        isCollapse: false,
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
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
  }
</script>

<style scoped lang="stylus">
  .userManagement {
    a {
      color #303133
    }
  
    a.router-link-active {
      color #409EFF
      text-decoration: none;
    }
  }
</style>
