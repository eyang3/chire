import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'


import Login from './components/Login.vue'
import Register from './components/Register.vue'
import AdminPanel from './components/AdminPanel.vue'
import ViewAllPositions from './components/ViewAllPositions.vue'
import Create from './components/Create.vue'
import ManageContacts from './components/ManageContacts.vue'
import Organization from './components/Organization.vue'
import Settings from './components/Settings.vue'
import Apply from './components/Apply.vue'
import ApplyJob from './components/ApplyJob.vue'
import Dropzone from 'vue2-dropzone'

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Dropzone);
Vue.use(require('vue-cookies'))


const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/apply/:user', component: Apply, children: [
      { path: 'viewall', component: ViewAllPositions, props: true },
      { path: 'job/:job', component: ApplyJob },
      { path: 'settings', component: Settings }
    ]
  },
  {
    path: '/app/', component: AdminPanel, children: [{
      path: 'create', component: Create
    }, {
      path: 'viewPostedJobs', component: ViewAllPositions
    }, {
      path: 'manageContacts', component: ManageContacts
    }, {
      path: 'organization', component: Organization
    }, {
      path: 'settings', component: Settings
    }]
  },

]
const router = new VueRouter({ routes });

const app = new Vue({
  router,
  mounted: function () {
    console.log('mounted');
  }
}).$mount("#app");
