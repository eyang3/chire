<template>
    <v-app light>
        <v-navigation-drawer class="pb-0" permanent clipped height="100%" light>
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
        <v-toolbar fixed>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
    </v-app>
</template>

<script>
var axios = require("axios");
var _ = require("lodash");

export default {
  data: () => ({
    title: "Chire -- A better way to hire",
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
    ],
    settings: []
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
          this.items = _.filter(this.items, (item) => {
              if(response.data.indexOf(item.page) != -1) {
                  return true;
              }
              return false;
          })
      });
  }
};
</script>

<style lang="stylus">
#contacts {
    main .container {
        height: 660px;
    }
}
</style>