<template>
  <div class="analysis">
    <div class="analysis__data">
        <w-table :table-data="table_data" :table-header="header_fileds" :no-button="true" dense table-title="巡河统计表"></w-table>
    </div>
    <div class="analysis__charts">


    <div class="analysis__chart">
    <!--
      <apexchart
        type="line"
        height="350"
        :options="lineChartOptions.chartOptions"
        :series="lineChartOptions.series"
      ></apexchart>-->
    </div>
    <div class="analysis__chart">
      <apexchart
        :options="columnChartOptions.chartOptions"
        :series="columnChartOptions.series"
      ></apexchart>
    </div>
    <div class="analysis__chart">
      <apexchart
        :options="pieChartOptions.chartOptions"
        :series="pieChartOptions.series"
      ></apexchart>
    </div>
    </div>
  </div>
</template>
<script>
import {
  // lineChartOptions,
  columnChartOptions,
  pieChartOptions
} from "./data.js";
import WTable from "../../components/wTable";
import tableData from "./tableData.js";
export default {
  data() {
    return {
      //lineChartOptions,
      columnChartOptions,
      pieChartOptions,
      table_data: tableData,
      header_fileds : [
        {
          text: "河长",
          value: "name"
        },
        {
          text: "应巡次数",
          value: "must_patrol_number"
        },
        {
          text: "巡河总次数",
          value: "patrol_total_number"
        },
        {
          text: "已办任务数",
          value: "todo_task_number"
        },
        {
          text: "待办任务处置数",
          value: "todo_task_number"
        },
        {
          text: "任务处理完成率",
          value: "task_complete_rate"
        },
        {
          text: "累积巡河里程(km)",
          value: "patrol_river_distance"
        },
        {
          text: "巡河累积时长(小时)",
          value: "patrol_time_total"
        },
        {
          text: "上报问题数量",
          value: "event_number"
        }
      ]
    };
  },
  components: {
    WTable
  },
  mounted() {
    //console.log(lineChartOptions);
  }
};
</script>
<style>
.analysis {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.analysis__data {
  height: 400px;
}

.analysis__charts {
  display: flex;
  overflow-x: auto;
  flex: 1;
  background-color: white;
  align-items: center;
}

.analysis__charts * + * {
  margin-right: 2em;
}

.analysis__chart {
  width: 50%;
  flex-shrink: 0;
  max-width: 500px;
}
</style>
