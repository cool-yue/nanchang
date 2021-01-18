<template>
  <div class="patrol">
    <div class="patrol_search">
      <v-row>
        <v-col cols="11" md="3">
          <v-text-field v-model="name" label="河长姓名"></v-text-field>
        </v-col>

        <v-col cols="11" md="3">
          <v-text-field v-model="river_name" label="河流名称"></v-text-field>
        </v-col>
        <v-col cols="11" sm="3">
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
            <v-date-picker v-model="date" locale="zh-cn" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                取消
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                确认
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="11" md="3">
          <v-btn class="mt-3 mr-6" color="primary">搜索</v-btn>
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
          height="300"
          dense
          @item-selected="handleSelect"
        >
        <template v-slot:item.effort="{ item }">
           <v-chip
              :color="getColor(item.effort)"
              x-small
              dark
            >
        {{ item.effort }}
      </v-chip>
    </template>
        </v-data-table>
      </div>
      <div class="partrol_tabs">
          <v-tabs>
            <v-tab>轨迹</v-tab>
            <v-tab>详细信息</v-tab>
            <v-tab>图片</v-tab>
            <v-tab>上报事件</v-tab>
            <v-tab-item>
                   <div class="patrol_pathinfo">
                         <div id="patrol__path"></div>
                         <div class="patrol_info">
                             <h3>轨迹信息</h3>
                             <div class="partrol__information"><span>有效性:</span> <span>{{info.effort}}</span></div>
                             <div class="partrol__information"><span>总长度:</span><span>{{info.total}}</span></div>
                             <div class="partrol__information"><span>当前长度:</span><span>{{info.current}}</span></div>
                             <div class="partrol__information"><span>占比:</span><span>{{info.percent}}</span></div>
                             <div class="partrol__information">有效规则: 在有效区域内,巡河长度必须不少于总长度的百分之50</div>
                         </div>
                   </div>
            </v-tab-item>
        <v-tab-item>
              <div>详细信息</div>
        </v-tab-item>
        <v-tab-item>
              <div>图片</div>
        </v-tab-item>
         <v-tab-item>
              <div>无</div>
        </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import pathData from "./path.data.js";
import pathFeature from "./partrolPath.js";


const polygon_feature = pathFeature.polygonFeature(pathData.polygonPath);
const pathSource = new VectorSource({
  features: [polygon_feature]
});
const pathLayer = new VectorLayer({
  source: pathSource
});
const view = new View({
    center: [102.89237022399902,
          24.890524113297225
],
    zoom: 14,
    projection: 'EPSG:4326'
});


export default {
  data: () => ({
    valid: false,
    name: "",
    river_name: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    singleSelect: true,
    selected: [],
    info: {
      effort: "有效",
      total: "3.1km",
      current: "2.85km",
      percent: "91.9%"
    },
    headers: [
      {
        text: "巡河人",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "河段名称", value: "river_segment" },
      { text: "行政区划", value: "region" },
      { text: "事件数量", value: "event_number" },
      { text: "开始时间", value: "start_time" },
      { text: "结束时间", value: "end_time" },
      { text: "河段长度", value: "river_segment_distance" },
      { text: "巡河里程", value: "patrol_distance" },
      { text: "该次巡河时长（min）", value: "intervel" },
      { text: "有效性(里程数,路线有效区间)", value: "effort" }
    ],
    desserts: [
      {
        name: "河长1",
        river_segment: "松茂水库",
        region: "寻甸回族彝族自治县",
        event_number: 1,
        start_time: "2021-01-10 11:00:32",
        end_time: "2021-01-10 11:10:32",
        river_segment_distance: "3.1km",
        patrol_distance: "2.85km",
        intervel: "10",
        effort: "有效"
      },
      {
        name: "河长2",
        river_segment: "松茂水库",
        region: "寻甸回族彝族自治县",
        event_number: 1,
        start_time: "2021-01-10 11:00:32",
        end_time: "2021-01-10 11:10:32",
        river_segment_distance: "3.1km",
        patrol_distance: "1.3km",
        intervel: "10",
        effort: "无效"
      }
    ]
  }),
  methods: {
    getColor(effort) {
      if (effort === "有效") {
        return "green";
      } else if(effort === "无效") {
        return "red"
      }
    },
    renderMap() {
       new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          pathLayer
        ],
        target: "patrol__path",
        view
      });
    },
    handleSelect(item) {
        if (item.value) {
             if (item.item.effort === "无效") {
                let badPathFeature = pathFeature.badPathFeature(pathData.badPath);
                 this.addPath(badPathFeature, this.okToBad);
             } else {
                let goodPathFeature = pathFeature.goodPathFeature(pathData.goodPath);
                 this.addPath(goodPathFeature, this.badToOk);
             }
        }
    },
    addPath(pathFeature, changeInfo) {
      let features = pathSource.getFeatures();
      if (features.length > 1) {
        features.slice(1).forEach(feature => {
          pathSource.removeFeature(feature);
        })
      }
      changeInfo && changeInfo();
      pathSource.addFeature(pathFeature);
    },
    okToBad() {
      this.info.effort = "无效";
      this.info.percent = "41.9%";
      this.info.current = "1.3km";
    },
    badToOk() {
      this.info.effort = "有效";
      this.info.percent = "91.9%";
      this.info.current = "2.85km";
    }
  },
  mounted() {
      setTimeout(this.renderMap, 2000);
  }
};
</script>

<style>
.patrol {
  height: 100%;
}
.patrol_records {
  height: 350px;
}
.partrol_tabs {
  margin-top: 1em;
  height: 30%;
}
.patrol_pathinfo {
  display: flex;
}
#patrol__path {
  height: 350px;
  width: 60%;
  min-width: 500px;
  margin-right: 1em;
}
.patrol_info {
  height: 350px;
}

.patrol_info > h3 {
  text-align:center;
}
.partrol__information {
    color: black;
}


.partrol__information > span + span {
  font-weight: bold;
}
.partrol__information:last-child {
  margin-top: 10em;
  color: #4CAF50;
}
</style>
