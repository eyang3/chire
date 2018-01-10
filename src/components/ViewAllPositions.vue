<template>
  <main>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" v-on:keyup="searchFunction" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table v-model="selected" v-bind:headers="headers" v-bind:items.sync="items" v-bind:total-items.sync="totalItems" select-all v-bind:pagination.sync="pagination" selected-key="name" class="elevation-1">
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
            <td class="text-xs-right">{{ props.item.last_modified }}</td>
            <td class="text-xs-right">
              <router-link :to="editLink(props.item.id)">Edit</router-link>
              <router-link :to="editLink(props.item.id)">Applicants</router-link>
              <router-link :to="editLink(props.item.id)">Manage Raters</router-link>
            </td>

          </tr>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-btn primary dark v-on:click="del">Delete</v-btn>
      </div>
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
        sortBy: "",
        searchTerm: "",
        refresh: false
      },
      triggered: false,
      selected: [],
      headers: [
        { text: "Title", value: "title" },
        { text: "Category", value: "category" },
        { text: "Keywords", value: "keywords" },
        { text: "Last Updated", value: "last_modified" },
        { text: "Actions", value: "actions" }
      ],
      items: [],
      cache: [],
      lastSort: "",
      pageStart: 1,
      lastDirection: false,
      totalItems: 0,
      cacheSize: 50
    };
  },
  watch: {
    pagination: {
      handler() {
        let freeText = "";
        if (this.pagination.searchTerm != "") {
          freeText = `&freeText=${this.pagination.searchTerm}`;
        }
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
          this.pagination.descending != this.lastDirection ||
          this.triggered ||
          this.pagination.refresh
        ) {
          this.pagination.refresh = false;
          this.lastSort = this.pagination.sortBy;
          this.triggered = false;
          this.lastDirection = this.pagination.descending;
          axios
            .get(
              `/api/ar/ListMyJobs?page=${currentPageStart}&pageSize=${this
                .cacheSize}&sortBy=${this.pagination
                .sortBy}&dir=${dir}${freeText}`,
              { withCredentials: true }
            )
            .then(result => {
              this.totalItems = result.data.totalRecords;
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
    editLink: e => {
      return `/app/create/${e}`;
    },
    searchFunction(e) {
      if (e.keyCode === 13) {
        this.pagination.searchTerm = this.search;
        this.triggered = true;
      }
    },
    del() {
      var ids = _.map(this.selected, item => {
        return item.id;
      });
      axios.delete("/api/ar/job", { data: { ids: ids } }).then(result => {
        this.pagination.refresh = true;
      });
    },
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
    this.pagination.refresh = true;
  }
};
</script>

