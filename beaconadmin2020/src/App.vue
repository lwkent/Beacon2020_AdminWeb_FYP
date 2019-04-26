<template>
<v-app
    id="inspire"
  >
    <v-navigation-drawer
             
              fixed
              clipped
              temporary
              v-model="drawer"
              app
            >
              <v-list dense>
         
                <v-list-tile class="mt-3" @click="home">
                  <v-list-tile-action>
                    <v-icon >home</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title >HOME</v-list-tile-title>
                </v-list-tile>
                
                <v-list-tile class="mt-3"   v-show="!LoginStatus" @click="login">
                  <v-list-tile-action>
                    <v-icon >home</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title >Sign In</v-list-tile-title>
                </v-list-tile>

                <v-list-tile class="mt-3"  v-show="!LoginStatus" @click="signup">
                  <v-list-tile-action>
                    <v-icon >home</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title >Sign up</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-show="
                LoginStatus" @click="signout" >
                  <v-list-tile-action>
                    <v-icon >exit_to_app</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title  >Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
       
    </v-navigation-drawer>
    <v-toolbar 
    color="light-blue lighten-4"
              dense
            fixed
            clipped-left
            app
          >
            <v-toolbar-side-icon class="black--text text--darken-1" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
             <a style="text-decoration: none;" href="" @click="home">Beacon2020</a>  
                <!-- <a href="geturl"><img src="../static/images/SpeedProp Logo (large).png" style="position: relative ;top:4px;" height="50px" @click="goHome" ></a>  <a :herf="geturl()">  <img src="../static/images/SpeedProp Logo (large).png" style="position: relative ;top:4px;" height="50px" @click="goHome" ></a> -->
            <v-spacer></v-spacer>
            <v-layout row align-top style="max-width: 450px" >
                  <v-flex pl-2>
                    <v-layout row wrap>
                          <v-flex xs4 pt-0 pl-2 pr-0>

                               <v-menu
                                :close-on-content-click="false"
                                :nudge-width="100"
                              >
                                <v-btn small color="red darken-4" dark > <v-icon left >account_circle</v-icon><h5 class="caption">Username</h5></v-btn>
                              
                              </v-menu>

                          </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex hidden-xs-only >
                    <v-layout row wrap>
                      <v-flex xs5 >
                        <v-btn small color="red darken-4" v-show="!LoginStatus"  dark @click="login" >Sign in</v-btn>
                      </v-flex>
                      <v-flex >
                        <v-btn small color="red darken-4" v-show="!LoginStatus" dark @click="signup">Sign Up</v-btn>
                      </v-flex>
                       <v-flex >
                        <v-btn small color="red darken-4" v-show="LoginStatus" dark @click="signout">Sign Out</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                   
                    
            </v-layout>
          </v-toolbar>
    <v-content>
      

      

      <router-view></router-view>
      
    </v-content>
    <v-footer 
      color="grey"
      class="pa-3 elevation-4">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
     
</template>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>

 export default {
    data () {
      return {
        
        Signinbtn :true,
        SignupBtn: true,
        SignoutBtn: false,
        items: [
          { title: 'Dashboard', icon: 'dashboard' },
          { title: 'Account', icon: 'account_box' },
          { title: 'Admin', icon: 'gavel' }
        ],
        drawer : false,
      }
    },
    created(){
      if(this.$store.state.userLoginStatus == false){

      }
      
    },
    computed :
    {
      showtoolbar(){
            return this.$store.state.toolbar;
      },
      
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'},
        ]
        if(this.userIsAuthenticated){
          menuItems = [
             {icon: 'face', title: 'Sign up', link: '/signup'},
            {icon: 'lock_open', title: 'Sign in', link: '/signin'},
          ]
        }
        return 
      },
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      LoginStatus(){
          return this.$store.state.userLoginStatus;
      },
      user() {
            return this.$store.getters.user
      }
    },
    watch: {
        user (value){
            if (value!== null && value !== undefined){
                this.Signinbtn =false;
                this.SignupBtn=false;
                this.SignoutBtn=true;
                console.log("checked");
            }
            else{
                this.Signinbtn =true;
                this.SignupBtn= true;
                this.SignoutBtn= false;
                console.log("checkedout");

            }
        }
    },
    methods: {
      login(){
        this.$router.push('/signin')
      },
      signup(){
        this.$router.push('/signup')
      },
       signout(){
          this.$store.dispatch('SignUserOut')
        this.$router.push('/')
      },
      home(){
        this.$router.push('/')

      }
    }
  }

</Script>