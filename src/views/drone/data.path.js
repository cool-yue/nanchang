
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon'
import { Fill, Stroke, Style, Text, Icon } from "ol/style";




const pathStyle = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.8)"
  }),
  stroke: new Stroke({
    color: "#0277BD",
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
  dronePathFeature: pathFeatureGen(LineString, pathStyle)
};