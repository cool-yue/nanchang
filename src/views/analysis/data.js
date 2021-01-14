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
    return second[key] - first[key];
  });

  return {
    data: result.map(item => item.value),
    categories: result.map(item => item.name)
  };
}

console.log("过滤", extractRankedDataByTarget("patrol_complete_rate", function (value) {
  return Number(value.replace("%", ""));
}));



// 巡河完成率排名
export const chart_one = {
  series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
  chartOptions: {
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
    xaxis: {
      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        'United States', 'China', 'Germany'
      ],
    }
  }
};

export const columnChartOptions = {
  chartOptions: {
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct"
      ]
    },
    yaxis: {
      title: {
        text: "$ (thousands)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return "$ " + val + " thousands";
        }
      }
    }
  },
  series: [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }
  ]
};

export const pieChartOptions = {
  series: [44, 55, 13, 43, 22],
  chartOptions: {
    chart: {
      width: 380,
      type: "pie"
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  }
};
