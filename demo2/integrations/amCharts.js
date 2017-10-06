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
      dataProvider: AmChartsWrapper.zipTeamWithRowData(hotInstance),
      gridAboveGraphs: true,
      startDuration: 0,
      graphs: AmChartsWrapper.updateChartGraphs(hotInstance),
      dataDateFormat: 'DD',
      categoryField: 'day',
      categoryAxis: {
        minPeriod: 'mm',
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
*  "name": "Team 1",
*  "game1": 144,
*  "game2": 30,
*  and so on
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static zipTeamWithRowData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.day = hotInstance.getDataAtCell(index, 2);
      obj.data = [0];

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
  static updateChartGraphs(hotInstance) {
    const graphs = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.fillAlphas = 0.8;
      obj.lineAlpha = 0.2;
      obj.type = 'smoothedLine';
      obj.valueField = 'data';

      graphs.push(obj); console.log(obj);
    }

    return graphs;
  }

  /**
*
*
*
* @param {}
*
*/
  removeRow(index, hotInstance) {
    this.chart.graphs.splice(index, 1);

    for (let j = 0; j < hotInstance.countRows(); j += 1) {
      for (let i = 0; i < hotInstance.countCols(); i += 1) {
        this.chart.dataProvider[i][hotInstance.getSettings().rowHeaders(j)] =
        hotInstance.getDataAtCell(j, i);
      }

      this.chart.graphs[j].balloonText = `${hotInstance.getSettings().rowHeaders(j)}: [[${hotInstance.getSettings().rowHeaders(j)}]]`;
      this.chart.graphs[j].valueField = `${hotInstance.getSettings().rowHeaders(j)}`;
    }

    this.chart.validateNow(true);
  }

  /**
*
*
*
* @param {}
*
*/
  removeColumn(index, hotInstance) {
    this.chart.dataProvider.splice(index, 1);

    for (let i = 0; i < hotInstance.countCols(); i += 1) {
      this.chart.dataProvider[i].team = hotInstance.getSettings().colHeaders(i);

      for (let j = 0; j < hotInstance.countRows(); j += 1) {
        this.chart.graphs[j].balloonText = `${hotInstance.getSettings().rowHeaders(j)}: [[${hotInstance.getSettings().rowHeaders(j)}]]`;
        this.chart.graphs[j].valueField = `${hotInstance.getSettings().rowHeaders(j)}`;
      }
    }

    this.chart.validateNow(true);
  }

/**
*
* Watches changes from Handsontable and updates it in the chart.
*
* @param {Number} column column index.
* @param {Number} value column value.
*
*/
  updateChartData(row, column, value) {
    if (column === 3) {
      return;
    }

    this.chart.dataProvider[row].data[column] = value;

    this.chart.validateNow(true);
  }

  /**
*
* Watches changes from Handsontable and updates it in the chart.
*
* @param {Number} column column index.
* @param {Number} value column value.
*
*/

  updateCellData(row, column, value) {
    if (column === 3) {
      const valueSplit = value.split(':');
      const seconds = ((+valueSplit[0]) * (60 * 60)) + ((+valueSplit[1]) * 60) + (+valueSplit[2]);

      this.chart.dataProvider[row].data.push(seconds);
    }

    this.chart.validateData();
  }
}

export default AmChartsWrapper;
