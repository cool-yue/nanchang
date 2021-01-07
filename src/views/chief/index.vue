<template>
  <div class="chief">
    <aside class="chief__sidebar">
        <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        行政区划
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        流域
      </v-tab>
      <v-tab-item>
            <w-tree></w-tree>
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
import chief_data from "./data";
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
      tree_data: chief_data.region,
      header_fileds
    };
  },
  components: {
    WTable,
    WTree
  }
};
</script>
<style>
.chief {
  display: flex;
}
.chief__sidebar {
  margin-right: 1.5em;
}
.chief__mian {
  flex: 1;
}
</style>
