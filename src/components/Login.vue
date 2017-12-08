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
                        <v-text-field v-model="email" label="Email" class="input-group--focused" required></v-text-field>
                        <v-text-field v-model="password" label="Password" class="input-group--focused" type="password" required></v-text-field>
                        
                        <div style="color: red">{{error}}</div>
                        <v-spacer></v-spacer>
                        <center>
                            <v-btn  color="primary" class="blue--text darken-1"  v-on:click="login">Login</v-btn>
                            <v-btn  color="primary" class="blue--text darken-1"  v-on:click="createAccount">Create New Account</v-btn>
                        </center>                    
                    </v-flex>
                    <v-flex></v-flex>
                </v-layout>
            </v-slide-y-transition>
        </v-container>
    </main>
</template>

<script>
var axios = require("axios");
export default {
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            email: '',
            password: '',
            items: [
                { icon: 'bubble_chart', title: 'Inspire' }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Chire',
            error: ''
        }
    },
    methods: {
        createAccount() {
            this.$router.push('/register');
        }, 
        login() {            
            return axios.post("/api/login", {username: this.email, password:this.password})
                .then((response) => {
                    if(response.data.status === 'error') {
                        this.error = response.data.message;
                    } else {
                        this.error = '';
                        this.$cookies.set("auth", response.data.message);
                        this.$router.push('/app')
                    }
                })
        }


    }
}
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>
