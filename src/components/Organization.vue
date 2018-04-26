<template>
    <main>
        <div>Organization</div>
        <iframe :src="file" style="width:600px; height:500px;" frameborder="0"></iframe>
        <v-container fluid>
            <v-layout row wrap>
                <v-select :items="items" v-model="selected" label="Select" single-line auto prepend-icon="map" hide-details></v-select>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>
<script>
export default {
  data() {
    return {
      selected: "",
      items: [{ text: "State 1" }, { text: "State 2" }]
    };
  },
  computed: {
    file: function() {
        if(this.selected.text == 'State 1') {
            return "/api/getfile"
        } else {
            return "/api/getfile2"

        }
    }
  }
};
</script>

