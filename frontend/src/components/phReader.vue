<template>
  <v-container>
    <v-row class="d-flex text-center font-weight display-2 justify-center">
          <v-sheet class= "d-sm-none d-flex align-center justify-center"
          height= "150px"
          width= "150px"
          :color= phReadingCorrected
          :elevation="4">
        <p class="tile-text">{{phReading}} pH</p>
        </v-sheet>
         <v-sheet class= "d-none d-md-flex align-center justify-center"
          height= "250px"
          width= "250px"
          :color= phReadingCorrected
          :elevation="4">
        <p class="tile-text">{{phReading}} pH</p>
        </v-sheet>
    </v-row>
       <sparkline class="mt-1" v-bind:value="phReadingsHistory"></sparkline>
  </v-container>
</template>

<script>
import sparkline from '@/components/sparkline.vue'
  export default {
    name: 'phReader',
    components: {sparkline},
    computed: {
      phReadingCorrected() {
        var reading = this.$store.state.phReading
        var green = 'green';
        var red = 'red';
        if(reading >=0 && reading <=5.5){
          return red;
        }
        if(reading >=7 ){
          return red;
        }
        else {
          return green;
        }
      },
      phReading() {
        return this.$store.state.phReading;
      },
      phReadingsHistory() {
        return this.$store.state.phReadingsHistory;
      }
    },
    mounted() {
      this.$store.dispatch('getTodayPhReadings')
    },
    data: () => ({
      gradient : ['#222']
    }),
  }
</script>
<style scoped>
.gauge {
  height: max-content
}
.inner-text {
  padding-top : 40%

}
.tile-text {
  color: white;
}
.vega {
  height: 100px;
  background-color: red;
}
@media (max-width: 400px) {
    .vega {
    height: 40px;
    background-color: green;
  }
}
</style>
