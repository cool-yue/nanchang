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
      <w-table :table-data="table_data" :headers="header_fileds"></w-table>
    </main>
  </div>
</template>
<script>
import chiefData from "./data";
import WTable from "../../components/wTable";
import WTree from "../../components/wTree";
const header_fileds = [
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
    text: "负责流域",
    value: "duty_river"
  },
  {
    text: "电话",
    value: "tel"
  }
];
export default {
  data() {
    return {
      table_data: [],
      header_fileds,
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
