<template>
    <main>
        <v-text-field label="Title" class="input-group--focused" v-model="Title" required></v-text-field>
        <v-text-field label="Salary -- Visible only to evaluators" class="input-group--focused" v-model="Salary"></v-text-field>
        <vue-editor v-model="content"></vue-editor>
        <v-layout row>
            <v-flex xs8>
                <button @click="save">Save</button>
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
    methods: {
        save: function() {
            console.log(this.content);
        }
    },
    data() {
        return {
            content: 'Hello world',
            value: 10
        }
    }

}
</script>
