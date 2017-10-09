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

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      const objectGame = {};

      objectGame.name = hotInstance.getSettings().rowHeaders(indexRow);
      objectGame.data = hotInstance.getDataAtRow(indexRow);

      rowsArray.push(objectGame);
    }

    return rowsArray;
  }

  /**
* Helper function.
*
*
*
* @param {Object} Handsontable object.
* @returns {Array} a column headers in array.
*/
  static updateChartColumns(hotInstance) {
    const categoriesArray = [];

    for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
      categoriesArray.push(hotInstance.getSettings().colHeaders(indexColumn));
    }

    return categoriesArray;
  }

  /**
*
* Create new row
*
* @param {Object} Handsontable object.
* @param {Number} index index next row.
*
*/
  addNewGame(hotInstance, index) {
    const objectGame = {};

    objectGame.name = hotInstance.getSettings().rowHeaders(index);
    objectGame.data = hotInstance.getDataAtRow(index);

    this.chart.addSeries(objectGame);

    this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
*
* Create new column
*
* @param {Object} Handsontable object.
* @param {Number} index index next column.
*
*/
  addNewTeam(hotInstance, index) {
    this.chart.xAxis[0].categories.push(hotInstance.getSettings().colHeaders(index));

    for (let indexSeries = 0; indexSeries < this.chart.series.length; indexSeries += 1) {
      this.chart.series[indexSeries].data[index] = hotInstance.getDataAtRow(index);
    }

    this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
*
* Remove row
*
* @param {Number} index index remove row.
* @param {Object} Handsontable object.
*
*/
  removeRow(index, hotInstance) {
    this.chart.series[index].remove();

    this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
*
* Remove column
*
* @param {Number} index index remove column.
* @param {Object} Handsontable object.
*
*/
  removeColumn(index, hotInstance) {
    this.chart.xAxis[0].categories.splice(index, 1);

    this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
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
