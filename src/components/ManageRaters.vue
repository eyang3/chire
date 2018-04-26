<template>

  <main>
    <v-dialog v-model="visible" max-width="1400">
      <v-card>
        <v-card-title class="headline">Invite Raters</v-card-title>
        <v-layout row wrap>
          <v-flex xs5 style="padding-left: 20px">
            <v-card>
              <v-card-text class="subheading">Current Contacts</v-card-text>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="pagination1.search" v-on:keyup="searchFunction1" append-icon="search" label="Search" single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table v-model="pagination1.selected" v-bind:headers="headers" v-bind:items.sync="pagination1.items" v-bind:total-items.sync="pagination1.totalItems" select-all v-bind:pagination.sync="pagination1.pagination" selected-key="name" class="elevation-1">
                <template slot="headers" scope="props">
                  <tr>
                    <th>
                      <v-checkbox primary hide-details @click.native="toggleAll" :input-value="props.all" :indeterminate="props.indeterminate"></v-checkbox>
                    </th>
                    <th v-for="header in props.headers" :key="header.text" :class="['text-xs-right', 'column sortable', pagination1.pagination.descending ? 'desc' : 'asc', 
                        header.value === pagination1.pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
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
                    <td class="text-xs-right">{{ props.item.email }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.label }}</td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>
          </v-flex>
          <v-flex xs2 class="text-xs-center">
            <v-btn @click.native="test2" style="left: -20px" small fab dark color="light-green">
              <v-icon dark>add</v-icon>
            </v-btn>
            <br>
            <v-btn @click.native="test" style="left: -20px" small fab dark color="red">
              <v-icon dark>remove</v-icon>
            </v-btn>

          </v-flex>
          <v-flex xs5>
            <v-card style="left: -30px">
              <v-card-text class="subheading">Selected Contacts</v-card-text>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="pagination2.search" append-icon="search" label="Search" single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table :search ="pagination2.search" v-model="pagination2.selected" v-bind:headers="headers" v-bind:items="pagination2.items" selected-key="name" class="elevation-1">
                <template slot="headers" scope="props">
                  <tr>
                    <th>
                      <v-checkbox primary hide-details @click.native="toggleAll" :input-value="props.all" :indeterminate="props.indeterminate"></v-checkbox>
                    </th>
                    <th v-for="header in props.headers" :key="header.text" :class="['text-xs-right', 'column sortable', pagination2.pagination.descending ? 'desc' : 'asc', 
                        header.value === pagination2.pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
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
                    <td class="text-xs-right">{{ props.item.email }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.label }}</td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>
          </v-flex>
        </v-layout>

        <v-card-actions>

          <v-layout row wrap justify-right>
            <v-flex xs3 offset-xs9>
              <v-card flat style="left: -20px">
                <p class="text-xs-right">
                  <v-btn primary dark @click.native="newContact">Send Request</v-btn>
                  <v-btn primary dark @click.native="cancel">Cancel</v-btn>
                </p>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
var axios = require("axios");
var _ = require("lodash");
import paginationHandler from "./paginationHandler.vue";
export default {
  props: ["visible", "currentid"],
  data() {
    return {
      contactHash: {},
      itemHash: {},
      pagination1: {
        search: "",
        dialog: false,
        pagination: {
          sortBy: "",
          searchTerm: "",
          refresh: false,
          triggered: false
        },
        selected: [],
        items: [],
        cache: [],
        triggered: false,
        lastSort: "",
        pageStart: 1,
        lastDirection: false,
        totalItems: 0,
        cacheSize: 50
      },
      pagination2: {
        search: "",
        dialog: false,
        pagination: {
          sortBy: "",
          searchTerm: "",
          refresh: false
        },
        selected: [],
        items: [],
        cache: [],
        triggered: false,
        lastSort: "",
        pageStart: 1,
        lastDirection: false,
        totalItems: 0,
        cacheSize: 50
      },

      headers: [
        { text: "Email", value: "email" },
        { text: "Name", value: "name" },
        { text: "Label", value: "label" }
      ]
    };
  },
  methods: {
    newContact: function() {
      var url = `/api/ar/evalrequest/${this.currentid}`;
      var ids = _.map(this.pagination2.items, i => {
        return i.contactref;
      });
      axios.post(url, ids);
      this.$emit("close", "Hello World");
    },
    cancel: function() {
      this.pagination2.items = [];
      this.contactHash = {};
      this.$emit("close");
    },
    searchFunction(e) {
      if (e.keyCode === 13) {
        this.pagination2.searchTerm = this.search;
        this.triggered = true;
      }
    },
    searchFunction1(e) {
      if (e.keyCode === 13) {
        this.pagination1.pagination.searchTerm = this.pagination1.search;
        this.pagination1.pagination.triggered = true;
      }
    },
    test2() {
      if (this.pagination1.items != null) {
        this.pagination1.selected.forEach(i => {
          if (this.contactHash[i.contactref] == null) {
            this.pagination2.items.push(i);
            this.contactHash[i.contactref] = 1;
          }
        });
      }
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.visible == true) {
          _.each(this.pagination1.items, i => {
            this.itemHash[i.id] = i;
          });
          axios.get(`/api/ar/evalrequest/${this.currentid}`).then(result => {
            console.log(this.itemHash);
            _.each(result.data, i => {
              this.pagination2.items.push(this.itemHash[i.id]);
            });
          });
        }
      }
    },
    "pagination1.pagination": {
      handler() {
        paginationHandler.paginationHander(
          this.pagination1,
          this.pagination1.pagination,
          "/api/ar/ListMyContacts"
        );
      },
      deep: true
    }
  },
  mounted: function() {
    this.pagination1.pagination.refresh = true;
    this.pagination1.cache = [];
    this.pagination1.totalItems = 0;
    this.pagination1.pageStart = 1;
  }
};
</script>
