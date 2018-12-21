<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href="javascript:;">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less">
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
    background-color: rgb(103, 108, 115);
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>
