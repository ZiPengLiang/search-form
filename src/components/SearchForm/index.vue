<template>
    <div class="search-component">
        <el-form :inline="true" :model="formData" ref="searchFormRef" class="search-form-content">
            <el-row>
                <el-col :span="getSpan(item)" v-for="item in formOptions" :key="item.prop">
                    <el-form-item :label="item.label" :prop="item.prop">
                        <SearchFormItem
                            v-model="formData[item.prop]"
                            :option-type="item.optionType"
                            :config="item.config"
                            :options="item.options || []"
                            :childConfig="item?.childConfig || null"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="width: 100%">
                        <div class="btn-container">
                            <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
                            <el-button :icon="Refresh" @click="handleReset">重置</el-button>
                            <el-button type="success" :icon="Download" @click="handleDownload" v-if="export">导出</el-button>
                            <el-button link type="primary" @click="handleCollapse" v-if="showCollapse">
                                {{ isCollapse ? '展开' : '收起' }}
                                <el-icon v-if="isCollapse" style="margin-left: 5px"><ArrowDownBold /></el-icon>
                                <el-icon v-else style="margin-left: 5px"><ArrowUpBold /></el-icon>
                            </el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script setup>
import { Search, Refresh, ArrowUpBold, ArrowDownBold, Download } from '@element-plus/icons-vue';
import SearchFormItem from './SearchFormItem.vue';
const props = defineProps({
    // 是否显示导出按钮
    export: {
        type: Boolean,
        default: false,
    },
    // 查询条件配置
    options: {
        type: Array,
        default: () => [],
    },
});
const emits = defineEmits(['search', 'export']);
// 查询条件数据 -- 双向数据绑定
const formData = defineModel();
// 查询条件form实例
const searchFormRef = ref();
// 是否展开
const isCollapse = ref(true);
// 是否显示展开收起按钮
const showCollapse = computed(() => {
    var totalSpan = props.options.reduce((prev, cur) => {
        return prev + getSpan(cur);
    }, 0);
    return totalSpan > 24;
});

const formOptions = computed(() => {
    var options = props.options.map((item) => {
        return {
            ...item,
            span: getSpan(item),
        };
    });
    if (isCollapse.value) {
        let showSpan = 18;
        options = options.filter((item) => {
            if (showSpan >= item.span) {
                showSpan -= item.span;
                return true;
            }
            return false;
        });
    }
    return options;
});
const getSpan = (item) => {
    return item.span ? item.span : item.optionType == 'input' ? 6 : item.optionType == 'select' ? 6 : 7;
};
const handleSearch = () => {
    emits('search');
};
const handleReset = () => {
    if (searchFormRef.value) {
        searchFormRef.value.resetFields();
    }
};
const handleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};
const handleDownload = () => {
    emits('export');
};
</script>
<style scoped lang="scss">
.search-component {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    padding-bottom: 0;
    background-color: #fff;
    margin-bottom: 10px;
    .search-form-content {
        .el-form-item {
            width: 100%;
            box-sizing: border-box;
            margin-right: 0;
            padding-right: 10px;
        }
        .btn-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
