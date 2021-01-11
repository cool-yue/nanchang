<template>
  <div class="patrol">
    <div class="patrol_search">
      <v-row>
        <v-col
          cols="11"
          md="3"
        >
          <v-text-field
            v-model="name"
            label="河长姓名"
          ></v-text-field>
        </v-col>

        <v-col
          cols="11"
          md="3"
        >
          <v-text-field
            v-model="river_name"
            label="河流名称"
          ></v-text-field>
        </v-col>
    <v-col
      cols="11"
      sm="3"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="巡河日期"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          locale="zh-cn"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            取消
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            确认
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col
        cols="11"
        md="3"
    >
        <v-btn class="mt-3 mr-6"  color="primary">搜索</v-btn>
        <v-btn class="mt-3">重置</v-btn>
    </v-col>
  </v-row>
    </div>
    <div class="patrol_content">
      <div class="patrol_records">
            <v-data-table
                :fixed-header="true"
                 v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                 item-key="name"
                 show-select
                 class="elevation-1"
                 height="400"
             >
           <template v-slot:top>
            </template>
  </v-data-table>

      </div>
      <div class="partrol_tabs">
          <template>
      <v-tabs>
        <v-tab>轨迹</v-tab>
        <v-tab>详细信息</v-tab>
         <v-tab>图片</v-tab>
      </v-tabs>
</template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      river_name: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      singleSelect: true,
        selected: [],
        headers: [
          {
            text: '巡河人',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '河段名称', value: 'river_segment' },
          { text: '行政区划', value: 'region' },
          { text: '事件数量', value: 'event_number' },
          { text: '开始时间', value: 'start_time' },
          { text: '结束时间', value: 'end_time' },
          { text: '河段长度', value: 'river_segment_distance' },
          { text: '巡河里程', value: 'patrol_distance' },
          { text: '该次巡河时长（min）', value:'intervel' },
          { text: '有效性(里程数,路线有效区间)', value:'effort' },
        ],
        desserts: [
          {
            name: '河长1',
            river_segment: "大清河",
            region: "寻甸回族彝族自治县",
            event_number: 1,
            start_time: "2021-01-10 11:00:32",
            end_time: "2021-01-10 11:10:32",
            river_segment_distance: "5km",
            patrol_distance: "4km",
            intervel: "10",
            effort: "有效"
          },
          {
            name: '河长2',
            river_segment: "大清河",
            region: "寻甸回族彝族自治县",
            event_number: 1,
            start_time: "2021-01-10 11:00:32",
            end_time: "2021-01-10 11:10:32",
            river_segment_distance: "5km",
            patrol_distance: "4km",
            intervel: "10",
            effort: "有效"
          }
        ]
    }),
  }
</script>

<style>
.patrol_records {
  height: 450px;
}
.partrol_tabs {
  margin-top: 1em;
}
</style>
