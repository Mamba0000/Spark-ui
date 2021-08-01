<template>
  <div class="app-container">
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">用户管理</span></el-col>
      <el-col :span="2"/>
      <el-col :span="6" :offset="12">
        <el-button
          style="float: right;"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增用户
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
        <el-form-item label="账号名">
          <el-input v-model="search.account" placeholder="请输入账号名"></el-input>
        </el-form-item>
        <el-form-item label="请输入姓名">
          <el-input v-model="search.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="handleReseat" icon="el-icon-delete">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"/>

        <el-table-column label="#" type="index" width="50"/>

        <el-table-column label="账号" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="120">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="120">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="120">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="60">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.sexName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生日" width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
                dateFormat(scope.row.birthday)
              }}</span>
          </template>
        </el-table-column>

        <el-table-column label="租户ID" width="120">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.tenantId }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.statusName }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="rowEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="rowReset(scope.$index, scope.row)"
            >重置密码
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="rowRole(scope.$index, scope.row)"
            >角色配置
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

      <el-pagination
        v-show="total > 0"
        background
        :current-page="search.current"
        :page-size="search.size"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
            <el-form-item label="账户" prop="account">
              <el-input v-model="form.account" placeholder="请输入账户名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"/>
            </el-form-item>
          </el-col>
          <el-col v-if="!form.id" :span="12">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="!form.id" :span="12">
            <el-form-item label="确认密码" prop="rePassword">
              <el-input
                v-model="form.rePassword"
                type="password"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" size="mini">
              <el-radio-group v-model="form.sex">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择">
                <el-option
                  v-for="item in roleListData"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" prop="postId">
              <el-select v-model="form.postId" placeholder="请选择">
                <el-option
                  v-for="item in postListData"
                  :key="item.id"
                  :label="item.postName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="deptId">
              <treeselect
                v-model="form.deptId"
                placeholder="选择部门"
                :options="menuOptions"
                :normalizer="normalizer"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户状态">
              <el-radio-group v-model="form.status" size="mini">
                <el-radio-button label="1">启用</el-radio-button>
                <el-radio-button label="0">禁用</el-radio-button>
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

    <!-- 重置密码 菜单 -->
    <el-dialog
      title="重置密码"
      :visible.sync="dialogVisibilityResetPassword"
      width="600px"
      append-to-body
    >
      <el-form ref="formResetPassword" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col v-if="form.id" :span="24">
            <el-form-item label="新密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="form.id" :span="24">
            <el-form-item label="确认密码" prop="rePassword2">
              <el-input
                v-model="form.rePassword2"
                type="password"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormResetPassword">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 配置角色菜单 -->
    <el-dialog
      title="角色配置"
      :visible.sync="dialogVisibilityRole"
      width="600px"
      append-to-body
    >
      <el-tree
        :data="dataRole"
        show-checkbox
        ref="treeRole"
        node-key="id"
        :default-expanded-keys="defaultCheckedRoleKeys"
        :default-checked-keys="defaultCheckedRoleKeys"
        :props="defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormRole">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import {
  list as getUserList,
  saveOrUpdate,
  removeByIds,
  resetPassword,
  listAllTreeRoleByUser,
  grantRole
} from '@/api/user'
// 角色
import { list as getRoleList } from '@/api/role'
// 部门
import { list as getDeptList } from '@/api/dept'
// 岗位
import { list as getPostList } from '@/api/post'

import { getCheckedId } from '@/utils/index.js'

export default {
  components: { Treeselect },
  data() {
    const rePassword = (rule, value, callback) => {
      if (value) {
        console.log(value)
        if (this.form.password !== value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    const rePassword2 = (rule, value, callback) => {
      if (value) {
        console.log(value)
        if (this.form.password !== value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    return {
      tableData: [],
      roleListData: [],
      menuOptions: [],
      postListData: [],
      selectionList: [],
      dataRole: [],
      currentRow: undefined,
      defaultCheckedRoleKeys: [],
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      total: 0,
      search: {
        account: '',
        realName: '',
        current: 1,
        size: 10
      },
      dialogVisibility: false,
      dialogVisibilityResetPassword: false,
      dialogVisibilityRole: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      form: {
        status: '1',
        sex: '1'
      },
      title: '',
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        rePassword: [
          { required: true, validator: rePassword, trigger: 'blur' }
        ],
        rePassword2: [
          { required: true, validator: rePassword2, trigger: 'blur' }
        ],
        deptId: [{ required: true, message: '请选择部门', trigger: 'change' }],
        postId: [{ required: true, message: '请选择岗位', trigger: 'change' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
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
      this.title = '新增用户'
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
      this.search.account = ''
      this.search.realName = ''
      this.search.current = 1
      this.init()
    },
    handleSizeChange(val) {
      this.search.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.search.current = val
      this.getUserList()
    },
    resetForm() {
      this.form = {
        password: undefined,
        sort: 1,
        status: '1',
        sex: '1'
      }
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          saveOrUpdate(this.form).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisibility = false
              this.init()
            }
          })
        }
      })
    },
    submitFormResetPassword() {
      this.$refs['formResetPassword'].validate(valid => {
        if (valid) {
          resetPassword(this.form).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisibilityResetPassword = false
              this.init()
            }
          })
        }
      })
    },
    submitFormRole() {
      const data = { userIds: this.currentRow.id, roleIds: this.$refs.treeRole.getCheckedKeys().join(',') }
      grantRole(data).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogVisibilityRole = false
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
      this.dialogVisibilityResetPassword = false
      this.dialogVisibilityRole = false
    },
    rowEdit(index, row) {
      this.dialogVisibility = true
      this.title = '编辑用户'
      this.form = row
    },
    rowReset(index, row) {
      this.dialogVisibilityResetPassword = true
      this.form = row
      this.form.password = ''
      this.form.rePassword = ''
    },
    rowRole(index, row) {
      this.dialogVisibilityRole = true
      this.currentRow = row
      this.listAllTreeRoleByUser(row)
    },
    rowRemoveByIds(index, row) {
      const that = this
      this.$confirm(
        '是否确认删除名称为"' + row.account + '"的数据项?',
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
      // 默认第一页
      this.search.current = 1
      this.getUserList()
      this.getRoleList()
      this.getDeptList()
      this.getPostList()
    },
    getUserList() {
      // this.listLoading = true
      // 分页查询用户
      getUserList(this.search).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        //   this.listLoading = false
      })
    },
    listAllTreeRoleByUser(row) {
      // this.listLoading = true
      // 分页查询用户
      listAllTreeRoleByUser(row).then(response => {
        this.dataRole = response.data
        this.defaultCheckedRoleKeys = getCheckedId(this.dataRole)
        //   this.listLoading = false
      })
    },
    removeByIds(ids) {
      // 删除用户
      removeByIds(ids).then(response => {
        //   this.listLoading = false
      })
    },
    getRoleList() {
      getRoleList({}).then(response => {
        this.roleListData = response.data
      })
    },
    getDeptList() {
      getDeptList({}).then(response => {
        const menu = { id: -1, deptName: '主类目', children: [] }
        menu.children = response.data
        this.menuOptions = []
        this.menuOptions.push(menu)
      })
    },
    getPostList() {
      getPostList({}).then(response => {
        this.postListData = response.data.records
      })
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.deptName,
        children: node.children
      }
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
