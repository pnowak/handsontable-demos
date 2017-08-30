import Highcharts from 'highcharts';
import { hotOptions } from '../hotCharts';

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighChartsWrapper.
*/
class HighChartsWrapper {
/**
* Create a HighChartsWrapper.
* @param {string} highChartsRootId - a reference to the element by its id.
*/
  constructor(highChartsRootId) {
    this.highChart = new Highcharts.Chart(document.getElementById(highChartsRootId),
    HighChartsWrapper.highOptions());
    this.name = 'highCharts';
  }

/**
*
* HighCharts options object.
*
* @returns {Object} HighCharts object configs.
*/
  static highOptions() {
    return {
      title: {
        text: 'HighChart & Handsontable',
      },
      xAxis: {
        categories: hotOptions().colHeaders,
      },
      series: [{
        type: 'column',
        colorByPoint: true,
        data: hotOptions().data[0],
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
    this.highChart.series[0].data[column].update(value);
  }
}

export default HighChartsWrapper;
