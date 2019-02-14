<template>
  <div class="articleManagement">
    <el-container>
      <el-aside width="200px" class="">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="addArticle" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                 unique-opened>
          <el-submenu index="articleManagement">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="categoryList">
                <router-link to="/home/articleManagement/categoryList">分类管理列表</router-link>
              </el-menu-item>
              <el-menu-item index="articleList">
                <router-link to="/home/articleManagement/articleList">文章管理列表</router-link>
              </el-menu-item>
              <el-menu-item index="addArticle">
                <router-link to="/home/articleManagement/addArticle">增加文章</router-link>
              </el-menu-item>
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
    name: "articleManagement",
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
  .articleManagement {
    a {
      color #303133
    }
  
    a.router-link-active {
      color #409EFF
      text-decoration: none;
    }
  }
</style>
