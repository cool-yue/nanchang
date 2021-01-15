



const year_chart_one = {
    series: [{
        name: '在建项目同比',
        type: 'column',
        data: [0, 1, 2]
      }, {
        name: '在建项目环比',
        type: 'line',
        data: [0, 1, 2]
      },
      {
      name: '已建项目同比',
      type: 'column',
      data: [1, 0, 1]
    }, {
      name: '已建项目环比',
      type: 'line',
      data: [1, 0, 1]
    }


    ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: [0, 4]
        },
        title: {
          text: '水利项目状态环比同比图'
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels: ['2014', '2015', '2016'],
        xaxis: {
                categories: ['2014', '2015', '2016'],
        },
        yaxis: [{
          title: {
            text: '项目数',
          },

        }]
      }
};

const year_chart_two = {
    series: [3, 1, 1],
    chartOptions: {
      chart: {
        width: 380,
        type: 'pie',
      },
      title: {
        text: '项目类型'
      },
      labels: ['提防工程', '河湖治理', '枢纽工程'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
}

export default {
    year_chart_one,
    year_chart_two
};