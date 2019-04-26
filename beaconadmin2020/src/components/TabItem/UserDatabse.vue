<template>
<v-container grid-list-md text-xs-center pt-2  pb-4 style="background-color:#80DEEA">
  <v-flex> <h1>User Detail</h1>  </v-flex>
		
		<v-layout row wrap>
					<!-- <v-flex md2 offset-md10 >
						<v-btn @click="AddNew()" color="red darken-4" :disabled="!LoginStatus">
							<v-progress-circular
								v-show="!addLoading"
												
								indeterminate
								color="white"
							></v-progress-circular>
             			 <span v-show="addLoading" style="color:white">Add New</span></v-btn>
					</v-flex> -->
		</v-layout>	
		<v-layout row wrap>
			<v-flex md4>
					  <v-text-field
								v-model="search"
								label="Search"
								outline
								prepend-icon="search"
								clearable
          ></v-text-field>
			</v-flex>
					
		</v-layout>	
  <v-card>
		<v-flex md12 v-show="!LoginStatus">
			<h2 style="color:red">This page is required to login</h2>
			<v-btn color="red darken-4"  @click="Loginpage"><span style="color:white">sign in</span></v-btn>
			
		</v-flex>
				<v-flex v-show="contentLoading">
								<v-progress-circular
								:size="70"
								:width="10"
								color="red darken-4"
								indeterminate
							></v-progress-circular>
				</v-flex>
    <v-flex v-show="LoginStatus" md12 v-for="(user,number) in checkfilterthis " :key="number" class="text-md-left" pt-2>
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
									<a  style="text-decoration: none; color:black">
										<h3>
											<v-tooltip bottom >
												<span slot="activator" style="font-weight: bold;">{{user.userName}}</span>
												<span>{{user.userName}}</span>
											</v-tooltip>
										</h3>
									</a>	
								</v-flex>
								<v-flex md12 mt-2>
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>type</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><span style="color:red"><h5>{{user.userType}}</h5></span></v-flex>
									</v-layout>
								</v-flex>
								<v-flex md12 >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Email</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0  ><h5>{{user.userEmail}}</h5></v-flex>
									</v-layout>
								</v-flex>
								<v-flex md12  >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Phone</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><h5>{{user.userPhone}}</h5></v-flex>
									</v-layout>
								</v-flex>
								<!-- <v-flex md12  >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Desciption</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><h5>xxx</h5></v-flex>
									</v-layout>
								</v-flex> -->
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
							@click.native="viewthis(user.userId)" 
							>
								<span style="color:white"> View</span>
							</v-btn>
					
							<v-btn
							small
							block
							color="red darken-4" 
							@click.native="comfirmDeleteDialog(user.userId, user.userName, user.userEmail)"
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
								length="1"
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
							<v-flex md3><h5>Name</h5></v-flex>
							<v-flex md1><h5>:</h5></v-flex>
							<v-flex md8><h5> {{deleteContent.name}} </h5></v-flex>
							<v-flex md3><h5>Email</h5></v-flex>
							<v-flex md1><h5>:</h5></v-flex>
							<v-flex md8><h5> {{deleteContent.email}} </h5></v-flex>
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
					search:'',
					Deletedialog:false,
					deleteContent : {
						id:'',
						name:'',
						email:'',
					},
					page:1,
					 count : 0,
					addLoading:true,
				}
		},
		created(){
				this.$store.dispatch("clearstoreUserContent");

			
			if(this.$store.state.user != null && this.$store.state.user !== undefined){
				this.$store.dispatch("receiveRealtimeUserDatabase");

			}
		},
		computed: {
					filteredBlogs() {
						return this.getuserContent().filter((id) => {
								return id.userName.match(this.search)
						})
					},
						checkfilterthis(){
							if(this.search){
									return this.$store.state.allUserContent.filter((x)=>{
																																				return (x.userName.match(this.search)) || (x.userEmail.match(this.search))
																																				||(x.userAge.match(this.search));
																																			})
									}
							else{
										return this.$store.state.allUserContent;
									}
							},
					checkLogin(){
						return this.$store.getters.checkLOgin;
					},
					LoginStatus(){
                        return this.$store.state.userLoginStatus;
					},
					getuserContent(){
						return this.$store.state.allUserContent;
					},
					contentLoading(){
						return this.$store.state.usertabLoading;
					}
				},
		methods: {
				comfirmDeleteDialog(id,name, email){
					this.deleteContent.id = id,
					this.deleteContent.name = name,
					this.deleteContent.email = email,
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
					this.$store.dispatch("deleteUserfirebase", UUID)
					this.Deletedialog=false;
				},
				viewthis(UUID){
						this.$router.push('/perosnaldetail?UUID='+UUID);

				}
		}
  
}
</script>

