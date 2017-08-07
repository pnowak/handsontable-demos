/* eslint class-methods-use-this: ["error", { "exceptMethods": ["highOptions"] }] */

import Highcharts from 'highcharts';
import { hotOptions } from '../hotchart';

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighCharts.
*/
class HighCharts {
  constructor(highRoot) {
    this.highcharts = new Highcharts.Chart(document.getElementById(highRoot), this.highOptions());
    this.name = 'highcharts';
  }

/**
*
* Listener for changes from Handsontable and updates it in the chart.
*
* @param {Number} col column index.
* @param {Number} value column value.
*
*/
  valueChanged(col, value) {
    this.highcharts.series[0].data[col].update(value);
  }

/**
*
* HighCharts options object.
*
* @returns {Object} HighCharts object configs.
*/
  highOptions() {
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
}

export default HighCharts;
