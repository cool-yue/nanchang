import tableData from "./tableData.js";


const chart_one_data = tableData.map(item => {
  return {
    name: item.name,
    patrol_complete_rate: Number(item.patrol_complete_rate.replace("%", ""))
  }
}).so


function extractRankedDataByTarget(key, handler) {
  const result =  tableData.map(item => {
    return {
      name: item.name,
      value: (
        (
          handler
          && typeof handler === "function"
        )
        ? handler(item[key])
        : item[key]
      )
    };
  }).sort((first, second) => {
    return second.value - first.value;
  });
  return {
    data: result.map(item => item.value),
    average: (result.map(item => item.value).reduce((sum, first) => sum += first, 0)) / result.length,
    categories: result.map(item => item.name)
  };
}


function colorForChart({dataPointIndex, value}) {
    if (dataPointIndex <= 2) {
      return "#4CAF50";
    }
    return "#03A9F4";
}


function colorForChartByAverage(average) {
  if (!average) {
    return colorForChart;
  }
  return function ({dataPointIndex, value}) {
    console.log("value---average",dataPointIndex , value, average);
    if (dataPointIndex <= 2) {
      console.log("前三");
      return "#4CAF50";
    }
    if (value < average) {
      console.log("红色");
      return "#DD2C00";
    }
    console.log("蓝色");
    return "#03A9F4";
  }
}



const chart_data_one = extractRankedDataByTarget("patrol_complete_rate", function (value) {
  return Number(value.replace("%", ""));
});
console.log(chart_data_one.average);
const colorForChartOne = colorForChartByAverage(chart_data_one.average);


const chart_data_two = extractRankedDataByTarget("task_complete_rate", function (value) {
  return Number(value.replace("%", ""));
});
console.log(chart_data_two.average);
const colorForChartTwo = colorForChartByAverage(chart_data_two.average);

const chart_data_three = extractRankedDataByTarget("patrol_river_distance");
console.log(chart_data_three.average);
const colorForChartThree = colorForChartByAverage(chart_data_three.average);


const chart_data_four = extractRankedDataByTarget("patrol_time_total");
console.log(chart_data_four.average);
const colorForChartFour = colorForChartByAverage(chart_data_four.average);


// 巡河完成率排名
export const chart_one = {
  series: [{
    name: "巡河完成率",
    data: chart_data_one.data
  }],
  chartOptions: {
    colors: [colorForChartOne],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true
    },
    title: {
      text: '河长巡河完成率排名'
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%"
        }
      }
    },
    annotations: {
      xaxis: [{
        x: chart_data_one.average,
        borderColor: '#FFC107',
        borderWidth: 5,
        strokeDashArray: 8,
        offsetX: 0,
        offsetY: 0,
        label: {
          position: "bottom",
          borderColor: '#fff',
          style: {
            color: '#212121',
            background: '#FFC107',
            fontSize: '16px',
            fontWeight: 500,
          },
          text: '平均值(' + chart_data_one.average + ')',
        }
    }]
  },
    xaxis: {
      categories: chart_data_one.categories,
      labels: {
        formatter: function (val) {
          return val + "%";
        },
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      },
      title: {
        text: "巡河完成率"
      }
    }
  }
};
// 问题处理率排名
export const chart_two = {
  series: [{
    name: "问题处理率",
    data: chart_data_two.data
  }],
  chartOptions: {
    colors: [colorForChartTwo],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: '巡河问题处理率排名'
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%"
        }
      }
    },
    annotations: {
      xaxis: [{
        x: chart_data_two.average,
        borderColor: '#FFC107',
        borderWidth: 5,
        strokeDashArray: 8,
        offsetX: 0,
        offsetY: 0,
        label: {
          position: "bottom",
          borderColor: '#fff',
          style: {
            color: '#212121',
            background: '#FFC107',
            fontSize: '16px',
            fontWeight: 500,
          },
          text: '平均值(' + chart_data_two.average + ')',
        }
    }]
  },
    xaxis: {
      categories: chart_data_two.categories,
      labels: {
        formatter: function (val) {
          return val + "%";
        },
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      },
      title: {
        text: "问题处理率"
      }
    }
  }
};
// 巡河里程数排名
export const chart_three = {
  series: [{
    name: "累积巡河里程",
    data: chart_data_three.data
  }],
  chartOptions: {
    colors: [colorForChartThree],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: '累积巡河里程排名'
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "KM"
        }
      }
    },
    annotations: {
      xaxis: [{
        x: chart_data_three.average,
        borderColor: '#FFC107',
        borderWidth: 5,
        strokeDashArray: 8,
        offsetX: 0,
        offsetY: 0,
        label: {
          position: "bottom",
          borderColor: '#fff',
          style: {
            color: '#212121',
            background: '#FFC107',
            fontSize: '16px',
            fontWeight: 500,
          },
          text: '平均值(' + chart_data_three.average + ')',
        }
    }]
  },
    xaxis: {
      categories: chart_data_three.categories,
      labels: {
        formatter: function (val) {
          return val + "KM";
        },
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      },
      title: {
        text: "公里数"
      }
    }
  }
};

// 巡河总时长
export const chart_four = {
  series: [{
    name: "巡河累积时长",
    data: chart_data_four.data
  }],
  chartOptions: {
    colors: [colorForChartFour],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true
    },
    title: {
      text: '河长巡河累积时长排名'
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "小时"
        }
      }
    },
    annotations: {
      xaxis: [{
        x: chart_data_four.average,
        borderColor: '#FFC107',
        borderWidth: 5,
        strokeDashArray: 8,
        offsetX: 0,
        offsetY: 0,
        label: {
          position: "bottom",
          borderColor: '#fff',
          style: {
            color: '#212121',
            background: '#FFC107',
            fontSize: '16px',
            fontWeight: 500,
          },
          text: '平均值(' + chart_data_four.average + ')',
        }
    }]
  },
    xaxis: {
      categories: chart_data_four.categories,
      labels: {
        formatter: function (val) {
          return val + "小时";
        },
        style: {
          fontSize: "16px",
          fontWeight: 600,
        }
      },
      title: {
        text: "时长"
      }
    }
  }
};