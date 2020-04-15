<template>
  <v-container>
    <v-row class="d-flex text-center justify-center">
      <v-col cols="9">
        <VueSvgGauge
          :start-angle="-110"
          :end-angle="110"
          :value= temperatureReading
          :separator-step="0"
          :min="0"
          :max="40" 
          :separatorThickness="1"
          :gauge-color="[{ offset: 0, color: '#065580'}, {offset: 40, color: '#43d2e8'}, {offset: 70, color: '#258006'}, { offset: 100, color: '#ff0000'}]"
          :scale-interval="5">
          <div class="inner-text">
            {{temperatureReading}}°C
          </div>
         </VueSvgGauge>
          <v-sparkline
      :value= temperatureReadingsHistory
      :gradient= "gradient"
      :show-labels= true
    ></v-sparkline>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
    name: 'temperatureReader',
    computed: {
      temperatureReading() {
        return this.$store.state.temperatureReading;
      },
      temperatureReadingsHistory() {
        return this.$store.state.temperatureReadingsHistory;
      }
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