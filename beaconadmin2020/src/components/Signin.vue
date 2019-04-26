<template>
   <v-container>
      
		
     
            <v-flex xs12 sm6 offset-sm3> <h1>Sign In</h1>  </v-flex>
        <v-layout row  v-if="error">
           <v-flex xs12 sm6 offset-sm3>
               <app-alert @dismissed="onDismissed" :text="error"></app-alert>
           </v-flex>
       </v-layout>
       <v-layout>
           <v-flex xs12 sm6 offset-sm3>
               <v-card>
                   <v-card-text>
                       <v-container>
                           <form @submit.prevent="onSignin">
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
                                       <v-btn color="red darken-4"  type="submit" :disabled="loading" :loading="loading">
                                           <span style="color:white">Sign in</span></v-btn>
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
        }
    },
    created(){
            // this.$store.dispatch('receiveRealtimeUserDatabase')
    },
    computed:{
        user() {
            return this.$store.getters.user
        },
        get(){
            return this.$store.state.user
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
        onSignin() {
            // Vuex
            // console.log({email: this.email, password: this.password, comfirmPassword:this.comfirmPassword})
            console.log("signin")
           
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        },
        onDismissed(){
            console.log("dismissed Alert")
            this.$store.dispatch('clearError')
        }
    }
}
</script>
