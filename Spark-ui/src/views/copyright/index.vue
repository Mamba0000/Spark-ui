<template>
  <div>
    <div class="line" />
    <el-row type="flex" justify="middle" align="middle">
      <el-col
        :span="24"
        :offset="0"
        justify="middle"
        align="middle"
      ><span>
        Copyright ©  李益成 - Spark - 2021</span></el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.line {
  height: 20px;
  border-bottom: 1px dashed;
  border-color:rgba(170,170,170);
  margin-bottom: 10px;
}

span {
  color: rgba(0,0,0,45);
  font-size: 15px;
  color: rgba(170,170,170);
  margin-bottom: 50px;
}
</style>
