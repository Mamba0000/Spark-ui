<template>
  <div class="app-container">
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">组织部门管理</span></el-col>
      <el-col :span="2"/>
      <el-col :span="6" :offset="12">
        <el-button
          style="float: right;"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增组织部门
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
        <el-form-item label="组织部门名称">
          <el-input v-model="search.deptName" placeholder="请输入组织部门名称"></el-input>
        </el-form-item>
        <el-form-item label="组织部门全称">
          <el-input v-model="search.fullName" placeholder="请输入组织部门标识"></el-input>
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
        :max-height="600"
        row-key="id"
        :border="true"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        @selection-change="selectionChange"
        :tree-props="{ children: 'children', hasChildren: '有毒' }"
      >
        <el-table-column type="selection" width="55"/>

        <el-table-column label="#" type="index" width="50"/>

        <el-table-column label="名称" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="全称" width="160">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.fullName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="60">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="60">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.categoryId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="租户ID" width="120">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.tenantId }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="租户名称" width="120">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.tenantName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.remark }}</span>
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
              @click="rowAdd(scope.$index, scope.row)"
            >新增子项
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
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级组织部门" prop="parentId">
              <treeselect
                v-model="form.parentId"
                placeholder="选择上级组织部门"
                :options="menuOptions"
                :normalizer="normalizer"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织部门名称" prop="name">
              <el-input v-model="form.deptName" placeholder="请输入组织部门名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织部门全称" prop="value">
              <el-input v-model="form.fullName" placeholder="请输入组织部门全称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织部门类别" size="mini">
              <el-select v-model="form.categoryId" placeholder="请选择活动区域">
                <el-option label="公司" value="1"></el-option>
                <el-option label="部门" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="value">
              <el-input v-model="form.remark" placeholder="请输入备注"/>
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { list, saveOrUpdate, removeByIds } from '@/api/dept'

export default {
  components: { Treeselect },
  data() {
    return {
      tableData: [],
      selectionList: [],
      menuOptions: [],
      search: {
        deptName: '',
        fullName: '',
        current: 1,
        size: 10
      },
      dialogVisibility: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      form: {},
      title: '',
      rules: {
        parentId: [
          { required: true, message: '上级不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请输入组织部门名称', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '请输入组织部门全称', trigger: 'blur' }
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
      this.title = '新增组织部门'
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
      this.search.deptName = ''
      this.search.fullName = ''
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
      this.form = { categoryId: '1' }
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
    selectionChange(list) {
      this.selectionList = list
    },
    cancel() {
      this.dialogVisibility = false
    },
    rowEdit(index, row) {
      this.dialogVisibility = true
      this.title = '编辑组织部门'
      this.form = row
    },
    rowAdd(index, row) {
      this.dialogVisibility = true
      this.title = '新增子项'
      this.resetForm()
      this.form.parentId = row.id
      console.log(index, row)
    },
    rowRemoveByIds(index, row) {
      const that = this
      this.$confirm(
        '是否确认删除名称为"' + row.deptName + '"的数据项?',
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
      this.list()
    },
    list() {
      // this.listLoading = true
      // 分页查询组织部门
      list(this.search).then(response => {
        this.tableData = response.data
        this.menuOptions = []
        const menu = { id: 0, deptName: '顶级组织部门', children: [] }
        menu.children = response.data
        this.menuOptions.push(menu)
      })
    },
    removeByIds(ids) {
      // 删除组织部门
      removeByIds(ids).then(response => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/comm.scss';
</style>
