<template>
    <main>
           <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details ></v-text-field>
            </v-card-title>
            <v-data-table  v-bind:search="search" v-model="selected" v-bind:headers="headers" v-bind:items.sync="items" select-all v-bind:pagination.sync="pagination" selected-key="name" class="elevation-1">
                <template slot="headers" scope="props">
                    <tr>
                        <th>
                            <v-checkbox primary hide-details @click.native="toggleAll" :input-value="props.all" :indeterminate="props.indeterminate"></v-checkbox>
                        </th>
                        <th v-for="header in props.headers" :key="header.text" :class="['text-xs-right', 'column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
                            <v-icon>arrow_upward</v-icon>
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
                <template slot="items" scope="props">
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                        <td>
                            <v-checkbox primary hide-details :input-value="props.selected"></v-checkbox>
                        </td>
                        <td class="text-xs-right">{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.category }}</td>
                        <td class="text-xs-right">{{ props.item.keywords }}</td>            
                    </tr>
                </template>
            </v-data-table>
            </v-card>
    </main>
</template>

<script>
var axios = require("axios");
var _ = require("lodash");

export default {
  data() {
    return {
      search: "",
      pagination: {
        sortBy: "name"
      },
      selected: [],
      headers: [
        { text: "Title", value: "title"},
        { text: "Category", value: "category" },
        { text: "Keywords", value: "keywords" }
      ],
      items: []
    };
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  },
  mounted: function() {
    this.$emit("Hello");
    axios.get("/api/ar/ListMyJobs", { withCredentials: true }).then(result => {
      this.items = result.data;
    });
  }
};
</script>