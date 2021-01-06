<template>
    <div class="chief">
        <aside class="chief__sidebar">
            <v-treeview :items="tree_data"></v-treeview>
        </aside>
        <main class="chief__mian">
             <w-table :table-data="table_data" :headers="header_fileds"></w-table>
        </main>
    </div>
</template>
<script>
import chief_data from "./data";
import WTable from "../../components/wTable";
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
        WTable
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
    flex: 1
}
</style>