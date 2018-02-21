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
        <hr> EEOC Questionaire

        <v-form>
          <br> Gender
          <br>
          <input type="radio" id="Male" value="Male" v-model="gender">
          <label for="Male">Male</label>
          <input type="radio" id="Female" value="Female" v-model="gender">
          <label for="Female">Female</label>
          <br>
          <br> Race
          <div v-for="r of races">
            <input type="radio" :id="r" :value="r" v-model="race">
            <label for="r">{{r}}</label>
          </div>

        </v-form>
        <hr>
        <br>
        <div class="input-group">
          <input type="text" :value="resumeFile" class="form-control" readonly>
          <span class="input-group-btn">
            <span class="btn btn-primary btn-file">
              Browse<input type="file" id="resumeFile" name="resumeFile" @change="(e) => {input(e, resumeFile)}" single>
            </span>
          </span>
        </div>
        </span>
        <div class="input-group">
          <input type="text" :value="coverFile" class="form-control" readonly>
          <span class="input-group-btn">
            <span class="btn btn-primary btn-file">
              Browse<input type="file" id="coverFile" name="coverFile" @change="(e) => {input(e, coverFile)}" single>
            </span>
          </span>
        </div>
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
      resumeFile: "Upload Resume",
      coverFile: "Upload Cover Letter (optional)",
      races: [
        "White (Non Hispanic or Latino)",
        "Black or African American (Not Hispanic or Latino)",
        "Native Hawaiian or Other Pacific Islander(Not Hispanic or Latino)",
        "Asian(Not Hispanic or Latino)",
        "American Indian or Alaska Native (Not Hispanic or Latino)",
        "Two or More Races (Not Hispanic or Latino)",
        "Hispanic or Latino",
        "I do not wish to disclose"
      ],
      gender: [],
      race: [],
      formData: null,
      title: "My Job",
      body: ""
    };
  },
  methods: {
    input: function(event, obj) {
      obj = event.target.files[0].name;
      this.$data[event.target.name] = event.target.files[0].name;
    },
    save: function() {
      var id = this.$route.params.id;
      var formData = new FormData();
      var resume = document.querySelector("#resumeFile");

      formData.append("resume", resume.files[0]);
      var cover = document.querySelector("#coverFile");
      formData.append("cover", cover.files[0]);
      formData.append("race", this.race);
      formData.append("gender", this.gender);
      axios
        .post(`/api/ar/apply/${id}`, formData, {
          withCredentials: true
        })
        .then(result => {
          console.log(result);
        });
    }
  },
  mounted: function() {
    this.formData = new FormData();
    var id = this.$route.params.id;
    axios
      .get(`/api/ar/JobApplication/${id}`, { withCredentials: true })
      .then(result => {
        this.title = result.data[0].title;
        this.body = result.data[0].body;
        this.race = result.data[0].eeoc_race;
        this.gender = result.data[0].eeoc_gender;
        if (result.data[0].resumename != null) {
          this.resumeFile = result.data[0].resumename;
        }
        if (result.data[0].covername != null) {
          this.coverFile = result.data[0].covername;
        }
      });
  }
};
</script>

