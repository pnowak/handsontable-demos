import Chart from 'chart.js';

/**
* A ChartJs data visualisation.
*
* Create ChartJs instance linked with data from Handsontable.
*
* @class ChartJsWrapper.
*/
class ChartJsWrapper {
/**
* Create a ChartJsWrapper.
* @param {string} chartRootId - a reference to the element by its id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(chartRootId, hotInstance) {
    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartRootId),
    ChartJsWrapper.getChartOptions(hotInstance));
  }

/**
*
* ChartJs options object.
*
* @returns {Object} ChartJs object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      type: 'bar',
      data: {
        labels: hotInstance.getSettings().colHeaders,
        datasets: [{
          data: hotInstance.getDataAtRow(0),
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 1,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 18,
          fontStyle: 'normal',
          text: 'Chart.js & Handsontable',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    };
  }

/**
*
* Watches changes from Handsontable and updates it in the chart.
*
* @param {Number} column column index.
* @param {Number} value column value.
*
*/
  updateChartData(column, value) {
    this.chart.data.datasets[0].data[column] = value;
    this.chart.update();
  }
}

export default ChartJsWrapper;
