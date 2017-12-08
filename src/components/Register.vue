<template>
    <v-app light>
        <v-toolbar fixed>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <main>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <v-layout column align-center>
                        <div class="subheader">Register an Account</div>

                        <v-container fluid>
                            <v-layout row>                                
                                <v-flex xs4>
                                </v-flex>
                                <v-flex xs4>
                                    <v-text-field  label="Email" v-model="email" :rules="[rules.email]"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>                                
                                <v-flex xs4>
                                </v-flex>
                                <v-flex xs4>
                                    <v-text-field v-model="password" name="password" :rules="[rules.match]" label="Password" id="testing" :append-icon="e1 ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>                                
                                <v-flex xs4>
                                </v-flex>
                                <v-flex xs4>
                                    <v-text-field v-model="passwordverify" name="verify" :rules="[rules.match]" label="Verify Password" id="testing" :append-icon="e2 ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <div style="color: red">{{error}}</div>
                            <v-layout row>
                                <v-flex xs4>
                                </v-flex>
                                <v-flex xs8>
                                    <v-btn color="primary" @click.native="revert" :disabled = "!pass">Register</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>>

                    </v-layout>
                </v-slide-y-transition>
            </v-container>
        </main>
        <v-footer :fixed="fixed">
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
var axios = require("axios");

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      items: [{ icon: "bubble_chart", title: "Inspire" }],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "Chire -- A better way to hire",
      email: "",
      error: '',
      password: "",
      passwordverify: "",
      e1: true,
      e2: true,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          if (value == null) {
            return true;
          }
          return this.pattern.test(value) || "Invalid e-mail.";
        },
        match: () => {
          return (
            this.password == this.passwordverify || "Passwords Don't Match"
          );
        }
      }
    };
  },
  methods: {
    revert: function() {
      axios
        .post("/api/create", { username: this.email, password: this.password })
        .then(response => {
          if(response.data.status == 'success') {
              this.error = '';
              this.$cookies.set("auth", response.data.message);
              this.$router.push('/app');
          } else{
              this.error = response.data.message;
          }
        });
    }
  },
  computed: {
    pass: function() {
      return (
        this.password == this.passwordverify && this.pattern.test(this.email)
      );
    }
  }
};
</script>

<style lang="stylus">
@import '../stylus/main';
</style>
