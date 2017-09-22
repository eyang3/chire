<template>
    <main>
        <v-text-field label="Title" class="input-group--focused" required></v-text-field>
        <vue-editor v-model="content"></vue-editor>
        <v-layout row>
            <v-flex xs8>
            </v-flex>
            <v-flex xs4>

            </v-flex>
        </v-layout>
    </main>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            content: 'Hello world'
        }
    }

}
</script>