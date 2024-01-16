import React from 'react';
import ReactApexChart from 'react-apexcharts';

function AllocationChart({ colors, countdata, categories, xaxisText, yaxisText, type = 'bar' }) {
  
  let strokeOptions = type === 'area' ?
    {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: colors
    } :
    {
      show: true,
      width: 2,
      colors: colors
    };

  let fillOptions = type === 'area' ? {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 80, 100]
    }
  } : {
    opacity: 1
  };
  
  let data = {
    series: [{
      data: countdata,
      name: ""
    }],
    options: {
      chart: {
        type: type,
        colors: "grey",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: countdata.length >= 20 ? ['80%'] : ['30%'],
          borderRadius: 5,
          dataLabels: {
            position: "top"
          },
          startingShape: 'flat'
        },
      },
      dataLabels: {
        enabled: type !== 'area',
        offsetY: -28,
        style: {
          fontSize: '13px',
          colors: ["grey"]
        },
        formatter: function (val) {
          return val;
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        title: {
          text: xaxisText,
          offsetY: -5
        },
        categories: categories,
        labels: {
          rotate: -50,
          rotateAlways: true,
          trim: true,
          style: {
            colors: "grey",
            fontSize: '13px'
          },
          formatter: function (val) {
            return val;
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            gradient: {
              opacityFrom: 0,
              opacityTo: 0
            }
          }
        },
      },
      yaxis: {
        title: {
          text: yaxisText,
        },
        forceNiceScale: true,
        min: 0.0,
        decimalsInFloat: 2,
        labels: {
          style: {
            colors: "gery",
            fontSize: '13px'
          },
          // formatter: function (val) {
          //   return val + "";
          // }
        }
      },
      fill: fillOptions,
      stroke: strokeOptions,
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px'
        },
        y: {
          formatter: function (val) {
            return + val + ''
          }
        }
      },
      colors: colors,
      grid: {
        borderColor: "grey",
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        }
      }

    }
  }

  const sumOfYaxis = countdata.reduce(function(total,num) {return total + parseInt(num);}, 0)
  if(sumOfYaxis === 0) {
    data.options.yaxis.max = 10
  } else {
    const maxOfYaxis = countdata.reduce(function(max,num) {return max < parseInt(num) ? parseInt(num) : max ;}, 0)
    data.options.yaxis.max = maxOfYaxis + 1
  }

  if(type === 'area') {
    data.options.xaxis.tooltip = {enabled: false}
  }
  return (
    <div id="chart">
      <ReactApexChart options={data.options} series={data.series} type={type} width={"100%"} height={330} />
    </div>
  );
}
export default AllocationChart;