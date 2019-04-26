<template>
    <v-container>
        <v-flex pb-2>
             <v-card>
                <h1 class="text-md-center" > Beacon Editing</h1>
                <form   @submit.prevent="submit">
                   <v-layout row warp>
                        <v-flex md2  xs3  offset-md2  mt-auto mb-auto>
                            <v-layout row wrap>
                                <v-flex md8><h4>Beacon UUID</h4></v-flex>
                                <v-flex md4><h4>:</h4></v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex  md5 xs8> 
                        <v-text-field
                            v-model="UUID"
                            label="UUID"
                            counter="36"
                            required
                            disabled
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <!-- title -->
                     <v-layout row warp >
                        <v-flex md2  xs3  offset-md2  mt-auto mb-auto>
                            <v-layout row wrap>
                                <v-flex md8><h4>Title</h4></v-flex>
                                <v-flex md4><h4>:</h4></v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex  md5 xs8> 
                        <v-text-field
                            v-model="title"
                            label="Title"
                            required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <!-- location -->
                    <v-layout row warp >
                        <v-flex md2  xs3  offset-md2  mt-auto mb-auto>
                            <v-layout row wrap>
                                <v-flex md8><h4>Beacon Location</h4></v-flex>
                                <v-flex md4><h4>:</h4></v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex  md5 xs8> 
                        <v-text-field
                            v-model="BLocation"
                            label="location"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <!-- Description -->
                     <v-layout row warp >
                        <v-flex md2  xs3  offset-md2  mt-auto mb-auto>
                            <v-layout row wrap>
                                <v-flex md8><h4>Description</h4></v-flex>
                                <v-flex md4><h4>:</h4></v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex  md5 xs8> 
                        <v-text-field
                            v-model="description"
                            label="description"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                      <v-flex style="">
                        <v-layout row wrap>
                        <v-flex md2  xs3  offset-md2  mt-auto mb-auto>
                            <v-layout row wrap>
                                <v-flex md8><h4>Image</h4></v-flex>
                                <v-flex md4><h4>:</h4></v-flex>
                            </v-layout>
                        </v-flex>
                            <v-flex mr-4 md2 style="height:150px">
                                <img :src="imageURL" style="width:200px; height:133px;">
                            </v-flex>
                            <v-flex pl-4 md2 style="display:flex;align-items: center;justify-content: center;">
                            <v-btn color="red darken-4" @click="onPickFile" :disabled="!progress" :loading="!progress"><span style="color:white">Upload Image</span></v-btn>
                            <input 
                                type="file" 
                                style="display:none" 
                                ref="fileInput" 
                                accept="image/*"
                                @change="onFilePick">
                            </v-flex>
                        </v-layout>
                    </v-flex>
                     <v-layout row wrap>
                        <v-flex md2 offset-md6> 
                            <v-btn color="red darken-4" @click="back" :disabled="!progress" :loading="!progress"><span style="color:white">Cancel</span></v-btn>
                        </v-flex>
                        <v-flex md2>
                            <v-btn type="submit" color="red darken-4" :disabled="!progress" :loading="!progress">
             			 <span v-show="progress" style="color:white">Edit</span></v-btn>

                        </v-flex>
                    </v-layout>
                        
                            
                    
                </form>
             </v-card>
        </v-flex>
    </v-container>
</template>

<script>
export default {
   
	  data() {
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
        progress(){
            return this.$store.getters.addnewLoading;
        }
    },
    created(){
         var currentUrl = window.location.href;
                var id = currentUrl.split('=')
                console.log(id[1])
                this.UUID = id[1];
                this.initializedata(id[1]);
    },

        watch:{
        getData(val){
             this.title= val.title;
           this.description = val.description;
           this.imageURL = val.imageUrl;
           this.BLocation = val.location;
        }
        },
    methods: {
        initializedata(UUID){
            this.$store.dispatch('receiveEditData', UUID);
        },
        submit() {
            if(!this.image){
                return
            }
            const data = {
                UUID: this.UUID,
                title: this.title,
                description:this.description,
                image : this.image,
                Location:this.BLocation,
                DateCreate : new Date().toLocaleString()
            }
            this.$store.dispatch("RetrieveBeaconData", data)
            
        },
        back(){
            setTimeout(() => {
									this.$router.push('/');
								}, 1000)
        },
        onPickFile(){
            this.$refs.fileInput.click();
        },
        onFilePick(event){
            const files = event.target.files
            let filename = files[0].name;
            if(filename.lastIndexOf('.')<=0){
                return alert('Please add a valid file!')
            }

            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageURL = fileReader.result;
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
        
    }
}
</script>
