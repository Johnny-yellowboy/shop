<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href="javascript:;"  @click="open2">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          unique-opened
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="user">用户列表</span>
              </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
                <el-menu-item index="3-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="3-2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">权限列表</span>
                </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
                <el-menu-item index="4-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="4-2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">分类参数</span>
                </el-menu-item>
                <el-menu-item index="4-3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品分类</span>
                </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
                <el-menu-item index="5-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单列表</span>
                </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
                  <el-menu-item index="5-1">
                      <i class="el-icon-menu"></i>
                      <span slot="title">数据列表</span>
                  </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    open2 () {
      this.$confirm('你确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        localStorage.removeItem('loginToken')
        console.log('loginToken已删除')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    user () {
      this.$router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped>
// scoped: 如果设置了，表示样式只会在当前组件生效， 我们的style都应该scoped
.home{
  height: 100%;
    .el-header{
      background-color: #B3C0D1;
      // color: #333;
      text-align: center;
      line-height: 60px;
      display: flex;
      .logo{
        width: 180px;
        background-image: url("../assets/logo.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 180px;
      }
      .title{
        flex: 1;
        h1{
          text-align: center;
          line-height: 60px;
          color: #fff;
          font-size: 28px;
        }
      }
      .logout{
        width: 180px;
        font-weight: 800;
        line-height: 60px;
        a{
          color: rgb(2, 79, 202);
        }
      }
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-submenu{
      text-align: left;
    }
  }

  .el-main {
    background-color: #E9EEF3;
    // color: #333;
    // text-align: center;
    // line-height: 160px;
    // 默认样式去掉,否则布局会乱
  }
}
</style>
