
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon'
import { Fill, Stroke, Style, Text, Icon } from "ol/style";


const pathGoodstyle = new Style({
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.8)"
    }),
    stroke: new Stroke({
      color: "#4CAF50",
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

const pathBadStyle = new Style({
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.8)"
    }),
    stroke: new Stroke({
      color: "#BF360C",
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

const polygonStyle = new Style({
    fill: new Fill({
        color: "rgba(255, 255, 255, 0.6)"
    }),
    stroke: new Stroke({
        color: "#29B6F6",
        width: 1
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


function pathFeatureGen(model, style) {
    return function (path_coordinates) {
        if (!Array.isArray(path_coordinates)) {
            return;
        }
        const pathFeature = new Feature({
            geometry: new model(path_coordinates),
            name: "path",
        });
        pathFeature.setStyle(style);
        return pathFeature;
    }
}


export default {
    badPathFeature: pathFeatureGen(LineString, pathBadStyle),
    goodPathFeature: pathFeatureGen(LineString, pathGoodstyle),
    polygonFeature: pathFeatureGen(Polygon, polygonStyle)
};


