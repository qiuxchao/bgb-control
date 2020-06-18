<template>
  <!-- 修改数据 -->
  <section id="edit-data">
    修改数据

  </section>
</template>

<script>
export default {
  name: "EditData",
  data() {
      return {
      total: 123,   // 数据总条数（length）
      pageSize: 10, // 每页条数
      currentPage: 1,  // 当前显示的页
      }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    }
  }
};
</script>


<style lang="scss" scoped>
    #edit-data {
        color: #000;
    }
</style>

