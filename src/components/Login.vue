<template>
  <div class="login">
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="userform" status-icon>
    <img src="../assets/5a0b63366f390dd08ea65f2f16a06227.jpg" alt="">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码"  prop="password">
      <el-input v-model="form.password" type="password"  @keyup.enter.native="logintoo('form')"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login('form')">登录</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
  data  () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.form
          }).then(res => {
            console.log(res.data)
            if (res.data.meta.status === 200) {
              this.$message({
                showClose: true,
                message: '恭喜你，登录成功',
                type: 'success'
              })
              // 储存token
              localStorage.setItem('loginToken', res.data.data.token)
              // 跳转home首页
              this.$router.push('/home')
            } else {
              this.$message({
                showClose: true,
                message: res.data.meta.msg,
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {
          return false
        }
      })
    },
    logintoo (formName) {
      this.login(formName)
    }
  }
}
</script>

<style  lang="less" scoped>
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
        border-bottom: 10px solid rgb(199, 199, 199);
        border-left: 8px solid rgb(235, 235, 235);
        border-right: 8px solid rgb(235, 235, 235);
        border-top: 10px solid rgb(199, 199, 199);
        top: -30%;
        transform: translateX(-50%);
      }
    }
  }
</style>
