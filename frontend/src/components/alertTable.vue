<template>
    <v-data-table
    :headers="headers"
    :items="alertList"
    :items-per-page="5"
    class="elevation-5"
    :disable-sort = true
    :no-data-text = noResultsText
    :disable-pagination = true
    :hide-default-footer = true
  ></v-data-table>
</template>
<script>
export default {
    name: 'alertTable',
    data: () => ({
        headers : [{
            text: 'Urządzenie',
            sortable: true,
            value: 'sensor',
          },
          {
              text: 'Pomiar',
              value : 'value',
              sortable : true,
              name : 'value'
          },
          {
              text: 'Czas',
              value: 'date'
          }],
          noResultsText: 'Brak alertów',
          pageText : 'aaaaaaa'


    }),
    mounted() {
        this.$store.dispatch('getAlerts')
    },
    computed: {
        alertList() {
            return this.$store.state.alertList
        }

    }
}
</script>