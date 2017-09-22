<template>
    <v-app light>
        <v-toolbar fixed>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <main>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <v-layout column align-center>
                        <div class="subheader">Register an Account</div>

                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>User Name</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field  label="Email" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Password</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field name="password" label="Password" id="testing" :append-icon="e1 ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Verify Password</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field name="verify" label="Verify Password" id="testing" :append-icon="e2 ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                </v-flex>
                                <v-flex xs8>
                                    <v-btn flat v-on:click="revert">Register</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>>

                    </v-layout>
                </v-slide-y-transition>
            </v-container>
        </main>
        <v-footer :fixed="fixed">
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: true,
            drawer: true,
            fixed: false,
            items: [
                { icon: 'bubble_chart', title: 'Inspire' }
            ],
            miniVariant: true,
            right: true,
            rightDrawer: false,
            title: 'Chire -- A better way to hire',
            email: '',
            e1: true,
            e2: true,
            rules: {
                required: (value) => !!value || 'Required.',
                email: (value) => {
                    console.log(value);
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            },


            methods: {
                revert: function() {
                    this.$router.push('/login');
                }
            }
        }
    }
}
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>
