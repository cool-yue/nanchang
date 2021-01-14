import iconStyleList from "./iconStyle.js";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

/**
 *
 * @param {String} type
 * @param {String} key
 */

function typeToKey(type) {
    if (type.indexOf("水库") >= 0) {
        return "reservoirStyle";
    } else if (type.indexOf("堤防") >= 0) {
        return "guardStyle";
    } else if (type.indexOf("罐区") >= 0) {
        return "canStyle";
    }
}

function IconFeatureGen(type, key = typeToKey(type)) {
    return function (coordinates) {
        if (
            !Array.isArray(coordinates)
            || !key
        ) {
            return;
        }
        const iconFeature = new Feature({
            geometry: new Point(coordinates),
            name: type,
        });
        iconFeature.setStyle(iconStyleList[key]);
        return iconFeature;
    }
}


export default {
    reservoirIconFeature: IconFeatureGen("水库"),
    guardIconFeature: IconFeatureGen("堤防"),
    canIconFeature: IconFeatureGen("罐区")
};