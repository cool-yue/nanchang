<template>
  <div class="analysis">
    <div class="analysis__data">
        <w-table
            :table-data="table_data"
            :table-header="header_fileds"
            :no-button="true"
            dense
            table-title="巡河统计表"
            :fix-header="true"
            :height="250"
            :no-search="true"
          >

          <template v-slot:item.shouldUp="{ item }">
           <v-chip
              x-small
              dark
            >
        {{ item.shouldUp }}
      </v-chip>
    </template>
          </w-table>
    </div>
    <div class="analysis__charts">


    <div class="analysis__chart">
      <apexchart
        type="bar"
        height="380"
        :options="chart_one.chartOptions"
        :series="chart_one.series"
      ></apexchart>
    </div>
    <div class="analysis__chart">
      <apexchart
        height="380"
        :options="chart_two.chartOptions"
        :series="chart_two.series"
      ></apexchart>
    </div>
    <div class="analysis__chart">
      <apexchart
        height="380"
        :options="chart_three.chartOptions"
        :series="chart_three.series"
      ></apexchart>
    </div>
    <div class="analysis__chart">
      <apexchart
        height="380"
        :options="chart_four.chartOptions"
        :series="chart_four.series"
      ></apexchart>
    </div>
    </div>
  </div>
</template>
<script>
import {
  // lineChartOptions,
  chart_one,
  chart_two,
  chart_three,
  chart_four
} from "./data.js";
import WTable from "../../components/wTable";
import tableData from "./tableData.js";
console.log(chart_one);
export default {
  data() {
    return {
      //lineChartOptions,
      chart_one,
      chart_two,
      chart_three,
      chart_four,
      //pieChartOptions,
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
        },
        {
          text: "待改善分析决策",
          value: "shouldUp"
        }
      ]
    };
  },
  components: {
    WTable
  },
  methods: {
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
  height: 420px;
}

.analysis__charts {
  display: flex;
  overflow-x: auto;
  flex: 1;
  align-items: center;
}

.analysis__charts * + * {
  margin-left: 2em;
}

.analysis__chart {
  width: 50%;
  flex-shrink: 0;
  max-width: 500px;
  background-color: white;
}
</style>
