<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
       <span class="mr-2">Strażnik paletek</span>
       <v-icon :x-large= true>mdi-fish</v-icon>
    </v-app-bar>

    <v-content>
      <v-container fluid>
      <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import phReadings from './components/phReadings';

export default {
  name: 'App',

  components: {
   // phReadings,
  },

  data: () => ({
    //
  }),
};
</script>
