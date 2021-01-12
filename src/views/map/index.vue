<template>
  <div class="map">
    <div id="map__content" class="map__content"></div>
    <div id="info">&nbsp;</div>
    <div class="map__board">
        <div class="map__rain">
            <div class="map__title">
              <img src="../../assets/雨量站.svg" class="map__img" />
              <span>雨量站</span>
              <span class="map__total">13</span>
           </div>
            <div class="map__list">
                <div class="map__item">
                    <span class="map__normal">数据正常:</span><strong>10</strong>
                </div>
                <div class="map__item">
                    <span class="map__fatal">数据异常:</span><strong>02</strong>
                </div>
                <div class="map__item">
                    <span class="map__broken">设备损坏:</span><strong>01</strong>
                </div>
            </div>
        </div>
        <div class="map__water">
        <div class="map__title">
               <img src="../../assets/水位站.svg" class="map__img" />
               <span>水位站</span>
               <span class="map__total">15</span>
        </div>
                           <div class="map__list">
                <div class="map__item">
                    <span class="map__normal">数据正常:</span><strong>10</strong>
                </div>
                <div class="map__item">
                    <span class="map__fatal">数据异常:</span><strong>03</strong>
                </div>
                <div class="map__item">
                    <span class="map__broken">设备损坏:</span><strong>02</strong>
                </div>
            </div>
        </div>
        <div class="map__video">
        <div class="map__title">
              <img src="../../assets/摄像头.svg" class="map__img" />
              <span>视频站</span>
              <span class="map__total">22</span>
        </div>
                           <div class="map__list">
                <div class="map__item">
                    <span class="map__normal">数据正常:</span><strong>10</strong>
                </div>
                <div class="map__item">
                    <span class="map__fatal">数据异常:</span><strong>10</strong>
                </div>
                <div class="map__item">
                    <span class="map__broken">设备损坏:</span><strong>02</strong>
                </div>
            </div>

        </div>
    </div>
    <div class="map__search">
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
    <!--
    <div class="map__toolbar">
      <button @click="targetKunming">kunming</button>
    </div>
    -->
  </div>
</template>
<script>
import "ol/ol.css";
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

var style = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.4)"
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

var highlightStyle = new Style({
  stroke: new Stroke({
    color: "#f00",
    width: 1
  }),
  fill: new Fill({
    color: "rgba(255,0,0,0.1)"
  }),
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "#000"
    }),
    stroke: new Stroke({
      color: "#f00",
      width: 3
    })
  })
});
const source = new VectorSource({
  url: "/source/kunming.geojson",
  format: new GeoJSON()
});
const view = new View({
  center: [0, 0],
  zoom: 3,
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
      var map = new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          //rasterLayer,
          //pathLayer
          vectorLayer,
          this.renderRainIcon(),
        ],
        target: "map__content",
        view
      });

      var featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function(feature) {
          highlightStyle.getText().setText(feature.get("name"));
          return highlightStyle;
        }
      });

      var highlight;
      var displayFeatureInfo = function(pixel) {
        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });

        var info = document.getElementById("info");
        if (feature) {
          info.innerHTML = feature.get("name");
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

      map.on("pointermove", function(evt) {
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });

      map.on("click", function(evt) {

      });
      setTimeout(this.targetKunming, 1000);
      //setTimeout(this.targetIcon, 3000);
    },
    targetIcon() {
      view.fit(new Point([102.704412, 25.042165]));
    },
    renderRainIcon() {
      const iconFeature = new Feature({
        geometry: new Point([102.56428241729736, 24.99189272112795]),
        name: "雨量站",
        // population: 4000,
        // rainfall: 500
      });
      const iconFeature1 = new Feature({
        geometry: new Point([ 102.63908386230469, 24.989014303757518]),
        name: "摄像头",
        // population: 4000,
        // rainfall: 500
      });
      console.log("iconFeature.getGeometry()", iconFeature.getGeometry());
      const iconStyle = new Style({
        image: new Icon({
          src: "/source/雨量站.svg",
        })
      });
      const iconStyle1 = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "/source/摄像头.svg",
        })
      });
      iconFeature1.setStyle(iconStyle1);
      iconFeature.setStyle(iconStyle);
      const iconSource = new VectorSource({
        features: [iconFeature, iconFeature1]
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
  height: 40%;
  min-height: 340px;
  border-radius: 4px;
  background-color: white;
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
  position: absolute;
  background-color: white;
  left: 2em;
  top: 30em;
}
</style>
