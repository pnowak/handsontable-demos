import Highcharts from 'highcharts';
import { hotOptions } from '../hotCharts';

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighChartExtends.
*/
class HighChartExtends {
/**
* Create a HighChartExtends.
* @param {string} highRoot - a reference to the element by its id.
*/
  constructor(highRoot) {
    this.highChart = new Highcharts.Chart(document.getElementById(highRoot),
    this.constructor.highOptions());
    this.name = 'highcharts';
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
  observeChange(column, value) {
    this.highChart.series[0].data[column].update(value);
  }
}

export default HighChartExtends;
