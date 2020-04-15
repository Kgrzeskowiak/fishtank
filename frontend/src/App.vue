<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
       <span class="mr-2">Aqua</span>
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
