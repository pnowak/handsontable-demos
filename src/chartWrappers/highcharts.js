import Highcharts from 'highcharts';

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighchartsWrapper.
*/
class HighchartsWrapper {
/**
* Create a HighChartsWrapper.
* @param {string} highChartsRootId - a reference to the element by its id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(highChartsRootId, hotInstance) {
    this.name = 'highcharts';
    this.chart = new Highcharts.Chart(document.getElementById(highChartsRootId),
    HighchartsWrapper.getChartOptions(hotInstance));
  }

/**
*
* HighCharts options object.
*
* @returns {Object} HighCharts object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      chart: {
        type: 'column',
        width: 650,
      },
      title: {
        text: 'Highcharts & Handsontable',
      },
      xAxis: {
        categories: hotInstance.getSettings().colHeaders,
      },
      series: [{
        colorByPoint: true,
        data: hotInstance.getDataAtRow(0),
      }],
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
    this.chart.series[0].data[column].update(value);
  }
}

export default HighchartsWrapper;
