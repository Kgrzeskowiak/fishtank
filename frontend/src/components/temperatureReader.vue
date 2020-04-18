<template>
  <v-container>
    <v-row class="d-flex text-center justify-center">
      <v-col cols="9">
        <VueSvgGauge
          :start-angle="-110"
          :end-angle="110"
          :value= temperatureReadingCorrected 
          :separator-step="0"
          :min="0"
          :max="52" 
          :separatorThickness="1"
          :gauge-color="[{ offset: 0, color: '#065580'}, {offset: 30, color: '#43d2e8'}, {offset: 50, color: '#258006'}, { offset: 100, color: '#ff0000'}]"
          :scale-interval="4">
          <div class="inner-text font-weight-thin">
            {{temperatureReading}}°C
          </div>
         </VueSvgGauge>
        <sparkline v-bind:value="temperatureReadingsHistory"></sparkline>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import sparkline from '@/components/sparkline.vue'
export default {
    name: 'temperatureReader',
    components : {sparkline},
    computed: {
      temperatureReadingCorrected() {
        var temp = this.$store.state.temperatureReading;
        if (temp <= 27 && temp >= 25) {
          return temp;
        }
        if (temp >= 28) {
          return temp += 15;
        }
        if (temp >= 30) {
          return temp += 25;
        }
        if (temp <= 23) {  
          return temp -= 10;
        }
        else {
          return temp;
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
</style>