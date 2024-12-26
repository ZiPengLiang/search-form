<template>
    <component
        :is="componentType"
        v-model.trim="formData"
        v-bind="{ ...handleSearchProps, ...placeholder, clearable }"
        :data="optionType === 'tree-select' ? optionsEnum : []"
        :options="['cascader', 'select-v2'].includes(optionType) ? optionsEnum : []"
    >
        <template v-if="optionType === 'cascader'" #default="{ data }">
            <span>{{ data[fieldNames.label] }}</span>
        </template>
        <template v-if="optionType === 'select'">
            <component
                :is="`el-option`"
                v-bind="childProps"
                v-for="(col, index) in optionsEnum"
                :key="index"
                :label="col[fieldNames.label]"
                :value="col[fieldNames.value]"
            ></component>
        </template>
        <template v-if="optionType == 'radio-group'">
            <component
                v-bind="childProps"
                :is="childOptionType"
                v-for="(col, index) in optionsEnum"
                :key="index"
                :value="col[fieldNames.value]"
                :label="col[fieldNames.label]"
            ></component>
        </template>
    </component>
</template>

<script setup>
const props = defineProps({
    optionType: {
        type: String,
        default: 'input',
    },
    config: {
        type: Object,
        default: () => ({}),
    },
    options: {
        type: Array,
        default: () => [],
    },
    childConfig: {
        type: Object,
        default: () => null,
    },
});
const formData = defineModel();
const componentType = computed(() => {
    return `el-${props.optionType}`;
});

const fieldNames = computed(() => {
    return {
        label: props.config?.props?.label || 'label',
        value: props.config?.props?.value || 'value',
        children: props.config?.props?.children || 'children',
    };
});
const childOptionType = computed(() => {
    if (props.optionType === 'radio-group') {
        let type = props.childConfig?.optionType ?? 'radio';
        return `el-${type}`;
    }
    return props.childConfig?.optionType;
});
const childProps = computed(() => {
    return props.childConfig?.config ?? {};
});
const optionsEnum = computed(() => {
    let list = props.options;
    if (!list.length) return [];
    if (props.optionType === 'select-v2' && props.config.props) {
        list = list.map((item) => {
            return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] };
        });
    }
    return list;
});

const handleSearchProps = computed(() => {
    const label = fieldNames.value.label;
    const value = fieldNames.value.value;
    const children = fieldNames.value.children;
    const searchEl = props.optionType;
    let searchProps = props.config ?? {};
    if (searchEl === 'tree-select') {
        searchProps = { ...searchProps, props: { ...searchProps, label, children }, nodeKey: value };
    }
    if (searchEl === 'cascader') {
        searchProps = { ...searchProps, props: { ...searchProps, label, value, children } };
    }
    return searchProps;
});
// 处理默认 placeholder
const placeholder = computed(() => {
    const config = props.config;
    if (['datetimerange', 'daterange', 'monthrange'].includes(config.type)) {
        return {
            rangeSeparator: config.rangeSeparator ?? '至',
            startPlaceholder: config.startPlaceholder ?? '开始时间',
            endPlaceholder: config.endPlaceholder ?? '结束时间',
        };
    }
    const placeholder = config.placeholder ?? (props.optionType.includes('input') ? '请输入' : '请选择');
    return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
    const config = props.config;
    return config.clearable || false;
});
</script>
