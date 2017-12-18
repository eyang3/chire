<template>
    <main>
        <v-text-field label="Title" class="input-group--focused" v-model="title" required></v-text-field>
        <v-text-field label="Salary -- Visible only to evaluators" class="input-group--focused" v-model="value"></v-text-field>
        <vue-editor v-model="content" placeholder="Position Description"></vue-editor>
        <br>
        <v-layout row>
            
            <v-flex xs8>
                <v-btn  color="primary" class="blue--text darken-1"  v-on:click="save">Save</v-btn>
            </v-flex>
            <v-flex xs4>

            </v-flex>
        </v-layout>
    </main>
</template>

<script>
import { VueEditor } from "vue2-editor";
var axios = require("axios");
var _ = require("lodash");

export default {
  components: {
    VueEditor
  },
  methods: {
    save: function() {
      var url = "/api/ar/job";
      if (this.id != null) {
        url = "/api/ar/job/" + this.id;
      }
      axios
        .put(url, {
          withCredentials: true,
          title: this.title,
          salary: this.value,
          body: this.content
        })
        .then(response => {
          var resp = JSON.parse(response.data.message);
          this.id = resp.id;
        });
    }
  },
  mounted: function() {
    this.$root.$on("create", () => {
      this.id = null;
      this.title = "";
      this.content = "";
      this.value = null;
    });
  },
  data() {
    return {
      id: null,
      title: "",
      content: "",
      value: 10
    };
  }
};
</script>
