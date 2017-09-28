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
      type: 'mscolumn2d',
      renderAt: fusionChartsRootId,
      width: 650,
      height: 420,
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'FusionCharts & Handsontable',
          xAxisName: 'Teams',
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
*  "seriesname": "Game 1",
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

      obj.seriesname = hotInstance.getSettings().rowHeaders(index);
      obj.data = hotInstance.getDataAtRow(index).map((item) => {
        const o = {};

        o.value = item;

        return o;
      });

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

    for (let index = 0; index < hotInstance.countCols(); index += 1) {
      const o = {};

      o.label = hotInstance.getSettings().colHeaders(index);

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
  addNewGame(hotInstance, index) {
    const obj = {};

    obj.seriesname = hotInstance.getSettings().rowHeaders(index);
    obj.data = hotInstance.getDataAtRow(index).map((item) => {
      const o = {};

      o.value = item;

      return o;
    });

    this.chart.args.dataSource.dataset.push(obj);

    this.chart.setJSONData(this.chart.args.dataSource);
  }

  /**
*
*
*
* @param {}
*
*/
  addNewTeam(hotInstance, index) {
    const o = {};
    o.label = hotInstance.getSettings().colHeaders(index);

    this.chart.args.dataSource.categories[0].category.push(o);

    for (let i = 0; i < this.chart.args.dataSource.dataset.length; i += 1) {
      this.chart.args.dataSource.dataset[i].data[index] = { value: null };
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
    this.chart.args.dataSource.dataset[row].data[column].value = value;

    this.chart.setJSONData(this.chart.args.dataSource);
  }
}

export default FusionChartsWrapper;
