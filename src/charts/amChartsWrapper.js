import './amCharts';

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
* @param {string} amChartsRootId - a reference to the element by its id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(amChartsRootId, hotInstance) {
    this.amChart = AmCharts.makeChart(amChartsRootId, AmChartsWrapper.amOptions(hotInstance));
    this.name = 'amCharts';
  }

/**
*
* amChart options object.
*
* @returns {Object} amChart object configs.
*/
  static amOptions(hotInstance) {
    return {
      type: 'serial',
      theme: 'light',
      dataProvider: AmChartsWrapper.zipHeadersWithValues(
        hotInstance.getSettings().colHeaders, hotInstance.getSettings().data[0]),
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
* Zip column header to the value of the column from Handsontable object settings.
* amCharts data provider needs data array in form:
*
* @example
* {
*  "key": "May",
*  "value": 144
* }
*
* @param {String} columnHeaders column headers from Handsontable object settings.
* @param {Number} columnValues column values from Handsontable object settings.
* @returns {Array} a merged key-value pair in array.
*/
  static zipHeadersWithValues(columnHeaders, columnValues) {
    return columnHeaders.map((item, index) => {
      const obj = {};

      obj.key = item;
      obj.value = columnValues[index];

      return obj;
    });
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
    this.amChart.dataProvider[column].value = value;

    this.amChart.validateNow(true);
  }
}

export default AmChartsWrapper;
