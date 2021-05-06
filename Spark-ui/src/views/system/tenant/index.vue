<template>
  <div class="app-container">
    <!--- top-action  --->
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">租户管理</span></el-col>
      <el-col :span="2" />
      <el-col :span="6" :offset="12">
        <el-button
          style="float: right;"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增租户</el-button></el-col>

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
    <el-row type="flex" class="top-search" justify="start" align="middle">
      <el-col
        :span="1"
        :offset="0"
      ><span style="float:left;">租户ID</span></el-col>

      <el-col :span="3">
        <el-input
          v-model="search.tenantId"
          size="small"
          placeholder="请输入租户ID"
          clearable
          @clear="handelSearch"
          @keyup.enter.native="handelSearch"
        /></el-col>

      <el-col :span="1" :offset="1">
        <span style="float:left;">名称</span></el-col>

      <el-col :span="3" :offset="0">
        <el-input
          v-model="search.tenantName"
          size="small"
          placeholder="请输入租户名称"
          clearable
          @clear="handelSearch"
          @keyup.enter.native="handelSearch"
        /></el-col>

      <el-col :span="1" :offset="1">
        <span style="float:left;">电话</span></el-col>

      <el-col :span="3" :offset="0">
        <el-input
          v-model="search.contactNumber"
          size="small"
          placeholder="请输入租户联系电话"
          clearable
          @clear="handelSearch"
          @keyup.enter.native="handelSearch"
        /></el-col>

      <el-col :span="2" :offset="0">
        <el-button
          style="float: right;"
          type="primary"
          icon="el-icon-search"
          @click="handelSearch"
        >搜索</el-button></el-col>

      <el-col
        :span="2"
      ><el-button
        style="float: right;"
        plain
        icon="el-icon-delete"
        @click="handleReseat"
      >重置</el-button></el-col>
    </el-row>
    <!--- table-body--->
    <div class="table-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column label="#" type="index" width="50" />

        <el-table-column label="租户ID" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="租户名称" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.tenantName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.linkman }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.contactNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column label="地址" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column label="域名" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.domain }}</span>
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
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="rowDeleteLogic(scope.$index, scope.row)"
            >删除</el-button>
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
            <el-form-item label="租户名称" prop="tenantName">
              <el-input
                v-model="form.tenantName"
                placeholder="请输入租户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="linkman">
              <el-input v-model="form.linkman" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input
                v-model="form.contactNumber"
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入联系地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绑定域名" prop="domain">
              <el-input v-model="form.domain" placeholder="请输入域名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用状态">
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
  </div>
</template>
<script>
import { list as getTenantList, addOrUpdate, deleteLogic } from '@/api/tenant'

export default {
  data() {
    var validatorPhone = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }

    return {
      tableData: [],
      menuOptions: [],
      selectionList: [],
      total: 0,
      search: {
        tenantId: '',
        tenantName: '',
        contactNumber: '',
        current: 1,
        size: 10
      },
      dailogVisibility: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      form: {
        status: '1'
      },
      title: '',
      rules: {
        tenantName: [
          { required: true, message: '请输入租户名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        contactNumber: [
          {
            required: true,
            validator: validatorPhone,
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        linkman: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入联系人地址', trigger: 'blur' },
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
      this.dailogVisibility = true
      this.title = '新增租户'
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
    handelSearch() {
      this.init()
    },
    handleReseat() {
      this.search.tenantId = ''
      this.search.tenantName = ''
      this.search.contactNumber = ''
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
        tenantName: undefined,
        domain: undefined,
        linkman: undefined,
        contactNumber: undefined,
        address: undefined,
        status: '1'
      }
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.form)
          addOrUpdate(this.form).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dailogVisibility = false
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
    selectionChange(list) {
      this.selectionList = list
    },
    cancel() {
      this.dailogVisibility = false
    },
    rowEdit(index, row) {
      this.dailogVisibility = true
      this.title = '编辑租户'
      this.form = row
      console.log(index, row)
    },
    rowDeleteLogic(index, row) {
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
      this.getTenantList()
    },
    getTenantList() {
      // this.listLoading = true
      // 分页查询用户
      getTenantList(this.search).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    deleteLogic(ids) {
      // 删除用户
      deleteLogic(ids).then(response => {
        //   this.listLoading = false
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

.table-body {
  margin-top: 0px;
}
.el-pagination {
  text-align: center;
  margin-top: 15px;
}
</style>
