<template>
    <v-container >
        <v-flex offset-sm6 offset-md6 offset-xs6 >
         <v-progress-circular
                style="display:flex;align-items: center;
                justify-content: center;
               "
                      v-show="progress"
                    :width="6"
                    :size="50"
                    color="red darken 4"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
<v-layout>
   
    <v-flex xs12 sm6 offset-sm3  v-show="!progress" >
      <v-card  >
        <v-img
          :src="imageURL"

        ></v-img>

        <v-card-title primary-title >
          <div>
            <h3 class="headline mb-0">{{title}}</h3>
            <div> {{ description }} </div>
          </div>
        </v-card-title>

        <v-card-actions >
          <v-btn  color="Orange">Share</v-btn>
          <v-btn  color="Orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

    </v-container>
</template>

<script>
export default {
    data(){
        return{
            UUID:'',
            title:'',
            description:'',
            imageURL:'',
            image: null,
            BLocation:'',
        }
    },
    computed:{
        getData() {
                    return this.$store.state.editContent;
                },
        progress() {
            return this.$store.state.ShareLoadfing;
        },
        
                
    },
     watch:{

        getData(val){
            this.title= val.title;
           this.description = val.description;
           this.imageURL = val.imageUrl;
           this.BLocation = val.Location;
        }
        },
      created(){
          
         var currentUrl = window.location.href;
                var id = currentUrl.split('=')
                console.log(id[1])
                this.UUID = id[1];
                this.initializedata(id[1]);
    },
    methods: {
        close(){
           this.$store.dispatch('closetoolbar');

        },
        initializedata(UUID){
            this.$store.dispatch('receiveEditData', UUID);
        }
    }
}
</script>
