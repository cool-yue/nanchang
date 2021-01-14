<template>
  <div class="map">
    <div id="map__content" class="map__content"><div id="popup"></div></div>
    <div id="info">&nbsp;</div>
    <div class="map__board">
        <div class="map__rain">
            <div class="map__title">
              <img src="../../assets/雨量站.svg" class="map__img" />
              <span>雨量站</span>
              <span class="map__total">6</span>
           </div>
            <div class="map__list">
                <div class="map__item">
                    <span class="map__normal">数据正常:</span><strong>04</strong>
                </div>
                <div class="map__item">
                    <span class="map__broken">数据异常:</span><strong>02</strong>
                </div>
            </div>
        </div>
        <div class="map__water">
        <div class="map__title">
               <img src="../../assets/水位站.svg" class="map__img" />
               <span>水位站</span>
               <span class="map__total">5</span>
        </div>
                           <div class="map__list">
                <div class="map__item">
                    <span class="map__normal">数据正常:</span><strong>02</strong>
                </div>
                <div class="map__item">
                    <span class="map__broken">数据异常:</span><strong>02</strong>
                </div>
            </div>
        </div>
        <div class="map__video">
        <div class="map__title">
              <img src="../../assets/摄像头.svg" class="map__img" />
              <span>视频站</span>
              <span class="map__total">3</span>
        </div>
                           <div class="map__list">
                <div class="map__item">
                    <span class="map__normal">数据正常:</span><strong>02</strong>
                </div>
                <div class="map__item">
                    <span class="map__broken">数据异常:</span><strong>01</strong>
                </div>
            </div>

        </div>
    </div>
    <div class="map__search">
      <v-row>
        <v-col cols="11" md="9">
          <v-text-field v-model="search_value" label="输入关键字"></v-text-field>
        </v-col>
        <v-col cols="11" md="3">
          <v-btn class="mt-3 mr-6">搜索</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import MultiPoint from "ol/geom/MultiPoint";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { Fill, Stroke, Style, Text, Icon } from "ol/style";
import OSM from "ol/source/OSM";
import TileJSON from "ol/source/TileJSON";
import iconGen from "./utils.icon.js";
import Overlay from 'ol/Overlay';

var style = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.8)"
  }),
  stroke: new Stroke({
    color: "#319FD3",
    width: 3
  }),
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "#000"
    }),
    stroke: new Stroke({
      color: "#fff",
      width: 3
    })
  })
});

// var highlightStyle = new Style({
//   stroke: new Stroke({
//     color: "#f00",
//     width: 1
//   }),
//   fill: new Fill({
//     color: "rgba(255,0,0,0.1)"
//   }),
//   text: new Text({
//     font: "14px Calibri,sans-serif",
//     fill: new Fill({
//       color: "#000"
//     }),
//     stroke: new Stroke({
//       color: "#f00",
//       width: 3
//     })
//   })
// });
const source = new VectorSource({
  url: "/source/kunming.geojson",
  format: new GeoJSON()
});

const view = new View({
  center: [0, 0],
  zoom: 2,
  projection: 'EPSG:4326'
});

const pathSource = new VectorSource({
  url: "/source/path.geojson",
  format: new GeoJSON()
});

const pathLayer = new VectorLayer({
  source: pathSource,
  style: function(feature) {
    return style;
  }
});

export default {
  data() {
    return {
      search_value: ""
    };
  },
  methods: {
    targetKunming() {
      const feature = source.getFeatures()[0];
      const polygon = feature && feature.getGeometry();
      polygon && view.fit(polygon, { padding: [400, 30, 30, 50] });
      // view.animate({ zoom: view.getZoom() - 1 });
    },
    toKunming() {
      var vectorLayer = new VectorLayer({
        source,
        style: function(feature) {
          style.getText().setText(feature.get("name"));
          return style;
        }
      });
      console.log("111",source.getFeatures());
      console.log("222",vectorLayer.getSource());
      var map = new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer,
          this.renderIconLayer(),
        ],
        target: "map__content",
        view
      });
      console.log("map在哪", map);
      var featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function(feature) {
          highlightStyle.getText().setText(feature.get("name"));
          return highlightStyle;
        }
      });

      // var highlight;
      // var displayFeatureInfo = function(pixel) {
      //   var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
      //     return feature;
      //   });

      //   var info = document.getElementById("info");
      //   if (feature) {
      //     info.innerHTML = feature.get("name");
      //   } else {
      //     info.innerHTML = "&nbsp;";
      //   }

      //   if (feature !== highlight) {
      //     if (highlight) {
      //       featureOverlay.getSource().removeFeature(highlight);
      //     }
      //     if (feature) {
      //       featureOverlay.getSource().addFeature(feature);
      //     }
      //     highlight = feature;
      //   }
      // };

      // map.on("pointermove", function(evt) {
      //   if (evt.dragging) {
      //     return;
      //   }
      //   var pixel = map.getEventPixel(evt.originalEvent);
      //   displayFeatureInfo(pixel);
      // });
      var element = document.getElementById('popup');

      var popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });
      map.addOverlay(popup);
      map.on("click", function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
         });
         if (
           feature
           && feature.getGeometry() instanceof Point
         ) {
           let coordinates = feature.getGeometry().getCoordinates();
           console.log(coordinates);
           popup.setPosition(coordinates);
           element.textContent = feature.get("name");
           //element.style.display = "block";
         } else {
           console.log("关闭");
           element.style.display = "none";
         }
      });
      setTimeout(this.targetKunming, 1000);
      //setTimeout(this.targetIcon, 3000);
    },
    targetIcon() {
      view.fit(new Point([102.704412, 25.282165]));
    },
    genWaterIcon(coordinates, isValid = true) {
        return iconGen.waterIconFeature(coordinates, isValid);
    },
    genVideoIcon(coordinates, isValid = true) {
        return iconGen.videoIconFeature(coordinates, isValid);
    },
    genRainIcon(coordinates, isValid = true) {
        return iconGen.rainIconFeature(coordinates, isValid);
    },
    addIconFeature(feature) {
      iconSource.addFeature(feature)
    },
    renderIconLayer() {
       const iconFeature1 = this.genRainIcon([102.56428241729736, 24.99189272112795]);
       const iconFeature2 = this.genRainIcon([102.99751281738281, 24.8851907122672], false);
      const iconFeature3 = this.genVideoIcon([103.001632690, 24.9141518]);
       const iconFeature4 = this.genVideoIcon([102.63908386230469, 24.989014303757518], false);
      const iconFeature5 = this.genWaterIcon([102.67684936523438, 24.79670834894575]);
      const iconFeature6 = this.genWaterIcon( [102.7837085723877,25.047891742482044], false);
      const iconFeature7 = this.genWaterIcon([102.75959014892577, 24.86338755462191], false);
      const iconFeature8 = this.genWaterIcon([102.75959014892577, 24.86338755462191], false);

      const iconFeature9 = this.genWaterIcon([102.92335510253905,  25.02432860086096]);
      const iconFeature10 = this.genWaterIcon(        [
          102.79254913330078,
          25.153054042635898
        ]);
      const iconFeature11 = this.genRainIcon(        [
          102.97245025634766,
          25.151189424078172
        ]);
      const iconFeature12 = this.genVideoIcon(        [
          102.8485107421875,
          25.19655371675069
        ]);
       const iconFeature13 = this.genRainIcon(     [
          102.40339279174805,
          25.880229968183293
        ]);
       const iconFeature14 = this.genRainIcon(         [
          102.42811203002928,
          25.877295473108283
        ]);
       const iconFeature15 = this.genRainIcon([
          102.46707916259766,
          25.883318831596714
        ], false);
      const iconSource = new VectorSource({
        features: [
          iconFeature1, iconFeature2, iconFeature3, iconFeature4,
          iconFeature5, iconFeature6, iconFeature7, iconFeature8,
          iconFeature9, iconFeature10, iconFeature11, iconFeature12,
          iconFeature13, iconFeature14, iconFeature15
        ]
      });
      const iconLayer = new VectorLayer({
        source: iconSource
      });
      return iconLayer;
    }
  },
  mounted() {
    this.toKunming();
  }
};
</script>
<style>
.map {
  height: 100%;
  position: relative;
}
#info {
  position: absolute;
  right: 1em;
  top: 6em;
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

.map__board {
  padding: 1em;
  position: absolute;
  top: 5em;
  left: 1em;
  width: 15%;
  min-width: 250px;
  height: 30%;
  min-height: 300px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #1296db;
}
.map__img {
  height: 2em;
}
.map__title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.map__item {
  text-align: right;
}
.map__list {
  color: black;
}
.map__item * + * {
  padding-left: 1em;
}
.map__normal {
  color: #00BFA5;
}
.map__fatal {
  color: #F44336;
}
.map__broken {
  color: #FFA726;
}
.map__total {
  margin-left: auto;
}
.map__search {
  padding:1em;
  position: absolute;
  background-color: white;
  right: 1em;
  top: 5em;
  background-color: rgba(255, 255, 255, 0.8)
}
</style>
