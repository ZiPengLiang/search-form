import SearchForm from "./index.vue";
const components = [SearchForm];

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install,
};
