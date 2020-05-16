<template>
  <v-container>
    <v-row class="d-flex text-center font-weight display-2 justify-center">
        <v-sheet class="d-sm-none d-flex align-center justify-center"
        width="150px"
        height="150px"
        :color= temperatureReadingCorrected
        :elevation="4">
        <p class="tile-text mt-4">{{temperatureReading}} °C</p>
        </v-sheet>
        <v-sheet class="d-none d-md-flex align-center justify-center"
        width="250px"
        height="250px"
        :color= temperatureReadingCorrected
        :elevation="4">
        <p class="tile-text">{{temperatureReading}} °C</p>
        </v-sheet>
    </v-row>
    <sparkline v-bind:value="temperatureReadingsHistory"></sparkline>
  </v-container>
</template>
<script>
import sparkline from '@/components/sparkline.vue'
export default {
    name: 'temperatureReader',
    components : {sparkline},
     data: () => ({
      gradient : ['#222'],
    }),
    computed: {
      temperatureReadingCorrected() {
        var green = 'green';
        var red = 'red';
        var temp = this.$store.state.temperatureReading;
        if(temp >= 0 && temp <= 25) {
          return red;
        }
        if(temp > 31){
          return red;
        }
        else {
          return green;
        }
       
      },
      temperatureReading() {
        return this.$store.state.temperatureReading
      },
      temperatureReadingsHistory() {
        return this.$store.state.temperatureReadingsHistory;
      }
    },
    mounted() {
      this.$store.dispatch('getTodayTemperatureReadings')
    },
    methods: {
    }
  } 
</script>
<style scoped>
.gauge {
  height: max-content
}
.inner-text {
  padding-top : 40%;
}
.tile-text {
  color: white;
  margin-top: 2.5px;
}
</style>