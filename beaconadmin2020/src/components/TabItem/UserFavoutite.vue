<template>
    <v-container grid-list-md text-xs-center pt-2  pb-4 style="background-color:#80DEEA">
       <v-flex> <h1>Favourite List</h1>  </v-flex>
       <v-card v-show="empty">
           <h1>This User has no Favourite Record</h1>
       </v-card>
        <v-card v-show="!empty">
              <v-flex v-show="contentLoading">
								<v-progress-circular
								:size="70"
								:width="10"
								color="red darken-4"
								indeterminate
							></v-progress-circular>
				</v-flex>
			 <v-flex v-show="LoginStatus" md12 v-for="(user,n,number) in getuserContent " :key="number" class="text-md-left" pt-2>
      	<v-layout row wrap >
            
					<v-flex md1 xs1 style="display:flex;align-items: center;justify-content: center;border-right-style: inset;">
						<h3>{{ number +1 }}</h3> 
					</v-flex>
				<v-flex md9 xs8>
						<v-layout row wrap>
<!-- set -->
							<!-- <v-flex md4>
								<img :src="user.imageUrl" style="width:200px; height:133px" >
							</v-flex> -->
							<v-flex md8 >
								<v-flex md8 xs8 pb-2>
									<a style="text-decoration: none; color:black">
										<h3>
											<v-tooltip bottom>
												<span slot="activator" style="font-weight: bold;">{{user.title}}</span>
												<span>{{user.title}}</span>
											</v-tooltip>
										</h3>
									</a>	
								</v-flex>
								<v-flex md12  >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Beacon Location</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><h5>{{user.location}}</h5></v-flex>
									</v-layout>
								</v-flex>
								<v-flex md12  >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Desciption</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><h5>{{user.description}}</h5></v-flex>
									</v-layout>
								</v-flex>
							</v-flex>
                        </v-layout>
						<!-- content -->
						<v-flex >
							<v-layout row wrap>
							</v-layout>
						</v-flex>
						<!-- action -->
								

					</v-flex>
					<v-flex  md2 pt-2 pr-2 style="border-left-style: outset;" >
						<!-- <v-layout column wrap> -->
						<v-flex offset-md1 md10 style="">
							<v-btn
							small
							block
							color="red darken-4" 
							@click.native="viewthis(n)" 
							>
								<span style="color:white"><v-icon outlined left >edit</v-icon> View</span>
							</v-btn>
					
							<v-btn
							small
							block
							color="red darken-4" 
							@click.native="comfirmDeleteDialog(n, user.title)" 
							>
								<span style="color:white"><v-icon outlined  >delete</v-icon>Remove</span>
							</v-btn>
						</v-flex>		
				<!-- 	</v-layout> -->
					</v-flex>
					<v-flex md12 xs12>
						<v-divider></v-divider>
					</v-flex>
				</v-layout>
			
						</v-flex>
					</v-card>
					<v-flex pt-3>
						<div class="text-xs-center">
							<v-pagination
							color="red darken-4"
								v-model="page"
								:length="1"
								circle
							></v-pagination>
						</div>
					</v-flex>

<!-- dialog -->
<v-dialog
      v-model="Deletedialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline light-blue lighten-4"
          primary-title
        >
          <h3>Comfirmation Delete</h3>
        </v-card-title>

        <v-card-text>
					<v-flex>
						<h4>Are you sure to delete?</h4>	
					</v-flex>
					<v-flex pt-2>
						<v-layout row wrap>
							<v-flex md3><h5>beacon ID</h5></v-flex>
							<v-flex md1><h5>:</h5></v-flex>
							<v-flex md8><h5> {{deleteContent.id}} </h5></v-flex>
							<v-flex md3><h5>beacon Title</h5></v-flex>
							<v-flex md1><h5>:</h5></v-flex>
							<v-flex md8><h5> {{deleteContent.title}} </h5></v-flex>
						</v-layout>

					</v-flex>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-4"
            flat
            @click="Deletedialog = false"
          >
            Cancel
          </v-btn>
					<v-btn
            color="red darken-4"
            flat
            @click="deletedata(deleteContent.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
</v-dialog> 
				
<!-- dialog -->
<v-dialog
      v-model="Deletedialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline light-blue lighten-4"
          primary-title
        >
          <h3>Comfirmation Delete</h3>
        </v-card-title>

        <v-card-text>
					<v-flex>
						<h4>Are you sure to delete?</h4>	
					</v-flex>
					<v-flex pt-2>
						<v-layout row wrap>
							<v-flex md3><h5>beacon ID</h5></v-flex>
							<v-flex md1><h5>:</h5></v-flex>
							<v-flex md8><h5> {{deleteContent.id}} </h5></v-flex>
							<v-flex md3><h5>beacon Title</h5></v-flex>
							<v-flex md1><h5>:</h5></v-flex>
							<v-flex md8><h5> {{deleteContent.title}} </h5></v-flex>
						</v-layout>

					</v-flex>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-4"
            flat
            @click="Deletedialog = false"
          >
            Cancel
          </v-btn>
					<v-btn
            color="red darken-4"
            flat
            @click="deletedata(deleteContent.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
</v-dialog>
</v-container>
</template>


<script>
export default {

	  data() {
        return{
                empty: true,
                    UUID:"",
					Deletedialog:false,
					deleteContent : {
						id:'',
						title:'',
					},
					page:1,
					 count : 0,
					addLoading:true,
				}
		},
		created(){
              var currentUrl = window.location.href;
                var id = currentUrl.split('=')
                this.UUID = id[1];
                this.initializedata(id[1]);
		},
		computed: {
					checkLogin(){
						return this.$store.getters.checkLOgin;
					},
					LoginStatus(){
                        return this.$store.state.userLoginStatus;
					},
					getuserContent(){
						return this.$store.state.UserFav;
					},
					contentLoading(){
						return this.$store.state.FavLoading;
					}
                },
        watch:{
            getuserContent(val){
                console.log("watch : " ,val)
                if(val == null || val == '' || val == undefined){
                    this.empty = true;
                }
                else
                    this.empty = false;

            }

        },
		methods: {
                initializedata(UUID){
                    this.$store.dispatch('getUserFav', UUID);
                },
				comfirmDeleteDialog(id,title){
					this.deleteContent.id = id,
					this.deleteContent.title = title,
					this.Deletedialog = true;
				},
				AddNew() {
							this.addLoading = !this.addLoading
							setTimeout(() => {
										this.$router.push('/addnew');
								}, 1000)
				},
				Loginpage(){
						this.$router.push('/signin');
				},
				deletedata(UUID){
					this.$store.dispatch("deletefirebase", UUID)
					this.Deletedialog=false;
				},
				viewthis(UUID){
						this.$router.push('/SocialShare?='+UUID);

				}
		}
  
}
</script>

