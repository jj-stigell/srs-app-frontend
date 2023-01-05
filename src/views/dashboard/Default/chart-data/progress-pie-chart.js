//-----------------------|| DASHBOARD - PROGRESS PIE CHART ||-----------------------//

const chartData = {
  series: [44, 55, 13],
  options: {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          show: false
        }
      }
    }],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
      // eslint-disable-next-line quotes
      fontFamily: `'Roboto', sans-serif`
    }
  },
};

export default chartData;
