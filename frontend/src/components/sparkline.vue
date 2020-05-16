<template>
<v-sparkline
      :value= value
      :gradient= gradient
      :smooth = radius
      :show-labels = labels
      :fill = fill
      :label-size= "8"
      :line-width= lineWidth
    ></v-sparkline>
    
</template>
<script>
export default {
    name : 'sparkline',
    props : ['value'],
    data : () => ({
        radius : 8,
        fill : false,
        labels : true,
        gradient : ['black'],
        lineWidth : 2
    })
}
</script>