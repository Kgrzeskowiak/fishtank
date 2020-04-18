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
          <div class="inner-text font-weight-thin">
            pH {{phReading}}
          </div>
         </VueSvgGauge>
            <sparkline v-bind:value="phReadingsHistory"></sparkline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sparkline from '@/components/sparkline.vue'
  export default {
    name: 'phReader',
    components: {sparkline},
    computed: {
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
</style>
