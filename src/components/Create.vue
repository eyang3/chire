<template>

    <main>
      <div align="right" style="position: absolute; align: right; right: 15px">
        <v-alert color="success" dismissible transition="scale-transition" style="position:relative; z-index:100" v-model="showAlert">
          Job Added!
        </v-alert>
      </div>

        <v-text-field label="Title" class="input-group--focused" v-model="title" required></v-text-field>
        <v-text-field label="Category" class="input-group--focused" v-model="category"></v-text-field>
        <v-text-field label="Keywords" class="input-group--focused" v-model="keywords"></v-text-field>
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
          body: this.content,
          category: this.category,
          keywords: this.keywords
        })
        .then(response => {
          var resp = JSON.parse(response.data.message);
          this.showAlert = true;
          if (response.data.status === "success") {
            this.showAlert = true;
            this.showError = false;
          } else {
            this.showAlert = false;
            this.showError = true;
          }
          this.id = resp.id;
        });
    }
  },
  mounted: function() {
    this.$root.$on("create", () => {
      this.id = null;
      this.title = "";
      this.content = "";
      this.category = "";
      this.keywords = "";
      this.value = null;
    });
    console.log(this.$route);
    if (this.$route.params.id != null) {
      axios.get("/api/ar/job/" + this.$route.params.id).then(response => {
        this.id = response.data.id;
        this.title = response.data.title;
        this.content = response.data.body;
        this.category = response.data.category;
        this.keywords = response.data.keywords;
        this.value = response.data.salary;
      });
    }
  },
  data() {
    return {
      showAlert: false,
      showError: false,
      id: null,
      title: "",
      content: "",
      keywords: "",
      category: "",
      value: 10
    };
  }
};
</script>


