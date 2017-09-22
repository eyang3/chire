<template>
    <main>
        <v-container fluid>
            <v-slide-y-transition mode="out-in">
                <v-layout row wrap align-center>
                    <v-flex></v-flex>
                    <v-flex>
                        <center>
                            <img src="/public/v.png" alt="Chire" class="mb-5" />
                        </center>
                        <v-text-field label="Email" class="input-group--focused" required></v-text-field>
                        <v-text-field label="Password" class="input-group--focused" type="password" required></v-text-field>
                        <v-spacer></v-spacer>
                        <center>
                            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Login</v-btn>
                            <v-btn class="blue--text darken-1" flat v-on:click="createAccount">Create New Account</v-btn>
                        </center>
                    </v-flex>
                    <v-flex></v-flex>
                </v-layout>
            </v-slide-y-transition>
        </v-container>
    </main>
</template>

<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                { icon: 'bubble_chart', title: 'Inspire' }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Chire'
        }
    },
    methods: {
        createAccount() {
            this.$router.push('/register');
        }
    }
}
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>
