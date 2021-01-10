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




function initVector(geojsonObject) {
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
    });
    console.log(vectorSource);
    console.log(vectorSource.getFeatures());
    return vectorSource;
}

export function getKunmingGeoJson() {
    return fetch("/source/kunming.json").then(res => res.json()).then(res => initVector(res)).catch(console.error);
}


// console.log(source);
// console.log(source.getFeatures());


export const view = new View({
    center: [0, 0],
    zoom: 1
});
  