<template>
  <div class="app-container">
    <el-card
      class="box-card"
      shadow="never"
      style="border: 0"
      body-style="background-color: #f3f3f3;padding: 10px 0 0; "
    >
      <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        >新增用户</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        >导出用户
        </el-button>
      </div>
    </el-card>

    <div class="table-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        border="true"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column label="#" type="index" width="50" />

        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="180">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="180">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="180">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.sexName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生日" width="180" :formatter="dateFormat">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
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
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { list as getUserList } from '@/api/user'
export default {
  data() {
    return {
      tableData: [],
      search: {
        account: '',
        current: 1,
        size: 10,
        tenantId: '000000'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    init() {
      this.list()
    },
    list() {
      // this.listLoading = true
      getUserList(this.search).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        //   this.listLoading = false
      })
    },
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
.table-body {
  margin-top: 0px;
}
</style>
