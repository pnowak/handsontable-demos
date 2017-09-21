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
* @param {string} chartJsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(chartJsRootId, hotInstance) {
    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartJsRootId),
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 32,
          fontStyle: 'normal',
          text: 'Chart.js & Handsontable',
        },
        tooltips: {
          titleFontSize: 24,
          bodyFontSize: 21,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 24,
            },
          }],
          xAxes: [{
            ticks: {
              fontSize: 24,
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
