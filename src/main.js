import { createApp } from 'vue'
import App from './App.vue'
import useElementPlus from './plugins/element';
// import SearchForm from './components/SearchForm';
import SearchForm from '../my-search-form/my-search-form'
const app = createApp(App);
useElementPlus(app);

app.use(SearchForm);

app.mount('#app')
