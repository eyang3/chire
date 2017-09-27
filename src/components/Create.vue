<template>
    <main>
        <v-text-field label="Title" class="input-group--focused" v-model="Title" required></v-text-field>
        <v-text-field label="Salary -- Visible only to evaluators" class="input-group--focused" v-model="Salary"></v-text-field>
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
import vueSlider from '../../node_modules/vue-slider-component/src/vue2-slider.vue';

export default {
    components: {
        VueEditor,
        vueSlider
    },
    data() {
        return {
            content: 'Hello world',
            value: 10
        }
    }

}
</script>
