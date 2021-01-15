<template>
<div class="drone">
    <div class="drone_main">
         <div class="drone_selection">
          <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-select
          :items="riverItems"
          label="选择河流"
          solo
        ></v-select>
          </v-col>
            <v-col
      cols="12"
      sm="6"
      md="6"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="选择日期区间"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dates"
          no-title
          scrollable
          range
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
            @click="$refs.menu.save(dates)"
          >
            确认
          </v-btn>
        </v-date-picker>
      </v-menu>

      </v-col>
    </v-row>
    </div>
        <div class="drone__list">

                    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            无人机航拍记录
          </th>
          <th class="text-left">
            日期
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in drone_records"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>




        </div>
        <div class="drone__video">
            <video src="/source/巡河.mp4" controls="controls" height="400"></video>
        </div>
    </div>

    <div class="drone_map">
         <div class="drone_path" id="drone_path"></div>
    </div>
</div>
</template>

<script>
import base_map_gen from "../utils/utils.map.js";
import pathGen from "../patrol/partrolPath.js";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
const droneSource = new VectorSource({
    features: []
});
const droneLayer = new VectorLayer({
    source: droneSource
});

const drone_path = [
          [
            102.98339366912842,
            25.17824302269057
          ],
          [
            102.98468112945557,
            25.177815805039046
          ],
          [
            102.98530340194702,
            25.177466262210338
          ],
          [
            102.98599004745483,
            25.17791290009135
          ],
          [
            102.98579692840576,
            25.17927222270171
          ],
          [
            102.9859471321106,
            25.179854784893614
          ],
          [
            102.98727750778198,
            25.180048971672072
          ],
          [
            102.98732042312622,
            25.180534437264576
          ]
];


export default {
  name: "drone",
  data() {
      return {
          menu: false,
          dates: ['2019-09-10', '2019-09-20'],
          riverItems: ["菜园河", "小清河", "船房河", "六甲宝象河", "新运粮河", "马料河", "白鱼河", "枧槽河"],
          drone_records: [
              {
                  name: "昆明-安宁市-菜园河无人机巡河",
                  date: "2019-09-15"
              }
          ]
      };
  },
  computed: {
       dateRangeText () {
        return this.dates.join(' ~ ')
      },
  },
  mounted() {
     const map =  base_map_gen("drone_path", 10);
     map.addLayer(droneLayer);
     const path_feature = pathGen.goodPathFeature(drone_path);
     droneSource.addFeature(path_feature);
     const view = map.getView();
     view.fit(path_feature.getGeometry());
     view.animate({zoom: view.getZoom() - 2});
  }
}
</script>

<style>
.drone {
    height: 100%;
    display: flex;
}
.drone_main {
    margin-right:1em;
    flex-basis: 400px;
    display: flex;
    flex-direction: column;
}

.drone_selection{
}
.drone_path {
    height: 100%;
}
.drone_map {
  width: 40%;
  flex-grow: 1;
  flex-shrink: 0;
}
.drone__list {
    margin-bottom: 2em;
}

.drone__video {
    margin-top: auto;
}
</style>