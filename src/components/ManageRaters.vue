<template>

  <main>        
    <v-dialog v-model="visible" max-width="290">
      <v-card>
        <v-card-title class="headline">Invite Raters</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="newContact">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
var axios = require("axios");
var _ = require("lodash");
import paginationHandler from "./paginationHandler.vue";
export default {
  props: ["visible"],
  data() {
    return {
      search: "",
      dialog: false,
      pagination: {
        sortBy: "",
        searchTerm: "",
        refresh: false
      },
      selected: [],
      headers: [
        { text: "Email", value: "email" },
        { text: "Name", value: "name" },
        { text: "Label", value: "label" }
      ],
      items: [],
      cache: [],
      lastSort: "",
      pageStart: 1,
      lastDirection: false,
      totalItems: 0,
      cacheSize: 50
    };
  },
  methods: {
    newContact: function() {
      this.$emit("close", "Hello World");
    }
  },
  watch: {
    pagination: {
      handler: function() {},
      deep: true
    }
  },
  mounted: function() {
    this.pagination.refresh = true;
  }
};
</script>
