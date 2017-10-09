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

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      const objectGame = {};

      objectGame.seriesname = hotInstance.getSettings().rowHeaders(indexRow);
      objectGame.data = hotInstance.getDataAtRow(indexRow).map((item) => {
        const objectResult = {};

        objectResult.value = item;

        return objectResult;
      });

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
* @returns {Array} a merged key-value pair in array.
*/
  static updateChartColumns(hotInstance) {
    const category = [];

    for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
      const objectTeam = {};

      objectTeam.label = hotInstance.getSettings().colHeaders(indexColumn);

      category.push(objectTeam);
    }

    return category;
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
    const objectTeam = {};

    objectTeam.seriesname = hotInstance.getSettings().rowHeaders(index);
    objectTeam.data = hotInstance.getDataAtRow(index).map((item) => {
      const objectGame = {};

      objectGame.value = item;

      return objectGame;
    });

    this.chart.args.dataSource.dataset.push(objectTeam);

    this.chart.setJSONData(this.chart.args.dataSource);
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
    const objectTeam = {};
    objectTeam.label = hotInstance.getSettings().colHeaders(index);

    this.chart.args.dataSource.categories[0].category.push(objectTeam);

    for (let indexDataset = 0; indexDataset < this.chart.args.dataSource.dataset.length;
      indexDataset += 1) {
      this.chart.args.dataSource.dataset[indexDataset].data[index] = { value: null };
    }

    this.chart.setJSONData(this.chart.args.dataSource);
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
    this.chart.args.dataSource.dataset.splice(index, 1);

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      this.chart.args.dataSource.dataset[indexRow].seriesname =
        hotInstance.getSettings().rowHeaders(indexRow);
    }

    this.chart.setJSONData(this.chart.args.dataSource);
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
    this.chart.args.dataSource.categories[0].category.splice(index, 1);

    for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
      this.chart.args.dataSource.categories[0].category[indexColumn].label =
      hotInstance.getSettings().colHeaders(indexColumn);

      for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        this.chart.args.dataSource.dataset[indexRow].seriesname =
          hotInstance.getSettings().rowHeaders(indexRow);
        this.chart.args.dataSource.dataset[indexRow].data[indexColumn].value =
          hotInstance.getDataAtCell(indexRow, indexColumn);
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
