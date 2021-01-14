const reservoirPoints = [
    [
        103.3978271484375,
        24.75431413309125
    ],
    [

        103.16436767578124,
        24.966140159912975
    ],
    [
        102.5189208984375,
        26.00989258640275
    ],
    [
        103.02154541015625,
        25.62914524992192
    ],
    [
        103.04351806640625,
        26.130782003547658
    ],
    [
        102.51617431640625,
        25.31671837192806
    ],
    [
        102.6727294921875,
        25.147770882723563
    ],
    [
        102.8155517578125,
        25.28195426595429
    ],
    [
        102.35687255859375,
        24.681961205014595
    ],
    [
        102.6837158203125,
        24.594582762359718
    ],
    [
        102.83752441406249,
        24.844072974931866
    ],
    [
        102.557373046875,
        25.030861410390447
    ],
    [
        103.30169677734375,
        25.626668871238568
    ],
    [
        102.54913330078124,
        25.69846299326166
    ],
    [
        102.7056884765625,
        25.972860695923938
    ],
    [

        102.96112060546875,
        25.078136134310142
    ]
]

const canPoints = [
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                102.5299072265625,
                25.4705536549478
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                103.2000732421875,
                25.99014369697799
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                102.974853515625,
                25.69103802005013
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                102.82379150390625,
                25.20245604734131
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                102.3651123046875,
                24.696934226366672
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                103.45275878906249,
                24.724380091871726
            ]
        }
    }
];

const guard = [{
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Point",
        "coordinates": [
            102.6947021484375,
            24.805434772108956
        ]
    }
},
{
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Point",
        "coordinates": [
            103.00094604492186,
            24.902319065330182
        ]
    }
},
{
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Point",
        "coordinates": [
            102.49051094055176,
            24.857235253766245
        ]
    }
}];


const regions = [
    "五华区",
    "昆明国家高新技术产业开发区",
    "滇池度假区",
    "昆明国家级经济技术开发区",
    "阳宗海风景名胜区",
    "安宁市",
    "寻甸回族彝族自治县",
    "禄劝彝族苗族自治县",
    "嵩明县",
    "石林彝族自治县",
    "宜良县",
    "富民县",
    "晋宁县",
    "呈贡区",
    "东川区",
    "西山区",
    "官渡区",
    "盘龙区",
];

const canValue = [0,0,0,0,0,1,1,1,0,1,0,0,0,0,1,0,0,1];
const reservoirValue = [1,0,0,0,0,1,2,3,0,1,1,1,1,1,1,1,1,1];
const guardValue = [0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0];


const canTableData = regions.map((item, index) => {
    return {
        name: item,
        value: canValue[index]
    };
}).reverse();


const reservoirTableData = regions.map((item, index) => {
    return {
        name: item,
        value: reservoirValue[index]
    };
}).reverse();


const guardTableData = regions.map((item, index) => {
    return {
        name: item,
        value: canValue[index]
    };
}).reverse();





function transferData(data) {
    return data.map(item => item.geometry.coordinates);
}

export default {
    reservoirPoints,
    canPoints: transferData(canPoints),
    guardPoints: transferData(guard),
    guardTableData,
    reservoirTableData,
    canTableData
}