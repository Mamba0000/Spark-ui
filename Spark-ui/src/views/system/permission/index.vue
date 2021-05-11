<template>
  <div class="app-container">
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">新增权限</span></el-col>
      <el-col :span="2" />
      <el-col :span="6" :offset="12">
        <el-button
          style="float: right;"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增权限</el-button></el-col>
      <el-col
        :span="2"
      ><el-button
        style="float: right;"
        type="danger"
        plain
        icon="el-icon-close"
        @click="handleBatchDelete"
      >批量删除</el-button></el-col>
    </el-row>
    <!--- top-search  --->
    <div  class="top-search">
      <el-form :inline="true" :model="search" class="demo-form-inline" >
        <el-form-item label="权限名称">
          <el-input v-model="search.name" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="search.value" placeholder="请输入权限标识"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch"  icon="el-icon-search" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  plain @click="handleReseat"  icon="el-icon-delete">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        :border="true"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        @selection-change="selectionChange"
        :tree-props="{ children: 'children', hasChildren: '有毒' }"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column label="#" type="index" width="50" />

        <el-table-column label="权限名称" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限标识" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限描述" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限分类" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.categoryId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="rowEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="rowDeleteLogic(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <copyright />
    </div>
    <!-- 新增或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dailogVisibility"
      width="600px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="权限名称" prop="account">
              <el-input v-model="form.name" placeholder="请输入权限名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识" prop="name">
              <el-input v-model="form.value" placeholder="请输入权限标识" />
            </el-form-item>
          </el-col>
          <el-col v-if="!form.id" :span="12">
            <el-form-item label="ID" prop="password">
              <el-input
                v-model="form.id"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限类别" size="mini">
              <el-radio-group v-model="form.sex">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { list, addOrUpdate, deleteLogic } from '@/api/permission'

export default {
  data() {
    return {
      tableData: [],
      selectionList: [],
      search: {
        name: '',
        value: '',
        current: 1,
        size: 10
      },
      dailogVisibility: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      form: {
      },
      title: '',
      rules: {
        name: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入权限值', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ids() {
      const ids = []
      this.selectionList.forEach(ele => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleAdd() {
      this.resetForm()
      this.dailogVisibility = true
      this.title = '新增权限'
    },
    handleBatchDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('未能选择一条数据')
      } else {
        this.$confirm(`确认选中的${this.selectionList.length}条数据?`, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 批量删除
            return deleteLogic(this.ids)
          })
          .then(() => {
            this.init()
            this.$baseMessage('操作成功', 'success')
          })
          .catch(function() {})
      }
    },
    handleSearch() {
      this.init()
    },
    handleReseat() {
      this.search.name = ''
      this.search.value = ''
      this.search.current = 1
      this.init()
    },
    handleSizeChange(val) {
      this.search.size = val
      this.list()
    },
    handleCurrentChange(val) {
      this.search.current = val
      this.list()
    },
    resetForm() {
      this.form = {
      }
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addOrUpdate(this.form).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dailogVisibility = false
              this.init()
            }
          })
        }
      })
    },
    selectionChange(list) {
      this.selectionList = list
    },
    cancel() {
      this.dailogVisibility = false
    },
    rowEdit(index, row) {
      this.dailogVisibility = true
      this.title = '编辑权限'
      this.form = row
    },
    rowDeleteLogic(index, row) {
      const that = this
      this.$confirm(
        '是否确认删除名称为"' + row.name + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return that.deleteLogic(row.id)
        })
        .then(() => {
          this.init()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(function() {})
    },
    init() {
      // 默认第一页
      this.search.current = 1
      this.list()
    },
    list() {
      // this.listLoading = true
      // 分页查询权限
      list(this.search).then(response => {
        this.tableData = response.data
      })
    },
    deleteLogic(ids) {
      // 删除权限
      deleteLogic(ids).then(response => {
        //   this.listLoading = false
      })
    },
    // 格式处理相关
    // 更改表头样式
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #fafafa;color: #000;font-weight: 500; text-align: center'
      }
    },
    // 更改表头样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex !== 1 && columnIndex !== 3) {
      return 'text-align: center'
      // }
    },
    dateFormat(datetime) {
      if (datetime) {
        datetime = new Date(datetime)
        const y = datetime.getFullYear() + '-'
        const mon = datetime.getMonth() + 1 + '-'
        const d = datetime.getDate()
        return y + mon + d
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/comm.scss';
</style>
