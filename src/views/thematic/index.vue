<template>
<div class="thematic">
<div class="thematic__map" id="thematic__map"></div>
<div class="thematic__bar">
      <v-row>
      <v-col
      cols="11"
      md="11"
      >
        <v-select
          :items="thematics"
          label="选择专题"
          value="水库"
          dense
          outlined
          @change="handleChange"
        ></v-select>
      </v-col>
        </v-row>
</div>
<div class="thematic__info">
<h3>{{currentTableName}}统计</h3>
<v-simple-table
    fixed-header
    height="610px"
    dense
>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            区域
          </th>
          <th class="text-left">
            数量
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
</div>
</template>

<script>
import render_base_map from "../utils/utils.map.js";
import thematic_data from "./data.js";
import iconGen from "./utils.icon.js";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

const iconSource = new VectorSource({
    features: []
});
const iconLayer = new VectorLayer({
    source: iconSource
});
const {
  reservoirIconFeature,
  guardIconFeature,
  canIconFeature,
} = iconGen;

const {
    reservoirPoints,
    guardPoints,
    canPoints,
    guardTableData,
    reservoirTableData,
    canTableData
} = thematic_data;


export default {
  name: "thematic",
  data() {
      return {
        currentTableName: "水库",
        items: reservoirTableData,
        thematics: ["水库", "堤防", "罐区"]
      };
  },
  methods: {
      renderIconFeature(featureGen, pointData) {
          const currentFeatures = iconSource.getFeatures();
          if (currentFeatures.length > 0) {
              currentFeatures.forEach(feature => {
                  iconSource.removeFeature(feature);
              });
          }
          pointData.forEach(point => {
              iconSource.addFeature(featureGen(point));
          });
      },
      handleChange(value) {
          console.log(value);
          this.currentTableName = value;
          this.renderIcon(value);
          this.renderTable(value)
      },
      renderIcon(thematic) {
          if (thematic === "水库") {
              this.renderIconFeature(reservoirIconFeature, reservoirPoints);
          } else if (thematic === "堤防") {
              this.renderIconFeature(guardIconFeature, guardPoints);
          } else if (thematic === "罐区") {
               this.renderIconFeature(canIconFeature, canPoints);
          }
      },
      renderTable(thematic) {
          if (thematic === "水库") {
              this.items = reservoirTableData;
          } else if (thematic === "堤防") {
              console.log(guardTableData);
              this.items = guardTableData;
          } else if (thematic === "罐区") {
              console.log(canTableData);
              this.items = canTableData;
          }
      }
  },
  mounted() {
      render_base_map("thematic__map").addLayer(iconLayer);
      setTimeout(() => {
          this.renderIconFeature(reservoirIconFeature, reservoirPoints);
      }, 1000)
  }
}
</script>
<style>
.thematic {
    --top: 5em;
    position: relative;
    height: 100%;
}
.thematic__map {
    height: 100%;
}
.thematic__bar, .thematic__info  {
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    padding: 1em;
}
.thematic__bar {
    left: 1em;
    top: var(--top);
}
.thematic__info {
    right: 1em;
    min-width: 300px;
    top: var(--top);
}
.thematic__info > h3 {
    text-align: center;
}
</style>