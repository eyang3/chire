<template>

  <main>
    <v-dialog v-model="visible" max-width="1200">
      <v-card>
        <v-card-title class="headline">Invite Raters</v-card-title>
        <v-layout row wrap>
          <v-flex xs4 offset-xs1>
            <v-card>
              <v-card-text class="headline">Current Contacts</v-card-text>
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
                    <td class="text-xs-right">{{ props.item.email }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.label }}</td>
                    <td class="text-xs-right">
                      <a v-on:click="Contacts(props.item)">Edit</a>
                    </td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>
          </v-flex>
          <v-flex xs2 class="text-xs-center">
            
            <v-btn fab dark color="light-green">
              <v-icon dark>add</v-icon>
            </v-btn>
            <br>
            <v-btn fab dark color="red">
              <v-icon dark>remove</v-icon>
            </v-btn>
            
          </v-flex>
          <v-flex xs4>
            <v-card>
              <v-card-text class="headline">Selected Contacts</v-card-text>
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
                    <td class="text-xs-right">{{ props.item.email }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.label }}</td>
                    <td class="text-xs-right">
                      <a v-on:click="Contacts(props.item)">Edit</a>
                    </td>
                  </tr>
                </template>
              </v-data-table>

            </v-card>
          </v-flex>
        </v-layout>

        <v-card-actions>

          <v-layout row wrap justify-right>
            <v-flex xs3 offset-xs8>
              <v-card flat>
                <p class="text-xs-right">
                  <v-btn primary dark @click.native="newContact">Send Request</v-btn>
                  <v-btn primary dark @click.native="dialog = false">Cancel</v-btn>
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
  props: ["visible"],
  data() {
    return {
      search: "",
      dialog: false,
      pagination: {
        sortBy: "",
        searchTerm: "",
        refresh: false
      },
      selected: [],
      headers: [
        { text: "Email", value: "email" },
        { text: "Name", value: "name" },
        { text: "Label", value: "label" }
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
  methods: {
    newContact: function() {
      this.$emit("close", "Hello World");
    }
  },
  watch: {
    pagination: {
      handler: function() {},
      deep: true
    }
  },
  mounted: function() {
    this.pagination.refresh = true;
  }
};
</script>
