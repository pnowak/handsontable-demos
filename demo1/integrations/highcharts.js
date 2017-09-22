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
* @param {string} highChartsRootId - element id.
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
        categories: HighchartsWrapper.updateChartColumns(hotInstance),
      },
      series: HighchartsWrapper.zipTeamWithRowData(hotInstance),
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
*  "name": "Game 1",
*  "data": [144, 12, 13]
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static zipTeamWithRowData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.name = hotInstance.getSettings().rowHeaders(index);
      obj.data = hotInstance.getDataAtRow(index);

      rowsArray.push(obj); console.log(obj);
    }

    return rowsArray;
  }

  /**
* Helper function.
*
*
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static updateChartColumns(hotInstance) {
    const categoriesArray = [];

    for (let index = 0; index < hotInstance.countCols(); index += 1) {
      categoriesArray.push(hotInstance.getSettings().colHeaders(index));
    }

    return categoriesArray;
  }

/**
*
* Watches changes from Handsontable and updates it in the chart.
*
* @param {Number} row row index.
* @param {Number} column column index.
* @param {Number} value column value.
*
*/
  updateChartData(row, column, value) {
    this.chart.series[row].data[column].update(value);
  }
}

export default HighchartsWrapper;
