<template>
    <main>
           <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details ></v-text-field>
            </v-card-title>
            <v-data-table  v-bind:search="search" v-model="selected" 
            v-bind:headers="headers" 
            v-bind:items.sync="items" v-bind:total-items.sync="totalItems" select-all v-bind:pagination.sync="pagination" selected-key="name" class="elevation-1">
                <template slot="headers" scope="props">
                    <tr>
                        <th>
                            <v-checkbox primary hide-details @click.native="toggleAll" :input-value="props.all" :indeterminate="props.indeterminate"></v-checkbox>
                        </th>
                        <th v-for="header in props.headers" :key="header.text" :class="['text-xs-right', 'column sortable', pagination.descending ? 'desc' : 'asc', 
                        header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
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
      },
      selected: [],
      headers: [
        { text: "Title", value: "title" },
        { text: "Category", value: "category" },
        { text: "Keywords", value: "keywords" }
      ],
      items: [],
      cache: [],
      pageStart: 0,
      totalItems: 0,
      cacheSize: 100
    };
  },
  watch: {
    pagination: {
      handler() {
          let page = this.pagination.page;
          let rowsPerPage = this.pagination.rowsPerPage;
          let pageRange = (this.cacheSize / rowsPerPage);
          if((page < this.pageStart) || (page > (this.pageStart + pageRange))) {
          }  else {
              this.items = this.cache.slice((page - 1) * rowsPerPage, page * rowsPerPage);
          }       
      },
      deep: true
    }
  },

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    changeSort(column) {
      console.log(column);
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
      //this.items = result.data.data.pages;
      console.log(this.pagination)
      this.cache = result.data.pages;
      this.items = this.cache.slice(0,this.pagination.rowsPerPage);
      this.totalItems = result.data.totalRecords;
    });
  }
};
</script>