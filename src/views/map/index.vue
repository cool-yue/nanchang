<template>
  <div class="map">
    <div id="map__content" class="map__content"></div>
  </div>
</template>
<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

export default {
  mounted() {
    new Map({
      target: "map__content",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }
};
</script>
<style>
.map {
    height: 100%;
}
.map__content {
    height: 100%;
}
</style>