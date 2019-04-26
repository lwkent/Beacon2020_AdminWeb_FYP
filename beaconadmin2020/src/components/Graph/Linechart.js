import { Bar } from 'vue-chartjs'
import { createDecipher } from 'crypto';
 
export default {
  extends: Bar,
 
  data(){
      return{
          months: ['January', 'February'],
          x_value:[],
          y_value:[],
      }
  },
  computed:{
    getContent(){
        return this.$store.state.StatisticData;
    }
  },
  created(){
    this.x_value=[]
    this.y_value=[]
  },
  watch:{
    getContent(val)
    {
        console.log("result : ", val)
        for(var i = 0 ; i <val.length; i++){
            this.x_value.push(val[i].BeaconUUID)
            this.y_value.push(val[i].totalSent)
          }
          console.log("Finish 1: ", this.x_value)
          console.log("Finish 2: ",   this.y_value)
          this.renderChart({
            labels: this.x_value,
            datasets: [
              {
                label: 'Total',
                backgroundColor: '#D50000',
                data: this.y_value
              }
            ]
          })
    }
  },
  update(){
  
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.x_value,
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#D50000',
          data: this.y_value
        }
      ]
    })
  },

}