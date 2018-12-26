<template>
  <div class="categories">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      <el-button type="success" plain @click="ShowaddCategory">添加分类</el-button>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="cateList" style="width: 100%">
      <!-- <el-table-column prop="cat_name" label="分类名称" ></el-table-column> -->
      <el-table-tree-column
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        prop="cat_name"
        :indentSize="20"
        width="220">
      </el-table-tree-column>
      <el-table-column prop="cat_deleted" label="是否删除" >
        <template slot-scope="{row}">{{row.cat_deleted ? '是' : '否'}}</template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" plain icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="40%" >
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="rules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input placeholder="请输入分类名称" v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" prop="cat_pid">
          <el-cascader
            :options="options"
            :props="props"
            change-on-select
            clearable
            v-model="addForm.cat_pid">
          </el-cascader>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cateList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addDialogVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: [],
        cat_level: ''
      },
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    async Getcategories () {
      let res = await this.axios.get('categories', {
        params: {
          type: 3,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      let {meta: {status}, data: {result, total}} = res
      console.log(res)
      if (status === 200) {
        this.total = total
        this.cateList = result
        // console.log(this.cateList)
      }
    },
    async ShowaddCategory () {
      this.addDialogVisible = true
      let res = await this.axios.get('categories?type=2')
      if (res.meta.status === 200) {
        this.options = res.data
      }
    },
    addCategory () {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return false
        let {cat_pid: catPid, cat_name: catName} = this.addForm
        let res = await this.axios.post('categories', {
          cat_pid: catPid[catPid.length - 1] || 0,
          cat_name: catName,
          cat_level: catPid.length
        })
        console.log(res)
        if (res.meta.status === 201) {
          this.Getcategories()
          this.addDialogVisible = false
          this.$refs.addForm.resetFields()
          this.$message.success('添加成功')
        }
      })
    }
  },
  created () {
    this.Getcategories()
  }
}
</script>

<style>

</style>
