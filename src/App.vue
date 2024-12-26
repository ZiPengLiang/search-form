<script setup>
const queryParams = ref({
  keyword: "",
});
const secondQueryParams = ref({
  keyword: "",
  checkboxList: [],
  radio: "1",
  isUse: false,
  dateRange: [],
  date: ''
});
const searchOptions = ref([
  {
    label: "关键字",
    prop: "keyword",
    span: 4,
    optionType: "input",
    placeholder: "请输入站点名称",
  },
]);
const secondSearchOptions = ref([
  {
    label: "关键字",
    prop: "keyword",
    span: 4,
    optionType: "input",
    placeholder: "请输入名称",
  },
  {
    label: "类型",
    prop: "checkboxList",
    span: 4,
    optionType: "checkbox-group",
    options: [
      {
        label: "1类",
        value: "1",
      },
      {
        label: "2类",
        value: "2",
      },
      {
        label: "3类",
        value: "3",
        disabled: true,
      },
    ],
  },
  {
    label: "状态",
    prop: "radio",
    span: 3,
    optionType: "radio-group",
    options: [
      {
        label: "在线",
        value: "1",
      },
      {
        label: "离线",
        value: "2",
      },
    ],
    childConfig: {
      optionType: "radio-button",
    },
  },
  {
    label: "是否启用",
    prop: "isUse",
    span: 3,
    optionType: "switch",
  },
  {
    label: "时间选择",
    prop: "date",
    optionType: "date-picker",
    span: 4,
    config: {
      type: "date",
    },
  },
  {
    label: "时间范围",
    prop: "dateRange",
    optionType: "date-picker",
    span: 8,
    config: {
      type: "daterange",
      unlinkPanels: true,
      rangeSeparator: "To",
      startPlaceholder: "Start date",
      endPlaceholder: "End date",
    },
  },
  
]);
const getPagedData = () => {
  console.log(queryParams.value);
};
const getSecondPagedData = () => {
  console.log(secondQueryParams.value);
};
</script>

<template>
  <div>
    <SearchForm
      v-model="queryParams"
      :options="searchOptions"
      @search="getPagedData"
    />
    <SearchForm
      v-model="secondQueryParams"
      :options="secondSearchOptions"
      @search="getSecondPagedData"
    />
  </div>
</template>

<style scoped></style>
