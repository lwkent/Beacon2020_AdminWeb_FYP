<template>
   <v-container>
       <v-layout row  v-if="error">
           <v-flex xs12 sm6 offset-sm3>
               <app-alert @dismissed="onDismissed" :text="error"></app-alert>
           </v-flex>
       </v-layout>
            <v-flex xs12 sm6 offset-sm3> <h1>Sign Up</h1>  </v-flex>

       <v-layout>
           <v-flex xs12 sm6 offset-sm3>
               <v-flex xs12>
                   <v-spacer></v-spacer>
               </v-flex>
               <v-card>
                   <v-card-text>
                       <v-container>
                           <form @submit.prevent="onSignup">
                               <v-layout row>
                                   <v-flex xs12>
                                      <v-text-field
                                      name="email"
                                      label="Mail"
                                      id="email"
                                      v-model="email"
                                      type="email"
                                      required></v-text-field>          
                                   </v-flex>
                               </v-layout>
                               <v-layout row>
                                   <v-flex xs12>
                                      <v-text-field
                                      name="password"
                                      label="Password"
                                      id="password"
                                      v-model="password"
                                      type="password"
                                      required></v-text-field>          
                                   </v-flex>
                               </v-layout>
                                <v-layout row>
                                   <v-flex xs12>
                                      <v-text-field
                                      name="comfirmPassword"
                                      label="Comfirm Password"
                                      id="comfirmPassword"
                                      v-model="comfirmPassword"
                                      type="password"
                                      :rules="comparePassword"></v-text-field>          
                                   </v-flex>
                               </v-layout>
                               <v-layout row>
                                   <v-flex xs12>
                                       <v-btn color="red darken-4" type="submit" :disabled="loading" :loading="loading">
                                            <span style="color:white">Sign up</span>

                                       </v-btn>
                                   </v-flex>
                               </v-layout>
                           </form>
                         </v-container>
                    </v-card-text>
                </v-card>

           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
export default {
    data() {
        return{
            email: '',
            password: '',
            comfirmPassword: '',
        }
    },
    computed:{
        comparePassword(){
            return this.password !== this.comfirmPassword ? "x" : ''
        },
        get(){
            return this.$store.state.user
        },
        user() {
            return this.$store.getters.user
        },
        error() {
            return this.$store.getters.error
        },
        loading(){
             return this.$store.getters.loading
        }
    },
    watch: {
        user (value){
            if (value!== null && value !== undefined){
                // this.$router.push('/')
            }
        }
    },
    methods:{
        onSignup() {
            // Vuex
            console.log({email: this.email, password: this.password, comfirmPassword:this.comfirmPassword})
            console.log("signin")
            if( this.password !== this.comfirmPassword){
                console.log("wring")
               this.$store.dispatch("setPasswordIncorrectError" , "Incorrect Password !");
            }
            else
            {
                this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            }
           
        },
        onDismissed(){
            console.log("dismissed Alert")
            this.$store.dispatch('clearError')
        }
    }
}
</script>
