<template>
  <div class="app-container">
    <!--- top-action  --->
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">角色管理</span></el-col>
      <el-col :span="2"/>
      <el-col :span="6" :offset="12">
        <el-button
          style="float: right;"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增角色
        </el-button>
      </el-col>
      <el-col
        :span="2"
      >
        <el-button
          style="float: right;"
          type="danger"
          plain
          icon="el-icon-close"
          @click="handleBatchDelete"
        >批量删除
        </el-button>
      </el-col>
    </el-row>
    <!--- top-search  --->
    <div class="top-search">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="search.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色别名">
          <el-input v-model="search.roleAlias" placeholder="请输入角色别名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="handleReseat" icon="el-icon-delete">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--- table-body--->
    <div class="table-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :max-height="600"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="#" type="index" width="50"/>
        <el-table-column label="角色名称" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色别名" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.roleAlias }}</span>
          </template>
        </el-table-column>
        <el-table-column label="租户ID" width="180">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.tenantId }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="rowRolePermissionEdit(scope.$index, scope.row)"
            >权限配置
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="rowRoleMenuEdit(scope.$index, scope.row)"
            >菜单配置
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="rowRoleMenuEdit(scope.$index, scope.row)"
            >用户配置
            </el-button>
            <el-button
              size="mini"
              @click="rowEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="rowRemoveByIds(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <copyright/>
    </div>

    <!-- 新增或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisibility"
      width="600px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色别名" prop="roleAlias">
              <el-input v-model="form.roleAlias" placeholder="请输入角色别名"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 角色 菜单 -->
    <el-dialog
      :title="titleRoleMenu"
      :visible.sync="dialogVisibilityRoleMenu"
      width="600px"
      append-to-body
    >
      <el-tree
        :data="dataRoleMenu"
        show-checkbox
        ref="treeRoleMenu"
        node-key="id"
        :default-expanded-keys="defaultCheckedMenuKeys"
        :default-checked-keys="defaultCheckedMenuKeys"
        :props="defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormRoleMenu">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!--角色 权限-->
    <el-dialog
      :title="titleRolePermission"
      :visible.sync="dialogVisibilityRolePermission"
      width="600px"
      append-to-body
    >
      <el-tree
        :data="dataRolePermission"
        show-checkbox
        ref="treeRolePermission"
        node-key="id"
        :default-expanded-keys="defaultCheckedPermissionKeys"
        :default-checked-keys="defaultCheckedPermissionKeys"
        :props="defaultProps"
      />

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormRolePermission">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveOrUpdate,
  removeByIds,
  grantRoleMenu,
  grantRolePermission,
  list as getRoleList,
  listAllMenuByRoleIds,
  listAllTreePermissionByRoleIds
} from '@/api/role'

import { getCheckedId } from '@/utils/index.js'

export default {
  data() {
    return {
      tableData: [],
      currentRow: undefined,
      dataRoleMenu: [],
      defaultCheckedMenuKeys: [],
      dataRolePermission: [],
      defaultCheckedPermissionKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectionList: [],
      search: {
        roleName: '',
        roleAlias: '',
        current: 1,
        size: 10
      },
      dialogVisibility: false,
      dialogVisibilityRoleMenu: false,
      dialogVisibilityRolePermission: false,
      form: {
        status: '1'
      },
      title: '',
      titleRoleMenu: '',
      titleRolePermission: '',
      rules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        roleAlias: [
          {
            required: true,
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
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
      this.dialogVisibility = true
      this.title = '新增角色'
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
            return removeByIds(this.ids)
          })
          .then(() => {
            this.init()
            this.$baseMessage('操作成功', 'success')
          })
          .catch(function() {
          })
      }
    },
    handleSearch() {
      this.init()
    },
    handleReseat() {
      this.search.roleName = ''
      this.search.roleAlias = ''
      this.search.current = 1
      this.init()
    },
    handleSizeChange(val) {
      this.search.size = val
      this.getTenantList()
    },
    handleCurrentChange(val) {
      this.search.current = val
      this.getTenantList()
    },
    resetForm() {
      this.form = {
        roleName: undefined,
        roleAlias: undefined
      }
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.form)
          saveOrUpdate(this.form).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisibility = false
              this.init()
            } else {
              this.$message({
                message: '操作失败' + response.message,
                type: 'error'
              })
            }
          })
        }
      })
    },
    submitFormRoleMenu() {
      // 角色菜单关系 treeRoleMenu
      const data = { roleIds: [this.currentRow.id], menuIds: this.$refs.treeRoleMenu.getCheckedKeys() }
      grantRoleMenu(data).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogVisibilityRoleMenu = false
          this.init()
        } else {
          this.$message({
            message: '操作失败' + response.message,
            type: 'error'
          })
        }
      })
    },
    submitFormRolePermission() {
      // 角色权限关系
      const data = { roleIds: [this.currentRow.id], permissionIds: this.$refs.treeRolePermission.getCheckedKeys() }
      grantRolePermission(data).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogVisibilityRolePermission = false
          this.init()
        } else {
          this.$message({
            message: '操作失败' + response.message,
            type: 'error'
          })
        }
      })
    },
    selectionChange(list) {
      this.selectionList = list
    },
    cancel() {
      this.dialogVisibility = false
      this.dialogVisibilityRoleMenu = false
      this.dialogVisibilityRolePermission = false
    },
    rowEdit(index, row) {
      this.dialogVisibility = true
      this.title = '编辑角色'
      this.form = row
      console.log(index, row)
    },
    rowRoleMenuEdit(index, row) {
      this.dialogVisibilityRoleMenu = true
      this.titleRoleMenu = '菜单设置'
      this.currentRow = row
      this.listAllMenuByRoleIds(row.id)
    },
    rowRolePermissionEdit(index, row) {
      this.dialogVisibilityRolePermission = true
      this.titleRolePermission = '权限设置'
      this.currentRow = row
      this.listAllTreePermissionByRoleIds(row.id)
    },
    rowRemoveByIds(index, row) {
      const that = this
      this.$confirm(
        '是否确认删除名称为"' + row.roleName + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return that.removeByIds(row.id)
        })
        .then(() => {
          this.init()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(function() {
        })
    },
    init() {
      this.getRoleList()
    },
    getRoleList() {
      // this.listLoading = true
      // 分页查询用户
      getRoleList(this.search).then(response => {
        console.log(this)
        this.tableData = response.data
        console.log(this)
      })
    },
    removeByIds(ids) {
      // 删除用户
      removeByIds(ids).then(response => {
        //   this.listLoading = false
      })
    },
    listAllMenuByRoleIds(ids) {
      listAllMenuByRoleIds(ids).then(response => {
        this.dataRoleMenu = response.data
        this.defaultCheckedMenuKeys = getCheckedId(this.dataRoleMenu)
      })
    },
    listAllTreePermissionByRoleIds(ids) {
      listAllTreePermissionByRoleIds(ids).then(response => {
        this.dataRolePermission = response.data
        this.defaultCheckedPermissionKeys = getCheckedId(this.dataRolePermission)
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

@import "@/styles/comm.scss";

.table-body {
  margin-top: 0px;
}

.el-pagination {
  text-align: center;
  margin-top: 15px;
}

</style>
