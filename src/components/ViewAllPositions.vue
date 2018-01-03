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
        sortBy: ""
      },
      selected: [],
      headers: [
        { text: "Title", value: "title" },
        { text: "Category", value: "category" },
        { text: "Keywords", value: "keywords" },
        { text: "Actions", value: "actions" }
      ],
      items: [],
      cache: [],
      lastSort: "",
      pageStart: 1,
      lastDirection: false,
      totalItems: 0,
      cacheSize: 10
    };
  },
  watch: {
    pagination: {
      handler() {
        let page = this.pagination.page;
        let rowsPerPage = this.pagination.rowsPerPage;
        let pageRange = this.cacheSize / rowsPerPage;
        let currentPageStart =
          Math.floor((page - 1) / (this.cacheSize / rowsPerPage)) + 1;
        let dir = "ASC";
        if (this.pagination.descending) {
          dir = "DESC";
        }

        if (
          currentPageStart != this.pageStart ||
          this.pagination.sortBy != this.lastSort ||
          this.pagination.descending != this.lastDirection
        ) {
          this.lastSort = this.pagination.sortBy;
          this.lastDirection = this.pagination.descending;
          axios
            .get(
              `/api/ar/ListMyJobs?page=${currentPageStart}&pageSize=${this
                .cacheSize}&sortBy=${this.pagination.sortBy}&dir=${dir}`,
              { withCredentials: true }
            )
            .then(result => {
              this.cache = result.data.pages;
              let subPage =
                (page - 1) % Math.floor(this.cacheSize / rowsPerPage);
              this.items = this.cache.slice(
                subPage * rowsPerPage,
                (subPage + 1) * rowsPerPage
              );
            });
        } else {
          let subPage = (page - 1) % Math.floor(this.cacheSize / rowsPerPage);
          this.items = this.cache.slice(
            subPage * rowsPerPage,
            (subPage + 1) * rowsPerPage
          );
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
    axios
      .get(`/api/ar/ListMyJobs?pageSize=${this.cacheSize}`, {
        withCredentials: true
      })
      .then(result => {
        this.cache = result.data.pages;
        this.items = this.cache.slice(0, this.pagination.rowsPerPage);
        this.totalItems = result.data.totalRecords;
      });
  }
};
</script>