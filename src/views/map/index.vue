<template>
  <div class="map">
    <div id="map__content" class="map__content"></div>
    <div id="info">&nbsp;</div>
    <div class="map__toolbar"><button @click="targetKunming">kunming</button></div>
  </div>
</template>
<script>
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View';
import {Fill, Stroke, Style, Text} from 'ol/style';
import OSM from 'ol/source/OSM';


var style = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.4)",
  }),
  stroke: new Stroke({
    color: "#319FD3",
    width: 3,
  }),
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "#000",
    }),
    stroke: new Stroke({
      color: "#fff",
      width: 3,
    }),
  }),
});

var highlightStyle = new Style({
  stroke: new Stroke({
    color: "#f00",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(255,0,0,0.1)",
  }),
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "#000",
    }),
    stroke: new Stroke({
      color: "#f00",
      width: 3,
    }),
  }),
});
const source = new VectorSource({
          url: "/source/kunming.geojson",
          format: new GeoJSON(),
});
const view = new View({
          center: [0, 0],
          zoom: 1,
});

export default {
  methods: {
    targetKunming() {
         var feature = source.getFeatures()[0];
         var polygon = feature.getGeometry();
         view.fit(polygon, {padding: [400, 30, 30, 50]});
         view.animate({zoom: view.getZoom() - 1 });
    },
    toKunming() {
      var vectorLayer = new VectorLayer({
        source,
        style: function (feature) {
          style.getText().setText(feature.get("name"));
          return style;
        },
      });
      console.log(vectorLayer);
      var map = new Map({
        layers: [
          new TileLayer({
           source: new OSM(),
         }),
        
        vectorLayer],
        target: "map__content",
        view,
      });

      var featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function (feature) {
          highlightStyle.getText().setText(feature.get("name"));
          return highlightStyle;
        },
      });

      var highlight;
      var displayFeatureInfo = function (pixel) {
        var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });

        var info = document.getElementById("info");
        if (feature) {
          info.innerHTML = feature.getId() + ": " + feature.get("name");
        } else {
          info.innerHTML = "&nbsp;";
        }

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
        }
      };

      map.on("pointermove", function (evt) {
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });

      map.on("click", function (evt) {
        displayFeatureInfo(evt.pixel);
      });
      setTimeout(this.targetKunming, 1000);
    },
    renderMap(vectorLayer) {
      console.log("vectorLayer", vectorLayer);
      new Map({
        target: "map__content",
        layers: [vectorLayer],
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
