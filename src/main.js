import { createApp } from 'vue'
import App from './App.vue'
import useElementPlus from './plugins/element';
import SearchForm from './components/SearchForm';
const app = createApp(App);
useElementPlus(app);
app.use(SearchForm);
app.mount('#app')
