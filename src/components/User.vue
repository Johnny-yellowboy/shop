<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-input placeholder="请输入内容" v-model="query" class="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button type="success" plain @click="showAdd">添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <!-- scope插槽作用域拿到了当前列表的数据,原理是在组件的template中传递了数据:data="userList" -->
          <!-- {{ scope.row }} -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"  @change="changeState(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="small" @click="showEdit(scope.row)">
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="small"
            @click="delUser(scope.row.id)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currtPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加显示模态框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="40%">
      <el-form :model="AddForm" status-icon :rules="rules" ref="AddForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="AddForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="AddForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model.number="AddForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model.number="AddForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改显示模态框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="40%">
      <el-form :model="editFrom" status-icon :rules="rules" ref="editFrom" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-tag type="info">{{editFrom.username}}</el-tag>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="editFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model.number="editFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model.number="editFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUsers">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userList: [],
      query: '',
      currtPage: 1,
      pageSize: 2,
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      AddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入一个合法的邮箱', trigger: 'change' }
        ],
        mobile: [
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getList () {
      axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.currtPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('loginToken')
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data.meta.status === 200) {
          this.userList = res.data.data.users
          this.total = res.data.data.total
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currtPage = val
      this.getList()
    },
    search () {
      // 搜索的时候，把当前页第一页
      this.currtPage = 1
      this.getList()
    },
    delUser (id) {
      console.log(id)
      this.$confirm('你确定要删除该用户吗>', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('loginToken')
            }
          }).then(res => {
            console.log(res.data)
            if (res.data.meta.status === 200) {
              if (this.userList.length <= 1 && this.currtPage > 1) {
                this.currtPage--
              }
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changeState (user) {
      console.log(user)
      axios({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${user.id}/state/${user.mg_state}`,
        headers: {
          Authorization: localStorage.getItem('loginToken')
        }
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success('修改状态成功')
        } else {
          this.$message.error('修改状态失败')
        }
      })
    },
    showAdd () {
      this.addDialogVisible = true
    },
    AddUsers () {
      this.$refs.AddForm.validate(vaild => {
        if (!vaild) return false
        // 发送axios
        console.log(this.AddForm)
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/users',
          data: this.AddForm,
          headers: {
            Authorization: localStorage.getItem('loginToken')
          }
        }).then(res => {
          console.log(res.data)
          let status = res.data.meta.status
          if (status === 201) {
            this.total++
            this.currtPage = Math.ceil(this.total / this.pageSize)
            this.getList()
            this.addDialogVisible = false
            this.$refs.AddForm.resetFields()
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    showEdit (row) {
      this.editDialogVisible = true
      this.editFrom.id = row.id
      this.editFrom.username = row.username
      this.editFrom.password = row.password
      this.editFrom.email = row.email
      this.editFrom.mobile = row.mobile
    },
    EditUsers () {
      // 先校验表单内容,否则随便都能提交
      this.$refs.editFrom.validate(vaild => {
        if (!vaild) return false
        axios({
          method: 'put',
          url: `http://localhost:8888/api/private/v1/users/${this.editFrom.id}`,
          data: this.editFrom,
          headers: {
            Authorization: localStorage.getItem('loginToken')
          }
        }).then(res => {
          if (res.data.meta.status === 200) {
            this.editDialogVisible = false
            this.$refs.editFrom.resetFields()
            this.getList()
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        })
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
}
.search {
  width: 350px;
  margin-bottom: 10px;
}
</style>
