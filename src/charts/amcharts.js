/* eslint no-undef: 0 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["merge"] }] */

import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/themes/light';
import { hotOptions } from '.././hotchart';

/**
* A amChart data visualisation.
*
* Create amChart instance linked with data from Handsontable.
*
* @class AmChart.
*/
class AmChart {
  constructor(amRoot) {
    this.amcharts = AmCharts.makeChart(amRoot, this.amOptions());
    this.name = 'amcharts';
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
    this.amcharts.dataProvider[col].value = value;

    this.amcharts.validateNow(true);
  }

/**
*
* amChart options object.
*
* @returns {Object} amChart object configs.
*/
  amOptions() {
    return {
      type: 'serial',
      theme: 'light',
      dataProvider: this.merge(hotOptions().colHeaders, hotOptions().data[0]),
      valueAxes: [{
        gridColor: '#FFFFFF',
        gridAlpha: 0.2,
        dashLength: 0,
      }],
      gridAboveGraphs: true,
      startDuration: 1,
      graphs: [{
        balloonText: '[[category]]: <b>[[value]]</b>',
        fillAlphas: 0.8,
        lineAlpha: 0.2,
        type: 'column',
        valueField: 'value',
      }],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false,
      },
      categoryField: 'key',
      categoryAxis: {
        gridPosition: 'start',
        gridAlpha: 0,
        tickPosition: 'start',
        tickLength: 20,
      },
      export: {
        enabled: true,
      },
    };
  }

/**
* Helper function.
*
* Merge column header to the value of the column from Handsontable object settings.
* amCharts data provider needs data array in form:
* {
*  "key": "May",
*  "value": 144
* }
*
* @param {String} key column header from Handsontable object settings.
* @param {Number} value column value from Handsontable object settings.
* @returns {Array} a merged key-value pair in array.
*/
  merge(key, value) {
    const destination = [];

    for (let i = 0, k = key.length; i < k; i += 1) {
      for (let j = 0, v = value.length; j < v; j += 1) {
        if (i === j) {
          const obj = {};

          obj.key = key[i];
          obj.value = value[j];

          destination.push(obj);
        }
      }
    }

    return destination;
  }
}

export default AmChart;
