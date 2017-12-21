<template>
  <v-app id="app" :dark="dark">
    <v-navigation-drawer
      v-model="primaryDrawer.model"    
      :clipped="true"            
      absolute
      overflow
      app
    >
      <v-list dense>
                <template v-for="(item, i) in items">
                    <v-divider v-if="item.page == 'organization'"></v-divider>
                    <v-layout row v-if="item.heading" align-center :key="i">
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                   
                    <v-list-tile v-else @click="navigate(item)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute :clipped-left="true">    
      <v-toolbar-title>Chire -- A Better Way to Hire</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
var axios = require("axios");
var _ = require("lodash");
export default {
  data: () => ({
    dark: false,
    drawers: ["Permanent", "Persistent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "persistent",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      fixed: false
    },
    items: [
      { page: "create", icon: "add", text: "Create Position" },
      { page: "viewPostedJobs", icon: "content_copy", text: "View Positions" },
      { page: "manageContacts", icon: "contacts", text: "Manage Contacts" },
      { page: "toEvaluate", icon: "show_chart", text: "Evaluate Resumes" },
      { page: "searchjobs", icon: "search", text: "Search Jobs" },
      {
        page: "organization",
        icon: "supervisor_account",
        text: "Organization"
      },

      { page: "settings", icon: "settings", text: "Settings" }
    ]
  }),
  methods: {
    navigate: function(item) {
      this.$router.push({ path: "/app/" + item.page });
      this.$root.$emit(item.page);
    }
  },
  mounted: function() {
    axios
      .get("/api/functionsByRole", { withCredentials: true })
      .then(response => {
        this.items = _.filter(this.items, item => {
          if (response.data.indexOf(item.page) != -1) {
            return true;
          }
          return false;
        });
      });
  }
};
</script>