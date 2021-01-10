<template>
  <div class="map">
    <div id="map__content" class="map__content"></div>
    <div class="map__toolbar">
      <button @click="toKunming">to kunmimg</button>
    </div>
  </div>
</template>
<script>
import Map from "ol/Map";
import { OSM, Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { view, getKunmingGeoJson } from "./kunming.data.js";

const image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({color: 'red', width: 1}),
});


const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

const styles = {
  'Point': new Style({
    image: image,
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiPoint': new Style({
    image: image,
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
};




export default {
  methods: {
    toKunming() {
      getKunmingGeoJson().then((source) => {
          const vectorLayer = new VectorLayer({
            source,
            style: styleFunction,
          });
          console.log(vectorLayer);
          this.renderMap(vectorLayer);
      });
    },
    renderMap(vectorLayer) {
      new Map({
        target: "map__content",
        layers: [
          // new TileLayer({
          //   source: new OSM(),
          // }),
          vectorLayer
        ],
        view,
      });
    },
  },
  mounted() {
    this.toKunming();
  },
};
</script>
<style>
.map {
  height: 100%;
  position: relative;
}
.map__content {
  height: 100%;
}
.map__toolbar {
  position: absolute;
  left: 0;
  top: 4em;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
