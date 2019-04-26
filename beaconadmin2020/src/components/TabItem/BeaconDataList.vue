<template>
<v-container grid-list-md text-xs-center pt-2  pb-4 style="background-color:#80DEEA">
  <v-flex> <h1>Advertisement</h1>  </v-flex>
		
		<v-layout row wrap>
			<v-flex md4>
					  <v-text-field
								v-model="search1"
								label="Search"
								outline
								prepend-icon="search"
								clearable
          ></v-text-field>
			</v-flex>
					<v-flex md2 offset-md6 >
						<v-btn @click="AddNew()" color="red darken-4" :disabled="!LoginStatus">
							<v-progress-circular
								v-show="!addLoading"
												
								indeterminate
								color="white"
							></v-progress-circular>
             			 <span v-show="addLoading" style="color:white">Add New</span></v-btn>
					</v-flex>
		</v-layout>	
		<!-- {{getContent}} -->
		<!-- <v-card>
			<v-flex v-for="(beaconInformation,n) in getContent " :key="n">
				<h1>{{getContent.length}}</h1><p>{{beaconInformation.description}}</p>
				<p>{{beaconInformation.title}}</p>
			</v-flex>
		</v-card> -->
  <v-card>
		<v-flex md12 v-show="!LoginStatus">
			<h2 style="color:red">This page is required to login</h2>
			<v-btn color="red darken-4"  @click="Loginpage"><span style="color:white">sign in</span></v-btn>
			
		</v-flex>
		<!-- v-for="(mylisting, n) in mylistingData.content" :key="n"   -->
				<v-flex v-show="contentLoading">
								<v-progress-circular
								:size="70"
								:width="10"
								color="red darken-4"
								indeterminate
							></v-progress-circular>
				</v-flex>
			
    <v-flex v-show="LoginStatus" md12 v-for="(beaconInformation,number) in checkfilterthis " :key="number" class="text-md-left" pt-2>
      	<v-layout row wrap >
					<v-flex md1 xs1 style="display:flex;align-items: center;justify-content: center;border-right-style: inset;">
						<h3>{{ number +1 }}</h3> 
					</v-flex>
				<v-flex md9 xs8>
						<v-layout row wrap>
<!-- set -->
							<v-flex md4>
								<img :src="beaconInformation.imageUrl" style="width:200px; height:133px" >
							</v-flex>
							<v-flex md8 >
								<v-flex md8 xs8 pb-2>
									<a style="text-decoration: none; color:black">
										<h3>
											<v-tooltip bottom>
												<span slot="activator" style="font-weight: bold;">{{beaconInformation.title}}</span>
												<span>{{beaconInformation.title}}</span>
											</v-tooltip>
										</h3>
									</a>	
								</v-flex>
								<v-flex md12 mt-2>
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Status</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><span style="color:red"><h5>Active</h5></span></v-flex>
									</v-layout>
								</v-flex>
								<v-flex md12 >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Beacon ID</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0  ><h5>{{beaconInformation.UUID}}</h5></v-flex>
									</v-layout>
								</v-flex>
								<v-flex md12  >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Beacon Location</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><h5>{{beaconInformation.location}}</h5></v-flex>
									</v-layout>
								</v-flex>
									<v-flex md12 mt-2>
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Date Created</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
											<v-flex md8 pa-0><h5>{{getString(beaconInformation.dateCreated)}}</h5></v-flex>
									</v-layout>
								</v-flex>
								<v-flex md12  >
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Desciption</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><h5>{{beaconInformation.description}}</h5></v-flex>
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
							@click.native="editthis(beaconInformation.UUID)" 
							>
								<span style="color:white"><v-icon outlined left >edit</v-icon> Edit</span>
							</v-btn>
					
							<v-btn
							small
							block
							color="red darken-4" 
							@click.native="comfirmDeleteDialog(beaconInformation.UUID, beaconInformation.title)" 
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
							<!-- <v-pagination
							color="red darken-4"
								v-model="page"
								length="2"
								circle
							></v-pagination> -->
							<v-pagination 
							:length="1"
							 v-model="page" 
							 :total-visible="7" 
							 color="red darken-4"
							 @click.native="changePage" 
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
   <!-- <v-layout row wrap>
      <v-flex md12 >
        <v-layout row wrap>
          <v-flex md-3>
              this is image
          </v-flex>
          <v-flex md-9>
            <h5>this is container 1</h5>

          </v-flex>
          <v-flex md-2>
            this is action
          </v-flex>

        </v-layout>
      </v-flex>

       <v-flex md12 >
        
      </v-flex>

       <v-flex md12 >
        
      </v-flex>
   </v-layout>
    -->
</v-container>
  
</template>

<script>
import { constants } from 'crypto';
import { close } from 'fs';
export default {

	  data() {
        return{
					Deletedialog:false,
					search1:'',
					deleteContent : {
						id:'',
						title:'',
					},
					page:1,
					 count : 0,
					addLoading:true,
					// beaconInformation : [
					// { BeaconID : '2f234454-cf6d-4a0f-adf2-f4911ba9ffa6',
					// 	Status : 'Active' ,
					// 	Description : 'This is a communicaty-based event highlighting traditional sport'  },

					// {  	BeaconID : 'fc67e849-3e2c-4005-8f24-a9c0198f86e4' ,
					// 	Status : 'Active',
					// 			Description : 'There are two distinct modesn' },

          // { BeaconID : 'AIzaSyB-SNDjmEF6IL-E6CiSvUHBz-22c0GBTGU' ,
					// 	Status : 'Active',
					// 	Description : 'A find tradition of the area is the Gendang Melayu .' },
          
					// 	],
				}
		},
		created(){
					this.$store.dispatch("clearStoreContent");
			if(this.$store.state.user != null && this.$store.state.user !== undefined){
				this.$store.dispatch("receiveRealtimeDatabase");
			}
// 
		},
		filters:{
				filterdata(){

				}
		},
		computed: {
					filteredBlogs() {
						return this.$store.state.content.filter((id) => {
								return id.match(this.search)
						})
					},
						checkfilterthis(){
							if(this.search1){
								console.log(this.$store.state.content)

									return this.$store.state.content.filter((x)=>{
																							return (x.title.match(this.search1)) || (x.UUID.match(this.search1)) ;
																				})
									}
							else{
										return this.$store.state.content;
									}
							},
					
					checkLogin(){
						return this.$store.getters.checkLOgin;
					},
					getuser() {
						return this.$store.state.user;
					},
					LoginStatus(){
          return this.$store.state.userLoginStatus;
					},
					getContent(){
						return this.$store.state.content;
					},
					contentLoading(){
						return this.$store.state.contentLoading;
					}
				},
		methods: {
				comfirmDeleteDialog(id,title){
					this.deleteContent.id = id,
					this.deleteContent.title = title,
					this.Deletedialog = true;
				},
				getString(val){
					if(val != null   && val !== undefined){
						return	val
					}
					else	
							return ''
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
				editthis(UUID){
						this.$router.push('/edit?UUID='+UUID);

				}
		}
  
}
</script>

