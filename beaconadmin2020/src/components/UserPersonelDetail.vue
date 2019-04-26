
<template>
    <v-container grid-list-md text-xs-center pt-2  pb-4>
        <v-flex pt-4>
                <v-layout row wrap>
                    <v-flex md3 >
                        <v-card> 
                            <v-card-media  height="180px" contain><img style="height: 180px;width: 180px;" src="../assets/avatar.png"></v-card-media>
                        </v-card>
                    </v-flex>
                    <v-flex md8 class="text-md-left" pt-5>
                        <v-layout row wrap>
                            
                            <v-flex offset-md1 offset-xs1 xs12 md11 pb-0>
                                 <h2>{{checknull(getUserProfileContent.userName)}}</h2>
                            </v-flex>
                             <v-flex offset-md1 offset-xs1 xs12  md11 pt-0>
                                 <h4 style="font-style: italic;">Agent</h4>
                            </v-flex>
                            <v-flex offset-md1 offset-xs2 md5 pt-2>
                                <v-layout row wrap>
                                    <v-icon>email</v-icon>
                                    <v-flex offset-md1>
                                        <!-- <v-text-field :value="ProfileInformation.email" solo disabled></v-text-field> -->
                                         <h4>{{checknull(getUserProfileContent.userEmail)}}</h4> 
                                    </v-flex>
                                </v-layout>    
                            </v-flex>
                            <v-flex  md6 pt-2 pb-3>
                                <v-layout row wrap>
                                    <v-flex md2 xs2 pa-0 ><v-icon>phone</v-icon></v-flex>
                                    <v-flex md3  xs3 :style="center" pa-0 ><h4>Mobile</h4></v-flex><v-flex md1 xs1 pa-0 :style="center"><h4>:</h4></v-flex>
                                    <!-- <v-flex md6><v-text-field :value="checknull(getUserProfileContent.userPhone)" mask="###-#### ####" solo disabled></v-text-field></v-flex> -->
                                    <v-flex md6 xs4> <h4>{{checknull(getUserProfileContent.userPhone)}}</h4></v-flex>
                                </v-layout>
                            </v-flex>
                            <!-- first name -->
                            
                        </v-layout>
                    </v-flex>
                    <v-flex md1>
                   <div >
                    <v-flex md1  >
                        <v-fab-transition> <v-btn :disabled="!LoginStatus" fab @click="editform()" color="red darken-4"> <span style="color:white"><v-icon outlined>edit</v-icon></span></v-btn></v-fab-transition>
                    </v-flex>
                   
                    </div>
                    </v-flex>
                    
                   
                </v-layout>   
        </v-flex>
        <v-flex xs12>
        <v-tabs
         xs12 sm12 
          grow 
          color="red darken-4"
            v-model="active"
            dark
            slider-color="yellow"
            >
      <v-tab ripple >
        History </v-tab>
      <v-tab ripple >
        Favourite</v-tab>

        <v-tab-item>
         <app-userHistory></app-userHistory>
        </v-tab-item>
        <v-tab-item>
           <app-userFavourite></app-userFavourite>
        </v-tab-item>
    </v-tabs>
        </v-flex>

    </v-container>
</template>



<script>
export default {
   
	  data() {
        return{
            UUID:"",
        }

        
    },
     computed:{
      	LoginStatus(){
                        return this.$store.state.userLoginStatus;
					},
        getUserProfileContent(){
        if(this.$store.state.UserProfile == null || this.$store.state.UserProfile == '' || this.$store.state.UserProfile == undefined)
            return '-'
        else
            return this.$store.state.UserProfile;
        },
        getContent(){
            return this.$store.state.user;
        }
    },
    created(){
        //  var currentUrl = window.location.href;
        //         var id = currentUrl.split('=')
        //         console.log(id[1])
        //         this.UUID = id[1];
        //         this.initializedata(id[1]);
                console.log("profile", this.$store.state.UserProfile)

    },
    methods:{
        // initializedata(UUID){
        //     this.$store.dispatch('getUserFavHis', UUID);
        // }
         checknull(x){
          if(x == null || x == '' || x == undefined)
          {
            return '-'
          }
          else return x
        },
      editform(){
        this.$router.push('/editProfile');
      },
    }
}
</Script>