<template>
  <div class="app-container">
    <!--- top-action  --->
    <el-row type="flex" class="top-action" justify="end" align="middle">
      <el-col
        :span="2"
        :offset="0"
      ><span style="float:left;">字典管理</span></el-col>
      <el-col :span="2"/>
      <el-col :span="6" :offset="12">
      </el-col>
      <el-col
        :span="2"
      >
      </el-col>
    </el-row>
    <el-container>
      <!-- 左-->
      <el-aside width="50%">
        <div>
          <!--- top-search  --->
          <div class="top-search2">
            <el-form :inline="true" :model="search" class="demo-form-inline">
              <el-form-item>字典</el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item>
                <el-button
                  style="float: right;"
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  @click="handleAdd"
                >新增字典
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="float: right;"
                  type="danger"
                  plain
                  icon="el-icon-close"
                  @click="handleBatchDelete"
                >批量删除
                </el-button>
              </el-form-item>
            </el-form>
            <el-divider content-position="left"></el-divider>
            <el-form :inline="true" :model="search" class="demo-form-inline">
              <el-form-item label="字典编号">
                <el-input v-model="search.code" placeholder="请输入字典编号"></el-input>
              </el-form-item>
              <el-form-item label="字典值{顶}">
                <el-input v-model="search.dictValue" placeholder="请输入字典值"></el-input>
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
              @row-click="rowClick"
              @selection-change="selectionChange"
            >
              <el-table-column type="selection" width="55"/>
              <el-table-column label="#" type="index" width="50"/>
              <el-table-column label="字典编号" width="100">
                <template slot-scope="scope">
                  <span size="medium">{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column label="字典KEY" width="80">
                <template slot-scope="scope">
                  <span size="medium">{{ scope.row.dictKey }}</span>
                </template>
              </el-table-column>
              <el-table-column label="字典值" width="180">
                <template slot-scope="scope">
                  <span size="medium">{{ scope.row.dictValue }}</span>
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
          </div>
        </div>
      </el-aside>

      <!-- 右-->
      <el-aside width="50%">
        <div>
          <!--- top-search  --->
          <div class="top-search3">
            <el-form :inline="true" :model="search" class="demo-form-inline">
              <el-form-item>字典项>></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item></el-form-item>
              <el-form-item>
                <el-button
                  style="float: right;"
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  @click="handleAdd2"
                >新增字典项
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="float: right;"
                  type="danger"
                  plain
                  icon="el-icon-close"
                  @click="handleBatchDelete(2)"
                >批量删除
                </el-button>
              </el-form-item>
            </el-form>
            <el-divider content-position="left"></el-divider>
          </div>
          <!--- table-body--->
          <div class="table-body2">
            <el-table
              :data="tableData2"
              style="width: 100%"
              :border="true"
              :header-cell-style="headerCellStyle"
              :cell-style="cellStyle"
              @selection-change="selectionChange"
            >
              <el-table-column type="selection" width="55"/>
              <el-table-column label="#" type="index" width="50"/>
              <el-table-column label="字典编号" width="100">
                <template slot-scope="scope">
                  <span size="medium">{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column label="字典KEY" width="80">
                <template slot-scope="scope">
                  <span size="medium">{{ scope.row.dictKey }}</span>
                </template>
              </el-table-column>
              <el-table-column label="字典值" width="180">
                <template slot-scope="scope">
                  <span size="medium">{{ scope.row.dictValue }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="rowEdit2(scope.$index, scope.row)"
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
          </div>
        </div>

      </el-aside>
    </el-container>
    <copyright/>

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
            <el-form-item label="字典编号" prop="code">
              <el-input
                v-model="form.code"
                :disabled="disabledCode"
                placeholder="请输入字典编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字典KEY" prop="dicKey">
              <el-input v-model="form.dictKey" placeholder="请输入字典KEY"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字典值" prop="dicValue">
              <el-input
                v-model="form.dictValue"
                placeholder="请输入字典值"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(type)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { list, saveOrUpdate, removeByIds } from '@/api/dict'

export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      type: 1,
      menuOptions: [],
      selectionList: [],
      currentRow: undefined,
      disabledCode: false,
      total: 0,
      search: {
        dictKey: '-1',
        current: 1,
        size: 10
      },
      dialogVisibility: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      form: {
        status: '1'
      },
      title: '',
      rules: {
        code: [
          { required: true, message: '请输入字典编号', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        dictKey: [
          { required: true, message: '请输入字典KEY', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
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
      this.title = '新增字典'
      this.form.parentId = '0'
    },
    handleAdd2() {
      this.resetForm()
      this.dialogVisibility = true
      this.title = '新增字典项'
      this.form.code = this.currentRow.code
      this.form.parentId = this.currentRow.id
      // this.disabledCode = true
      this.type = 2
      console.log(this.currentRow)
    },
    handleBatchDelete(type) {
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
            if (type === 2) {
              this.list2()
            } else {
              this.init()
            }
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
      this.search.dictValue = undefined
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
        dictKey: undefined,
        dictValue: undefined,
        code: undefined,
        current: undefined,
        size: undefined
      }
    },
    submitForm(type) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (type === 2) {
            this.form.code = this.currentRow.code
          }
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
    selectionChange(list) {
      this.selectionList = list
    },
    rowClick(row) {
      this.currentRow = row
      this.list2()
    },
    cancel() {
      this.dialogVisibility = false
    },
    rowEdit(index, row) {
      this.dialogVisibility = true
      this.title = '编辑字典'
      this.form = row
      console.log(index, row)
    },
    rowEdit2(index, row) {
      this.dialogVisibility = true
      this.title = '编辑字典项'
      this.form = row
      console.log(index, row)
      this.type = 2
    },
    rowRemoveByIds(index, row) {
      const that = this
      this.$confirm(
        '是否确认删除名称为"' + row.dictValue + '"的数据项?',
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
          if (row.dictKey !== -1) {
            this.list2()
          } else {
            this.init()
          }
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(function() {
        })
    },
    init() {
      this.list()
    },
    list() {
      // this.listLoading = true
      // 分页查询用户
      list(this.search).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        // 如果没有选中行 则选第一行
        if (!this.currentRow) this.currentRow = response.data.records[0]
        this.list2()
      })
    },
    list2() {
      // this.listLoading = true
      // 分页查询用户
      this.search2 = {}
      this.search2.code = this.currentRow.code
      this.search2.dictKey = undefined
      this.search2.size = 100
      this.search2.current = 1
      list(this.search2).then(response => {
        this.tableData2 = response.data.records.filter(item => item.dictKey !== -1)
      })
    },
    removeByIds(ids) {
      // 删除用户
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

.table-body {
  margin-top: 0px;
}

.el-pagination {
  text-align: center;
  margin-top: 15px;
}

</style>
