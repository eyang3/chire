<template>
    <v-app light>
        <v-toolbar fixed>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
    </v-app>
</template>

<script>

export default {
    data: () => ({
        title: 'Chire -- A better way to hire',
    }),
    methods: {
        navigate: function(item) {
            this.$router.push({ path: '/app/' + item.page });

        }
    }

}
</script>
