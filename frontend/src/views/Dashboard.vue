<template>

    <!-- d-flex text-center justify-center -->
    <v-sheet :elevation="5">
      <v-row class="flex-sm-wrap flex-lg-nowrap">
          <phReader/>
          <temperatureReader/>
      </v-row>
    </v-sheet>
 
</template>

<script>
// @ is an alias to /src
import phReader from '@/components/phReader.vue'
import temperatureReader from '@/components/temperatureReader.vue'

export default {
  name: 'Dashboard',
  components: {
    phReader,
    temperatureReader,
  }
}
</script>
