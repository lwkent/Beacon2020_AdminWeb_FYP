<template>
<v-container grid-list-md text-xs-center pt-2  pb-4 style="background-color:#80DEEA">
  <v-flex> <h1>Statistic</h1>  </v-flex>
<v-card>
        <v-flex md12 v-show="!LoginStatus">
			<h2 style="color:red">This page is required to login</h2>
			<v-btn color="red darken-4"  @click="Loginpage"><span style="color:white">sign in</span></v-btn>
        </v-flex>
    </v-card>
 <v-flex pt-3 md6 offset-md3>
     
  <v-card  v-show="LoginStatus">
      <v-card-title>
      Advertisement
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
            :headers="headers"
            :items="getContent"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.BeaconUUID }}</td>
                <td  class="text-xs-left" >{{ props.item.totalSent }}</td>
            </template>
        </v-data-table>
  </v-card>
  </v-flex>
  <!-- <v-card>
  <v-flex md6 v-for="(item,number) in getContent " :key="number" class="text-md-left" pt-2>
      	<v-layout row wrap >
					<v-flex md1 xs1 style="display:flex;align-items: center;justify-content: center;border-right-style: inset;">
						<h3>{{ number +1 }}</h3> 
					</v-flex>
				<v-flex md9 xs8>
						<v-layout row wrap>
							<v-flex md8 >
								<v-flex md8 xs8 pb-2>
									<a  style="text-decoration: none; color:black">
										<h3>
											<v-tooltip bottom >
												<span slot="activator" style="font-weight: bold;">{{item.BeaconUUID}}</span>
												<span>k</span>
											</v-tooltip>
										</h3>
									</a>	
								</v-flex>
								<v-flex md12 mt-2>
									<v-layout row wrap>
										<v-flex md3 pa-0 pl-1><h5>Total</h5></v-flex>
										<v-flex md1 pa-0><h5>:</h5></v-flex>
										<v-flex md8 pa-0><span style="color:red"><h5>{{item.totalSent}}</h5></span></v-flex>
									</v-layout>
								</v-flex>
								
							</v-flex>
                        </v-layout>
						<v-flex >
							<v-layout row wrap>
							</v-layout>
						</v-flex>
					</v-flex>
					<v-flex md12 xs12>
						<v-divider></v-divider>
					</v-flex>
				</v-layout>
			
						</v-flex>
                        </v-card> -->
        <v-flex   v-show="LoginStatus" pt-3 md6 offset-md3>
                    <v-card>
                            <app-Graph></app-Graph>
                    </v-card>
        </v-flex>

  
</v-container>
</template>



<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(this.data, this.options)
  },
    data(){
        return{
            search:"",
            it:[],
            labels: ["appel", "bananas", "grapes"],
            datasets:[
                {
                    data: [23, 44,22],
                    backgroundColor: ["Red", "Yellow", "Purple"]
                }
            ],
            option:{
                title:{
                    display: true,
                    position: "bottom",
                    text:"Fruits"
                }
            },
             headers: [
                {
                    text: 'Advertisement Id',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Usage(per call)', value: 'usage' },
        ],

        }
    },
    
    created(){
        
        this.$store.dispatch("clearStatistic")
        this.$store.dispatch("getstatistic")
    },
    computed:{
        	LoginStatus(){
                        return this.$store.state.userLoginStatus;
					},
        	checkfilterthis(){
            if(this.search){
                this.it = this.$store.state.StatisticData;
                // console.log(this.it );
                return  this.it.filter((x)=>{
                console.log(x);

                               return (this.$store.state.StatisticData.BeaconUUID.match(this.search)) || ( this.it.totalSent.match(this.search));
                                                            })
                    }
            else{
                        return this.$store.state.StatisticData;
                    }
            },
        getContent(){
            return this.$store.state.StatisticData;
        }
    }
}
</script>
