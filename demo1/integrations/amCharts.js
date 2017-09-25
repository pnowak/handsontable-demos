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

    for (let i = 0; i < hotInstance.countCols(); i += 1) {
      const obj = {};

      obj.team = hotInstance.getSettings().colHeaders(i);

      hotInstance.getDataAtCol(i).map((item, index) => {
        obj[hotInstance.getSettings().rowHeaders(index)] = item;

        return obj;
      });

      colsArray.push(obj); console.log(obj);
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

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.fillAlphas = 0.8;
      obj.lineAlpha = 0.2;
      obj.type = 'column';
      obj.balloonText = `${hotInstance.getSettings().rowHeaders(index)}: [[${hotInstance.getSettings().rowHeaders(index)}]]`;
      obj.valueField = `${hotInstance.getSettings().rowHeaders(index)}`;

      graphs.push(obj);
    }
    console.log(graphs);
    return graphs;
  }

  /**
*
*
*
* @param {}
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

    this.chart.validateNow(true);
  }

  /**
*
*
*
* @param {}
*
*/
  addNewTeam(hotInstance, index) {
    const objectTeam = {
      team: `Team ${index + 1}`,
    };

    for (let i = 0; i < hotInstance.countRows(); i += 1) {
      objectTeam[hotInstance.getSettings().rowHeaders(i)] = 0;
    }

    this.chart.dataProvider.push(objectTeam);

    this.chart.validateNow(true);
  }

  /**
*
*
*
* @param {}
*
*/
  removeRow(index) {
    this.chart.graphs.splice(index, 1);

    this.chart.validateNow(true);
  }

  /**
*
*
*
* @param {}
*
*/
  removeColumn(index) {
    this.chart.dataProvider.splice(index, 1);

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
