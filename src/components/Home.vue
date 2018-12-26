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
        <!-- element是否开启导航模式:router -->
        <el-menu
          default-active="$route.path.slice(1)"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          unique-opened
          router
          active-text-color="#ffd04b">
          <el-submenu v-for="menu in menuList" :key="menu.id" :index="menu.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.authName}}</span>
            </template>
              <el-menu-item v-for="item in menu.children" :key="item.id" :index="item.path">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{item.authName}}</span>
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
  data () {
    return {
      menuList: []
    }
  },
  methods: {
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
    async GetMenus () {
      let res = await this.axios.get('menus')
      // console.log(res)
      if (res.meta.status === 200) {
        this.menuList = res.data
      }
    }
    // user () {
    //   this.$router.push('/user')
    // }
  },
  created () {
    this.GetMenus()
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
