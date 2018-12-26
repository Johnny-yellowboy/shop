<template>
  <div class="right">
     <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="Alldata" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="{row:{level}}">
          <span v-if="+level === 0">一级</span>
          <span v-if="+level === 1">二级</span>
          <span v-if="+level === 2">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Alldata: []
    }
  },
  methods: {
    async GetAlldata () {
      let res = await this.axios('rights/list')
      console.log(res)
      if (res.meta.status === 200) {
        this.Alldata = res.data
      }
    }
  },
  created () {
    this.GetAlldata()
  }
}
</script>

<style>

</style>
