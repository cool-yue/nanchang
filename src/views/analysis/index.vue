<template>
  <div class="analysis">
     <div class="analysis__item">
         <apexchart type="line" height="350" :options="lineChartOptions.chartOptions" :series="lineChartOptions.series"></apexchart>
     </div>
     <div class="analysis__item">
         <apexchart :options="columnChartOptions.chartOptions" :series="columnChartOptions.series"></apexchart>
     </div>
     <div class="analysis__item">
         <apexchart :options="pieChartOptions.chartOptions" :series="pieChartOptions.series"></apexchart>
     </div>
  </div>
</template>
<script>
import { lineChartOptions, columnChartOptions, pieChartOptions} from "./data.js";
export default {
    data() {
      return {
        lineChartOptions,
        columnChartOptions,
        pieChartOptions
      };
    },
    mounted() {
      console.log(lineChartOptions);
    }
};
</script>
<style>
.analysis {
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
}
.analysis__item {
  width: 50%;
  max-width: 500px;
}
</style>