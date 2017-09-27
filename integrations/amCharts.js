import zipHeadersWithValues from './helper/zip';

/**
* A amChart data visualisation.
*
* Create amChart instance linked with data from Handsontable.
*
* @class AmChartsWrapper.
*/
class AmChartsWrapper {
/**
* Create a AmChartsWrapper.
* @param {string} amChartsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(amChartsRootId, hotInstance) {
    this.name = 'amCharts';
    this.chart = AmCharts.makeChart(amChartsRootId,
    AmChartsWrapper.getChartOptions(hotInstance));
  }

/**
*
* amChart options object.
*
* @returns {Object} amChart object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      type: 'serial',
      theme: 'light',
      dataProvider: zipHeadersWithValues(
        hotInstance.getSettings().colHeaders, hotInstance.getDataAtRow(0), 'key'),
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
*
* Watches changes from Handsontable and updates it in the chart.
*
* @param {Number} column column index.
* @param {Number} value column value.
*
*/
  updateChartData(column, value) {
    this.chart.dataProvider[column].value = value;

    this.chart.validateNow(true);
  }
}

export default AmChartsWrapper;
