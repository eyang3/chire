import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import VueCookie from 'vue-cookie';
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import AdminPanel from './components/AdminPanel.vue'
import ViewAllPositions from './components/ViewAllPositions.vue'
import Create from './components/Create.vue'
import ManageContacts from './components/ManageContacts.vue'
import Organization from './components/Organization.vue'
import Settings from './components/Settings.vue'
import ApplyJob from './components/ApplyJob.vue'
import Dropzone from 'vue2-dropzone'
import Unauthorized from './components/Unauthorized.vue'
import Redirect from './components/Redirect.vue'
import SearchJobs from './components/SearchJobs.vue'
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Dropzone);
Vue.use(VueCookie);
Vue.use(require('vue-cookies'))


const routes = [
  { path: '/unauthorized', component: Unauthorized },
  { path: '/externLink/:token', component: Redirect },
  { path: '/login', component: Login },
  { path: '/login/:token', component: Login },
  { path: '/register', component: Register },
  {
    path: '/app/', component: AdminPanel, children: [{
      path: 'create', component: Create
    }, {
      path: 'apply/:id', component: ApplyJob
    }, {
      path: 'create/:id', component: Create
    }, {
      path: 'viewPostedJobs', component: ViewAllPositions
    }, {
      path: 'manageContacts', component: ManageContacts
    }, {
      path: 'organization', component: Organization
    }, {
      path: 'settings', component: Settings
    }, {
      path: 'searchjobs', component: SearchJobs
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
