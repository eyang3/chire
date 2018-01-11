<template>
    <v-app id="app" :dark="dark">
    </v-app>
</template>
<script>
var axios = require("axios");

export default {
  mounted: function() {
    var token = this.$route.params.token;
    this.$cookie.set("token", token, 1);
    this.$router.push(`/login/${token}`);
  }
};
</script>
