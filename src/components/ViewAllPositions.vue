<template>
    <main>
           <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details ></v-text-field>
            </v-card-title>
            <v-data-table  v-bind:search="search" v-model="selected" v-bind:headers="headers" v-bind:items="items" select-all v-bind:pagination.sync="pagination" selected-key="name" class="elevation-1">
                <template slot="headers" scope="props">
                    <tr>
                        <th>
                            <v-checkbox primary hide-details @click.native="toggleAll" :input-value="props.all" :indeterminate="props.indeterminate"></v-checkbox>
                        </th>
                        <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
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
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.sodium }}</td>
                        <td class="text-xs-right">{{ props.item.calcium }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
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
        {
          text: "Title",
          align: "left",
          value: "title"
        },
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
  mounted: () => {
    console.log("doing shit");
    axios.get("/api/ar/ListMyJobs", { withCredentials: true }).then(result => {
      console.log(result);
    });
  }
};
</script>