<template>
	<v-container fluid grid-list-md>
<v-flex offset-md2 md8 style="background-color:#90CAF9">
             <h1>User Profile</h1>

</v-flex>
		 <v-flex offset-md2 md8>
             <v-card>
						<!-- title -->
						<v-flex offset-md1>
							<v-layout row wrap>
								<v-flex offset-md1 md4 xs4>
										<v-subheader>Title :</v-subheader>
								</v-flex>

								<v-flex offset-xs1 offset-md0 md4 xs6>
									<v-select 
										:items="propsT" 
										v-model="title" 
										label="Select" 
										item-text="text"
										item-value="id"
										single-line
										bottom>
									</v-select>
								</v-flex>
							</v-layout>
						</v-flex>
                        <!-- first name -->
						<v-flex offset-md1>
							<v-layout row wrap>
								<v-flex offset-md1 md4>
									<v-subheader>First Name :</v-subheader>
								</v-flex>
								<v-flex md4>
									<v-text-field
									label = "First Name"
									v-model="username"
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-flex>
                          
						<!-- Hand Phone -->
							<v-flex offset-md1>
							<v-layout row wrap>
									<v-flex offset-md1 md4>
									<v-subheader>Mobile Phone :</v-subheader>
								</v-flex>
								<v-flex md4 pl-0>
									<v-text-field
									  	hint="Ex: (+60)10-7799 1264"
										label = "Phone"
										v-model="phoneMobile"
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-flex>
						<!-- home Phone -->
						
						<!-- business -->
					
						<!-- email -->
						<v-flex offset-md1>
							<v-layout row wrap>
								<v-flex offset-md1 md4>
									<v-subheader>email :</v-subheader>
								</v-flex>
								<v-flex md4>
									<v-text-field
									label = "email"
									v-model="email"
									disabled
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-flex>
						<!-- birth date -->
						<v-flex offset-md1>
							<v-layout row wrap>
								<v-flex offset-md1 md4>
									<v-subheader>Birth date :</v-subheader>
								</v-flex>
								 <v-flex md4>
									<!-- <v-menu
									:disabled="activeBtn.ProfileEditBtn"
									:close-on-content-click="false"
									v-model="menu2"
									:nudge-right="40"
									lazy
									transition="scale-transition"
									offset-y
									full-width
									max-width="290px"
									min-width="290px"
									>
									<v-text-field
										slot="activator"
										v-model="computedDateFormatted"
										hint="MM/DD/YYYY format"
										persistent-hint
										readonly
										:disabled="activeBtn.ProfileEditBtn"
									></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
									</v-menu> -->
									<v-menu
										ref="menu2"
										:close-on-content-click="false"
										v-model="menu2"
										:nudge-right="40"
										:return-value.sync="date"
										lazy
										transition="scale-transition"
										offset-y
										full-width
										min-width="290px"
										>
										<v-text-field
											label = "MM/DD/YYYY"
											slot="activator"
											v-model="dateFormatted"
											hint="MM/DD/YYYY format"
											readonly
										></v-text-field>
										<v-date-picker v-model="date" @input="$refs.menu2.save(date)" color="red darken-4"></v-date-picker>
								
										</v-menu>
								</v-flex>
							</v-layout>
						</v-flex>
                        <v-flex offset-md1>
							<v-layout row wrap>
								<v-flex offset-md1 md4>
									<v-subheader>Type :</v-subheader>
								</v-flex>
								<v-flex md4>
									<v-text-field
									label = "User Type"
									v-model="agencyName"
									disabled
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-flex>
						<!-- state -->
						<!-- <v-flex offset-md1>
							<v-layout row wrap>
								<v-flex offset-md1 md4>
									<v-subheader>State / Territory :</v-subheader>
								</v-flex>
								<v-flex md4>
									<v-select 
										:items="ProfileState" 
										v-model="state" 
										label="Select" 
										item-text="text"
										item-value="id"
										single-line
										bottom>
									</v-select>
								</v-flex>
							</v-layout>
						</v-flex> -->
						<!-- Agent ? -->
					
						<!-- Agent Form -->
						
					
                          
                           
                            </v-card>
                             <v-flex offset-md7 md4 pt-4>
							   <v-layout>
 									<v-btn color="red darken-4" @click="save()" dark>Save</v-btn>
							   		<v-btn color="red darken-4" @click="cancel()" dark>cancel</v-btn>
							   </v-layout>
						   </v-flex>
						   <v-flex md12>
							    <v-alert
									:value="alert"
									type="error"
									transition="scale-transition"
									>
									This is an error alert with no fullfill the textbox.
								</v-alert>
						   </v-flex>
                    </v-flex>
	</v-container>
</template>

<script>
export default {
		
	data(){
	
	  return{
		inputName : true,
		date: "",
	  	dateFormatted: null,
	  	AgentRadio : 'NoAgent',
	  	AgentForm : false,
		state:0,
		title:0,
		alert:false,

		username:"",
		phoneMobile:"",
		email:"",
		agencyName:"",
    
      propsT:[
            {
                text:'Mr',
                id:'0',
            },
            {
                text:'Ms',
                id:'1',
            },
            {
                text:'Mrs',
                id:'2',
            },
            ],
	  }
	  
      
	  
	},

	 computed: {
		
		ProfileInformation() {
            return this.$store.state.profileInformation.UserProfile;   
        },
		// ProfEditBtn() {
        //     return this.$store.state.profileInformation.ProfileEditBtn;
        // },
		// ProfileTitle(){
		// 		return this.$store.state.profileInformation.ProfileTitle;
		// },
		// ProfileState(){
		// 		return this.$store.state.profileInformation.ProfileState;
		// },
		// activeBtn() {
		// 	return this.$store.state.profileInformation;
		// },
	
	},
	updated(){
    },
    watch:{
        ProfileInformation(val){
            console.log("watch",val)
            this.username=val.userName,
            this.phoneMobile=val.userPhone,
             this.email=val.userEmail,
             this.agencyName=val.userType
        }
    },

	created(){
		this.InitializedProfileData();
		this.checkAgent();

		
	},
	mounted(){
          console.log("watch", this.$store.state.UserProfile.userEmail)
        //   state.user != null  && value !== undefined)
          if(this.$store.state.UserProfile.userName != null && this.$store.state.UserProfile.userName !== undefined)
          {this.username=this.$store.state.UserProfile.userName}
                
         if(this.$store.state.UserProfile.userPhone != null && this.$store.state.UserProfile.userPhone !== undefined)
           { this.phoneMobile=this.$store.state.UserProfile.userPhone}
         if(this.$store.state.UserProfile.userEmail != null && this.$store.state.UserProfile.userEmail !== undefined)
           { this.email=this.$store.state.UserProfile.userEmail}
         if(this.$store.state.UserProfile.userType != null && this.$store.state.UserProfile.userType !== undefined)
            {this.agencyName=this.$store.state.UserProfile.userType}
            console.log("watch",)
	},

    watch: {
        getValue(){

        },
		date(val){
			this.changeDateFormat(val);
			
		},
	  AgentRadio(val){
		  	if(this.AgentRadio == "Agent")
			 	this.AgentForm = true;
			else 
				this.AgentForm = false;
	  },
	},
	  methods: {
		  mobileFormat(x){
			  if(x.length == null && x.length == '')
			  	return "(+##)##-### #####"
			  else if(x.length <= 11)
				  return "(+##)##-### #####"
			 	else
				return "(+##)##-#### ####"


		  },
	checknull(x){
		if(x == null || x == '')
		{
			return ''}
		else return x
	},
		  save(){
              console.log("click")
			  var data= {
                   userName: this.username,
                   userPhone: this.phoneMobile,
                   userEmail: this.email,
                   userType:this.agencyName
			  }
            this.$store.dispatch("UpdateUserInformation", data);
            console.log("finish")
                this.$router.push('/');
			  
		  },
		  cancel(){
			this.$store.dispatch("EditProfilebtn");
			this.alert = false;
			 this.$router.push('/');
		  },
		  checkNull(x){
			  if(x==null)
				  return "-"
				else x
		  },
		  addPhone(){
            this.$store.dispatch("addPhoneTextField");
		  },
		  checkAgent(){
			  if(this.ProfileInformation.agentProfile.status==null || this.ProfileInformation.agentProfile.status=='')
			  {
				this.AgentForm = false;
				this.AgentRadio = "NoAgent"
			  }
			else 
			{
				this.AgentRadio = "Agent"
				this.AgentForm = true;
			}
		  },
		  changeDateFormat(date){
			  var arr = date.split('-')
			  this.date = date;
				this.dateFormatted = arr[2] +'/'+ arr[1] + '/' + arr[0]
		  },
		   originDateformat(date){ 
			  var arr = date.split('/')
				this.date = arr[2] +'-'+ arr[1] + '-' + arr[0]
		  },
    }

}
</script>

<style>

.input-group__input *
  {color: rgba(0,0,0,0.87) !important}

</style>


