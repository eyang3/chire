<template>
  <v-app id="app" :dark="dark">
    <v-navigation-drawer :width="200" v-model="primaryDrawer.model" :clipped="true" absolute overflow persistant app>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-divider v-if="item.page == 'organization'" :key="i"></v-divider>
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
          <v-list-tile v-else @click="navigate(item)" v-bind:style="stuff(item)" :key="i">
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
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'"></v-toolbar-side-icon>
      <v-toolbar-title>Chire -- A Better Way to Hire</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
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
    allRoutes: [
      { page: "create", icon: "add", text: "Create Position" },
      { page: "viewPostedJobs", icon: "content_copy", text: "View Positions" },
      { page: "manageContacts", icon: "contacts", text: "Manage Contacts" },
      { page: "toevaluate", icon: "show_chart", text: "Evaluate Resumes" },
      { page: "searchjobs", icon: "search", text: "My Jobs" },
      {
        page: "organization",
        icon: "supervisor_account",
        text: "Organization"
      },
      { page: "settings", icon: "settings", text: "Settings" }
      
    ],
    items: []
  }),
  methods: {
    navigate: function(item) {
      this.$root.$emit(item.page);
      //the date time forces refresh of the path if the same thing is clicked mulitple times
      this.$router.push({
        path: "/app/" + item.page + "?_=" + new Date().getTime()
      });
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].page === item.page) {
          this.items[i].border = {
            "border-left-style": "solid",
            "border-left-color": "limegreen",
            "border-left-width": "5px"
          };
        } else {
          this.items[i].border = null;
        }
      }
    },
    logout: function() {
      this.$cookie.delete("auth");
      this.$router.push({ path: "/login" });
    },
    stuff: function(item) {
      return item.border;
    }
  },
  mounted: function() {
    axios
      .get("/api/ar/functionsByRole", { withCredentials: true })
      .then(response => {
        this.items = _.filter(this.allRoutes, item => {
          if (response.data.indexOf(item.page) != -1) {
            return true;
          }
          return false;
        });
      })
      .catch(error => {
        this.$router.push({ path: "/login" });
      });
  },

  updated: function() {
    if (this.$route.matched.length == 1) {
      var m = _.find(this.items, i => {
        return i.page == "viewPostedJobs";
      });
      if (m != null) {
        this.$router.push({ path: "/app/viewPostedJobs" });
      }
    }
  }
};
</script>
