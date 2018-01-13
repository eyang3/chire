<template>
  <main>
    <v-card>
      <v-card-title>
        <center>
          <b>{{title}}</b>
        </center>
      </v-card-title>

      <v-card-text>
        <span v-html="body"></span>
        <hr>
        <br>
        <label>
          Upload Resume
          <input type="file" id="resume" name="resume" @change="addFile" />
        </label>
        <label>
          Upload Cover Letter (optional)
          <input type="file" name="cover" @change="addFile">
        </label>
      </v-card-text>
      <v-btn primary dark v-on:click="save">Apply</v-btn>
    </v-card>
    </div>
  </main>
</template>
<script>
import Dropzone from "vue2-dropzone";
import axios from "axios";
export default {
  components: {
    Dropzone
  },
  data() {
    return {
      formData: null,
      title: "My Job",
      body: ""
    };
  },
  methods: {
    addFile: function(e) {
      console.log(e.target.files[0]);
      this.formData.append("files[]", e.target.files[0]);
      this.formData.append("entity[]", e.target.name);
    },
    showSuccess: function(file) {
      console.log("A file was successfully uploaded");
    },
    save: function() {
      var formData = new FormData();
      var resume = document.querySelector("#resume");
      formData.append("resume", resume.files[0]);
            var imagefile = document.querySelector("#resume");
      formData.append("resume", imagefile.files[0]);
      axios
        .post(`/api/ar/testFile`, formData, {
          withCredentials: true,          
        })
        .then(result => {
          console.log(result);
        });
    }
  },
  mounted: function() {
    this.formData = new FormData();
    var id = this.$route.params.id;
    axios.get(`/api/ar/job/${id}`, { withCredentials: true }).then(result => {
      this.title = result.data.title;
      this.body = result.data.body;
    });
    console.log(id);
  }
};
</script>

