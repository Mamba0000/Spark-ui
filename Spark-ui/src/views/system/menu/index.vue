<template>
  <div class="app-container">
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">菜单管理</span></el-col>
      <el-col :span="2" />
      <el-col :span="6" :offset="12">
        <el-button
          style="float: right;"
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增菜单</el-button></el-col>
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

    <!--- table-body  --->
    <div class="table-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        row-key="id"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :max-height="600"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: '有毒' }"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column label="#" type="index" width="50" />

        <el-table-column label="名称" width="160" prop="name">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="别名" width="120" prop="alias">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.alias }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编码" width="120" prop="code">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="路径" width="160" prop="path">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.path }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="80" prop="sort">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜单类型" width="80" prop="category">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否打开新页面" width="110" prop="isOpen">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.isOpen }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="80" prop="alias">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.remark }}</span>
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
              :disabled="!(scope.row.category == 1)"
              @click="rowAdd(scope.$index, scope.row)"
            >新增子项</el-button>
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
      :visible.sync="dialogVisibility"
      width="600px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        label-position="right"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单" prop="deptId">
              <treeselect
                v-model="form.parentId"
                placeholder="选择上级菜单"
                :options="menuOptions"
                :normalizer="normalizer"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜单类型">
              <el-radio-group v-model="form.category" size="mini">
                <template v-if="!form.id">
                  <div>
                    <el-radio-button label="1">目录</el-radio-button>
                    <el-radio-button label="2">菜单</el-radio-button>
                    <el-radio-button label="3">按钮</el-radio-button>
                  </div>
                </template>
                <template v-else>
                  <div>
                    <el-radio-button
                      label="1"
                      :disabled="form.category != 1"
                    >目录</el-radio-button>
                    <el-radio-button
                      label="2"
                      :disabled="form.category != 2"
                    >菜单</el-radio-button>
                    <el-radio-button
                      label="3"
                      :disabled="form.category != 3"
                    >按钮</el-radio-button>
                  </div> </template>>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="form.icon" placeholder="请输入菜单图标" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单状态" size="mini" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio-button label="1">启用</el-radio-button>
                <el-radio-button label="0">不启用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否隐藏" size="mini" prop="hidden">
              <el-radio-group v-model="form.hidden">
                <el-radio-button label="1">隐藏</el-radio-button>
                <el-radio-button label="0">不隐藏</el-radio-button>
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { tree, addOrUpdate, deleteLogic } from '@/api/menu'

export default {
  components: { Treeselect },
  data() {
    return {
      tableData: [],
      search: {},
      menuOptions: [],
      postListData: [],
      selectionList: [],
      dialogVisibility: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      form: {
        sort: 1,
        status: '1',
        category: '1',
        hidden: '0'
      },
      title: '',
      rules: {
        parentId: [
          { required: true, message: '上级菜单不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '菜单图标不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '显示排序不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '菜单状态不能为空', trigger: 'blur' }
        ],
        hidden: [
          { required: true, message: '是否隐藏不能为空', trigger: 'blur' }
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
      this.title = '新增菜单'
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
      this.search.current = 1
      this.init()
    },
    handleSizeChange(val) {
      this.search.size = val
      this.tree()
    },
    handleCurrentChange(val) {
      this.search.current = val
      this.tree()
    },
    resetForm() {
      this.form = {
        sort: 1,
        status: '1',
        category: '1',
        hidden: '0'
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
      this.title = '编辑菜单'
      this.form = row
      console.log(index, row)
    },
    rowAdd(index, row) {
      this.dialogVisibility = true
      this.title = '新增子项'
      this.resetForm()
      this.form.parentId = row.id
      console.log(index, row)
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
      this.tree()
    },
    tree() {
      tree(this.search).then(response => {
        this.tableData = response.data
        this.total = response.data.total
        this.menuOptions = []
        const menu = { id: 0, name: '顶级菜单', children: [] }
        menu.children = response.data
        this.menuOptions.push(menu)

        // this.menuOptions = response.data
      })
    },
    deleteLogic(ids) {
      deleteLogic(ids).then(response => {
        this.tree()
      })
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
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
