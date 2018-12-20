<template>
  <div class="login">
  <el-form ref="form" :model="form" label-width="80px" class="userform">
    <img src="../assets/3812b31bb051f819e8e7a778d6b44aed2f73e7c6.jpg" alt="">
    <el-form-item label="用户名">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data  () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit  () {
      console.log('submit!')
    }
  }
}
</script>

<style  lang="less">
  .login{
    height: 100%;
    background-color: #135975;
    overflow: hidden;
    .userform{
      width: 500px;
      // height: 300px;
      padding: 80px  20px 20px ;
      background-color: #fff;
      position: relative;
      margin: 200px auto;
      border-radius: 15px;
      img{
        width: 130px;
        height: 130px;
        position: absolute;
        border-radius: 50%;
        left: 50%;
        border-top: 10px solid rgb(238, 235, 235);
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        border-bottom: 6px solid rgb(238, 237, 237);
        top: -30%;
        transform: translateX(-50%);
      }
    }
  }
</style>
