/**
* A FusionCharts data visualisation.
*
* Create FusionCharts instance linked with data from Handsontable.
*
* @class FusionChartsWrapper.
*/
class FusionChartsWrapper {
/**
* Create a FusionChartsWrapper.
* @param {string} fusionChartsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(fusionChartsRootId, hotInstance) {
    this.name = 'fusioncharts';
    this.chart = new FusionCharts(FusionChartsWrapper
      .getChartOptions(fusionChartsRootId, hotInstance))
    .render();
  }

/**
*
* FusionCharts options object.
*
* @returns {Object} FusionCharts object configs.
*/
  static getChartOptions(fusionChartsRootId, hotInstance) {
    return {
      id: 'fusionChart',
      type: 'msline',
      renderAt: fusionChartsRootId,
      width: 650,
      height: 420,
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'FusionCharts & Handsontable',
          xAxisName: 'Date',
          yAxisName: 'Values',
        },
        categories: [{ category: FusionChartsWrapper.updateChartColumns(hotInstance) }],
        dataset: FusionChartsWrapper.zipTeamWithRowData(hotInstance),
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
*  "seriesname": "1",
*  "data": [0, 1, 2, 3]
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static zipTeamWithRowData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.seriesname = hotInstance.getRowHeader(index);
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
  static updateChartColumns(hotInstance) {
    const category = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const o = {};

      o.label = hotInstance.getDataAtCell(index, 2);

      category.push(o);
    }

    return category;
  }

  /**
*
*
*
* @param {}
*
*/
  removeRow(index, hotInstance) {
    this.chart.args.dataSource.dataset.splice(index, 1);

    for (let i = 0; i < hotInstance.countRows(); i += 1) {
      this.chart.args.dataSource.dataset[i].seriesname = hotInstance.getSettings().rowHeaders(i);
    }

    this.chart.setJSONData(this.chart.args.dataSource);
  }

  /**
*
*
*
* @param {}
*
*/
  removeColumn(index, hotInstance) {
    this.chart.args.dataSource.categories[0].category.splice(index, 1);

    for (let i = 0; i < hotInstance.countCols(); i += 1) {
      this.chart.args.dataSource.categories[0].category[i].label =
      hotInstance.getSettings().colHeaders(i);

      for (let j = 0; j < hotInstance.countRows(); j += 1) {
        this.chart.args.dataSource.dataset[j].seriesname = hotInstance.getSettings().rowHeaders(j);
        this.chart.args.dataSource.dataset[j].data[i].value = hotInstance.getDataAtCell(j, i);
      }
    }

    this.chart.setJSONData(this.chart.args.dataSource);
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

    this.chart.args.dataSource.dataset[row].data[column].value = value;

    this.chart.setJSONData(this.chart.args.dataSource);
  }

  updateCellData(row, column, value) {
    if (column === 3) {
      const valueSplit = value.split(':');
      const seconds = ((+valueSplit[0]) * (60 * 60)) + ((+valueSplit[1]) * 60) + (+valueSplit[2]);

      this.chart.args.dataSource.dataset[row].data.push(seconds);
    }

    this.chart.setJSONData(this.chart.args.dataSource);
  }
}

export default FusionChartsWrapper;
