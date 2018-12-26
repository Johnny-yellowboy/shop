<template>
  <div class="role">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-button type="success" plain @click="ShowAddrole">添加角色</el-button>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="RolesData" style="width: 100%">
      <!-- 折叠 -->
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-tag type="danger" v-if="row.children.length === 0 ">暂无权限</el-tag>
          <!-- 一级 -->
          <el-row class="l1" v-for="l1 in row.children" :key="l1.id">
            <el-col :span="4">
              <el-tag closable>{{l1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row class="l2" v-for="l2 in l1.children" :key="l2.id">
                <el-col :span="4">
                  <el-tag closable type="success">{{l2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 三级 -->
                  <span v-for="l3 in l2.children" :key="l3.id">
                    <el-tag closable type="warning" class="l3">{{l3.authName}}</el-tag>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" ></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" plain icon="el-icon-edit" size="mini" @click="ShowEditDialog(row)"></el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="delRoles(row.id)"></el-button>
          <el-button type="success" plain icon="el-icon-check" size="mini" @click="showassiginDialog(row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色授权" :visible.sync="assiginDialogVisible" width="30%">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assiginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assiginRight">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="this.addForm.id ? '修改角色' : '添加角色' " :visible.sync="AddroleDialogVisible" width="40%">
      <el-form :model="addForm" ref="addForm" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input placeholder="请输入角色,描述" v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddroleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Saverole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      RolesData: [],
      assiginDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName',
        roleID: ''
      },
      data: [],
      AddroleDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: '',
        id: ''
      },
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    GetRoles () {
      this.axios({
        method: 'get',
        url: 'roles'
      }).then(res => {
        console.log(res)
        this.RolesData = res.data
      })
    },
    async showassiginDialog (role) {
      this.roleID = role.id
      this.assiginDialogVisible = true
      let res = await this.axios.get('rights/tree')
      // console.log(res)
      let { meta: { status }, data } = res
      if (status === 200) {
        this.data = data
        // console.log(this.data)
        // 让节点选中
        // 找到当前角色有拥有的所有的三级权限
        let ids = []
        role.children.forEach(l1 => {
          l1.children.forEach(l2 => {
            l2.children.forEach(l3 => {
              ids.push(l3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(ids)
      }
    },
    async assiginRight () {
      // 获取被选中的列表
      let checkedkeys = this.$refs.tree.getCheckedKeys()
      // console.log(checkedkeys)
      let HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // console.log(HalfCheckedKeys)
      let rids = checkedkeys.concat(HalfCheckedKeys).join()
      let res = await this.axios.post(`roles/${this.roleID}/rights`, {
        rids
      })
      // console.log(res)
      let { meta: { status } } = res
      if (status === 200) {
        this.assiginDialogVisible = false
        this.GetRoles()
        this.$message.success('分配权限成功')
      } else {
        this.$message.error('分配权限失败了')
      }
    },
    ShowAddrole () {
      this.AddroleDialogVisible = true
      this.addForm.roleName = ''
      this.addForm.roleDesc = ''
      this.addForm.id = ''
    },
    Saverole () {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return false
        // 2.发送ajax请求
        // 请求方式 post  put
        // 请求地址 'roles'     'roles/id'
        // 响应结果： 201       200
        let id = this.addForm.id
        let method = id ? 'put' : 'post'
        let url = id ? `roles/${id}` : 'roles'
        let status = id ? 200 : 201
        let res = await this.axios({
          method,
          url,
          data: this.addForm
        })
        console.log(res)
        if (res.meta.status === status) {
          this.AddroleDialogVisible = false
          this.$refs.addForm.resetFields()
          this.GetRoles()
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    ShowEditDialog (role) {
      this.AddroleDialogVisible = true
      this.addForm.roleName = role.roleName
      this.addForm.roleDesc = role.roleDesc
      this.addForm.id = role.id
    },
    async delRoles (id) {
      try {
        await this.$confirm('你确定要删除该角色吗?', '温馨提示', {
          type: 'warning'
        })
        let res = await this.axios.delete(`roles/${id}`)
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败了')
        }
      } catch (e) {
        this.$message.info('取消删除')
      }
    }
  },
  created () {
    this.GetRoles()
  }
}
</script>

<style lang="less" scoped>
  .l1{
    padding: 10px 0px 0px;
    border-bottom: 1px dotted #333;
  }
  .l2{
    margin-bottom: 5px;
  }
  .l3{
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>
