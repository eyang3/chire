<template>
    <main>
        <div>Job Listing {{ $route.params.job }}</div>
        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="showSuccess">
        </dropzone>
    </main>
</template>
<script>
import Dropzone from "vue2-dropzone";
export default {
  components: {
    Dropzone
  },

  methods: {
    showSuccess: function(file) {
      console.log("A file was successfully uploaded");
    }
  }
};
</script>

