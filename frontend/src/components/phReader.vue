<template>
  <v-container>
    <v-row class="d-flex text-center justify-center">
      <v-col cols="9">
        <VueSvgGauge
          :start-angle="-110"
          :end-angle="110"
          :value= phReading
          :separator-step="14"
          :min="0"
          :max="13"
          :gauge-color="[{ offset: 10, color: '#c42d2d'}, {offset: 40, color: '#35b53d'}, { offset: 80, color: '#c42d2d'}]"
          :scale-interval="1">
          <div class="inner-text">
            pH {{phReading}}
          </div>
         </VueSvgGauge>
          <v-sparkline
      :value= phReadingsHistory
      :gradient= "gradient"
      :show-labels= true
     
    ></v-sparkline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'phReader',
    computed: {
      phReading() {
        return this.$store.state.phReading;
      },
      phReadingsHistory() {
        return this.$store.state.phReadingsHistory;
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
