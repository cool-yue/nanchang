import { Fill, Stroke, Style, Text, Icon } from "ol/style";
/**
 *  index 0 正常  1异常
 */

export default {
    rainStyle: [
        new Style({
            image: new Icon({
              src: "/source/雨量站.svg",
            })
        }),
        new Style({
            image: new Icon({
              src: "/source/雨量站异常.svg",
            })
        }),
    ],
    waterStyle: [
        new Style({
            image: new Icon({
              src: "/source/水位站.svg",
            })
        }),
        new Style({
            image: new Icon({
              src: "/source/水位站异常.svg",
            })
        })
    ],
    videoStyle: [
        new Style({
            image: new Icon({
              src: "/source/摄像头.svg",
            })
        }),
        new Style({
            image: new Icon({
              src: "/source/摄像头异常.svg",
            })
        })
    ]
};