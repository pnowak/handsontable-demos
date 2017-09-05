import Highcharts from 'highcharts';

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
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(highChartsRootId, hotInstance) {
    this.highcharts = new Highcharts.Chart(document.getElementById(highChartsRootId),
    HighChartsWrapper.getChartOptions(hotInstance));
    this.name = 'highcharts';
  }

/**
*
* HighCharts options object.
*
* @returns {Object} HighCharts object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      title: {
        text: 'Highcharts & Handsontable',
      },
      xAxis: {
        categories: hotInstance.getSettings().colHeaders,
      },
      series: [{
        type: 'column',
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
    this.highcharts.series[0].data[column].update(value);
  }
}

export default HighChartsWrapper;
