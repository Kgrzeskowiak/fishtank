<template>
<v-sparkline class=" font-weight-thin"
      :value= value
      :gradient= gradient
      :smooth = radius
      :show-labels = labels
      :fill = fill
      :label-size= "8"
    ></v-sparkline>
    
</template>
<script>
export default {
    name : 'sparkline',
    props : ['value'],
    data : () => ({
        radius : 8,
        fill : true,
        labels : true,
        gradient : ['#42b3f4'],
    })
}
</script>