import iconStyleList from "./iconStyle.js";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

/**
 * 
 * @param {String} type 
 * @param {String} key 
 */

function typeToKey(type) {
    if (type.indexOf("视频站") >= 0) {
        return "videoStyle";
    } else if (type.indexOf("水位站") >= 0) {
        return "waterStyle";
    } else if (type.indexOf("雨量站") >= 0) {
        return "rainStyle";
    }
}

function IconFeatureGen(type, key = typeToKey(type)) {
    return function (coordinates, isValid = true) {
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
        iconFeature.setStyle(
            isValid
            ? iconStyleList[key][0]
            : iconStyleList[key][1]
        );
        return iconFeature;
    }
}


export default {
    rainIconFeature: IconFeatureGen("雨量站"),
    waterIconFeature: IconFeatureGen("水位站"),
    videoIconFeature: IconFeatureGen("视频站")
};