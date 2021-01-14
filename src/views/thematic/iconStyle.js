import { Fill, Stroke, Style, Text, Icon } from "ol/style";
/**
 *  index 0 正常  1异常
 */

export default {
    guardStyle: new Style({
            image: new Icon({
              src: "/source/堤防工程.svg",
            })
    }),
    reservoirStyle: new Style({
            image: new Icon({
              src: "/source/水库.svg",
            })
    }),
    canStyle: new Style({
            image: new Icon({
              src: "/source/成品罐.svg",
            })
    })
};