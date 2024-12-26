<script setup>
const queryParams = ref({
  keyword: "",
});
const searchOptions = ref([
  {
    label: "关键字",
    prop: "keyword",
    span: 4,
    type: "input",
    placeholder: "请输入站点编号或名称",
  },
]);
const getPagedData = () => {
  console.log(queryParams.value);
};
</script>

<template>
  <div>
    <SearchForm
      v-model="queryParams"
      :options="searchOptions"
      @search="getPagedData"
    />
  </div>
</template>

<style scoped></style>
