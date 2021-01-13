<template>
  <div class="chief">
    <aside class="chief__sidebar white">
      <v-tabs vertical>
        <v-tab>
          行政区划
        </v-tab>
        <v-tab>
          流域
        </v-tab>
        <v-tab-item>
          <w-tree :tree-data="region_data"></w-tree>
        </v-tab-item>
        <v-tab-item>
          <w-tree :tree-data="river_data"></w-tree>
        </v-tab-item>
      </v-tabs>
      <v-tab-item> </v-tab-item>
      <v-tab-item> </v-tab-item>
    </aside>
    <main class="chief__mian">
      <v-tabs>
        <v-tab>
          组织体系
        </v-tab>
        <v-tab>
          河长巡河
        </v-tab>
        <v-tab>
           任务处置
        </v-tab>
        <v-tab-item>
            <w-table :table-data="table_data1" :table-header="header_fileds1"></w-table>
        </v-tab-item>
        <v-tab-item>
          <w-table :table-data="table_data2" :table-header="header_fileds2"></w-table>
        </v-tab-item>
        <v-tab-item>
          <w-table :table-data="table_data3" :table-header="header_fileds3"></w-table>
        </v-tab-item>
      </v-tabs>
    </main>
  </div>
</template>
<script>
import chiefData from "./data";
import WTable from "../../components/wTable";
import WTree from "../../components/wTree";
const header_fileds1 = [
  {
    text: "河长姓名",
    value: "name"
  },
  {
    text: "性别",
    value: "gender"
  },
  {
    text: "行政级别",
    value: "level"
  },
  {
    text: "负责河流",
    value: "duty_river"
  },
  {
    text: "电话",
    value: "tel"
  }
];
const header_fileds2 = [
  {
    text: "巡河人",
    value: "name"
  },
  {
    text: "河段名称",
    value: "river_segment"
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
];
const header_fileds3 = [
  {
    text: "任务名称",
    value: "task_name"
  },
  {
    text: "河段",
    value: "segment"
  },
  {
    text: "巡河人",
    value: "name"
  },
  {
    text: "任务处置状态",
    value: "task_state"
  },
  {
    text: "任务处置描述",
    value: "note"
  }
];
export default {
  data() {
    return {
      table_data1: chiefData.chief.chief,
      table_data2: chiefData.chief.patrol,
      table_data3: chiefData.chief.task,
      header_fileds1,
      header_fileds2,
      header_fileds3,
      region_data: chiefData.region,
      river_data: chiefData.river
    };
  },
  components: {
    WTable,
    WTree
  },
  mounted() {
    console.log(chiefData);
  }
};
</script>
<style>
.chief {
  display: flex;
  height: 100%;
}
.chief__sidebar {
  margin-right: 1.5em;
  height: 100%;
  overflow: auto;
}
.chief__mian {
  flex: 1;
}
</style>
