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
      dataProvider: AmChartsWrapper.zipTeamWithGameData(hotInstance),
      valueAxes: [{
        gridColor: '#FFFFFF',
        gridAlpha: 0.2,
        dashLength: 0,
      }],
      gridAboveGraphs: true,
      startDuration: 1,
      graphs: AmChartsWrapper.updateChartGraphs(hotInstance),
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false,
      },
      categoryField: 'team',
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
*  "name": "Team 1",
*  "game1": 144,
*  "game2": 30,
*  and so on
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static zipTeamWithGameData(hotInstance) {
    const colsArray = [];

    for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
      const obj = {};

      obj.team = hotInstance.getSettings().colHeaders(indexColumn);

      hotInstance.getDataAtCol(indexColumn).map((item, index) => {
        obj[hotInstance.getSettings().rowHeaders(index)] = item;

        return obj;
      });

      colsArray.push(obj);
    }

    return colsArray;
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

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      const objectGraph = {};

      objectGraph.fillAlphas = 0.8;
      objectGraph.lineAlpha = 0.2;
      objectGraph.type = 'column';
      objectGraph.balloonText = `${hotInstance.getSettings().rowHeaders(indexRow)}: [[${hotInstance.getSettings().rowHeaders(indexRow)}]]`;
      objectGraph.valueField = `${hotInstance.getSettings().rowHeaders(indexRow)}`;

      graphs.push(objectGraph);
    }

    return graphs;
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
    const objectGraph = {
      fillAlphas: 0.8,
      lineAlpha: 0.2,
      type: 'column',
      balloonText: `${hotInstance.getSettings().rowHeaders(index)}: [[${hotInstance.getSettings().rowHeaders(index)}]]`,
      valueField: `${hotInstance.getSettings().rowHeaders(index)}`,
    };

    this.chart.graphs.push(objectGraph);

    for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
      this.chart.dataProvider[indexColumn][hotInstance.getSettings().rowHeaders(index)] = 0;
    }

    this.chart.validateNow(true);
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
    const objectTeam = {
      team: `Team ${index + 1}`,
    };

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      objectTeam[hotInstance.getSettings().rowHeaders(indexRow)] = 0;
    }

    this.chart.dataProvider.push(objectTeam);

    this.chart.validateNow(true);
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
    this.chart.graphs.splice(index, 1);

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        this.chart.dataProvider[indexColumn][hotInstance.getSettings().rowHeaders(indexRow)] =
        hotInstance.getDataAtCell(indexRow, indexColumn);
      }

      this.chart.graphs[indexRow].balloonText = `${hotInstance.getSettings().rowHeaders(indexRow)}: [[${hotInstance.getSettings().rowHeaders(indexRow)}]]`;
      this.chart.graphs[indexRow].valueField = `${hotInstance.getSettings().rowHeaders(indexRow)}`;
    }

    this.chart.validateNow(true);
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
    this.chart.dataProvider.splice(index, 1);

    for (let indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
      this.chart.dataProvider[indexColumn].team = hotInstance.getSettings().colHeaders(indexColumn);

      for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        this.chart.graphs[indexRow].balloonText = `${hotInstance.getSettings().rowHeaders(indexRow)}: [[${hotInstance.getSettings().rowHeaders(indexRow)}]]`;
        this.chart.graphs[indexRow].valueField = `${hotInstance.getSettings().rowHeaders(indexRow)}`;
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
  updateChartData(row, column, value, hotInstance) {
    this.chart.dataProvider[column][hotInstance.getSettings().rowHeaders(row)] = value;

    this.chart.validateNow(true);
  }
}

export default AmChartsWrapper;
