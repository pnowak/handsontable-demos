import Handsontable from 'handsontable';

/**
*
* Handsontable options object.
*
* @returns {Object} Handsontable object settings.
*/
export function hotOptions() {
  return {
    data: [
      [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    ],
    colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    rowHeaders: true,
    columns: [
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
      { type: 'numeric' },
    ],
  };
}

/**
* A Handsontable integrate with different charts.
*
*
* Create Handsontable instance linked with data from different chart/charts.
*
* @example
* const highChart = new HighChart('highcharts');
* const amChart = new AmChart('amcharts');
* const hotChart = new HotChart('root', highChart, amChart);
*
* @class HotChart.
*/

class HotChart {
/**
* Create a hotchart.
* @param {string} hotRoot - a reference to the element by its id.
* @param {string} charts - one or more chart object.
*/
  constructor(hotRoot, ...charts) {
    this.hot = new Handsontable(document.getElementById(hotRoot), hotOptions());
    this.charts = charts;
  }
}

export default HotChart;
