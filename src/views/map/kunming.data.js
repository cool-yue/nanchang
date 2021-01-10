import {Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import View from "ol/View";

// export const source = new VectorSource({
//     url: 'https://geo.datav.aliyun.com/areas_v2/bound/530000_full.json',
//     format: new GeoJSON(),
// });


// export const source = new VectorSource({
//     url: 'data/geojson/switzerland.geojson',
//     format: new GeoJSON(),
// });




// var vectorLayer = new VectorLayer({
//     source: new VectorSource({
//       url: '/source/kunming.json',
//       format: new GeoJSON(),
//     }),
//     style: function (feature) {
//       style.getText().setText(feature.get('name'));
//       return style;
//     },
// });


export function getKunmingGeoJson() {
    return fetch("/source/kunming.json")
          .then(res => res.json())
          .then(() => geojsonObject)
          .then(res => initVector(res))
          .catch(console.error);
}


// console.log(source);
// console.log(source.getFeatures());


export const view = new View({
    center: [0, 0],
    zoom: 5
});
  