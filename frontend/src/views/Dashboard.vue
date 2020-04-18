<template>
  <div>
    <!-- d-flex text-center justify-center -->
    <v-sheet :elevation="5">
      <v-row class="flex-sm-wrap flex-lg-nowrap">
          <phReader/>
          <temperatureReader/>
      </v-row>
    </v-sheet>
    <v-spacer></v-spacer>
    <!-- <v-sheet :elevation="5" class="mt-5"> -->
    
       <alertTable class="mt-4 mb-4" />
    
    <!-- </v-sheet> -->
       
  
 </div>
</template>

<script>
// @ is an alias to /src
import phReader from '@/components/phReader.vue'
import temperatureReader from '@/components/temperatureReader.vue'
import alertTable from '@/components/alertTable.vue'

export default {
  name: 'Dashboard',
  components: {
    phReader,
    temperatureReader,
    alertTable
  }
}
</script>
