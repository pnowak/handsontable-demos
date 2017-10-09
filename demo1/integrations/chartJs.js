/**
* A ChartJs data visualisation.
*
* Create ChartJs instance linked with data from Handsontable.
*
* @class ChartJsWrapper.
*/
class ChartJsWrapper {
/**
* Create a ChartJsWrapper.
* @param {string} chartJsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(chartJsRootId, hotInstance) {
    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartJsRootId),
    ChartJsWrapper.getChartOptions(hotInstance));
  }

/**
*
* ChartJs options object.
*
* @returns {Object} ChartJs object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      type: 'bar',
      data: {
        labels: ChartJsWrapper.updateChartColumns(hotInstance),
        datasets: ChartJsWrapper.zipTeamWithRowData(hotInstance),
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 32,
          fontStyle: 'normal',
          text: 'Chart.js & Handsontable',
        },
        tooltips: {
          titleFontSize: 21,
          bodyFontSize: 18,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 23,
            },
          }],
          xAxes: [{
            ticks: {
              fontSize: 23,
            },
          }],
        },
      },
    };
  }

  /**
* Helper function.
*
* Zip column header to the value of the column from Handsontable object settings.
* chart.js data provider needs data array in form:
*
* @example
* {
*  label: "Game 1",
*  backgroundColor: "rgba(255, 99, 132, 0.2)",
*  data: [144, 12, 13]
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static zipTeamWithRowData(hotInstance) {
    const rowsArray = [];
    const backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      const objectTeam = {};

      objectTeam.label = hotInstance.getSettings().rowHeaders(indexRow);
      objectTeam.backgroundColor = backgroundColors[indexRow];
      objectTeam.data = hotInstance.getDataAtRow(indexRow);

      rowsArray.push(objectTeam);
    }

    return rowsArray;
  }

  /**
* Helper function.
*
* @param {Object} Handsontable object.
* @returns {Array} merged key-value pair
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
    const backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];
    const objectTeam = {};

    objectTeam.label = hotInstance.getSettings().rowHeaders(index);
    objectTeam.backgroundColor = backgroundColors[index];

    objectTeam.data = hotInstance.getDataAtRow(index).map((item) => {
      const objectGame = {};

      objectGame.value = item;

      return objectGame;
    });

    this.chart.data.datasets.push(objectTeam);

    this.chart.update();
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
    this.chart.data.labels.push(hotInstance.getSettings().colHeaders(index));

    for (let indexDataset = 0; indexDataset < this.chart.data.datasets.length; indexDataset += 1) {
      this.chart.data.datasets[indexDataset].data[index] = { value: null };
    }

    this.chart.update();
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
    this.chart.data.datasets.splice(index, 1);

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      this.chart.data.datasets[indexRow].label = hotInstance.getSettings().rowHeaders(indexRow);
    }

    this.chart.update();
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
    this.chart.data.labels.splice(index, 1);

    for (let indexcolumn = 0; indexcolumn < hotInstance.countCols(); indexcolumn += 1) {
      this.chart.data.labels[indexcolumn] = hotInstance.getSettings().colHeaders(indexcolumn);

      for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        this.chart.data.datasets[indexRow].label = hotInstance.getSettings().rowHeaders(indexRow);
        this.chart.data.datasets[indexRow].data[index] =
          hotInstance.getDataAtCell(indexRow, indexcolumn);
      }
    }

    this.chart.update();
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
    this.chart.data.datasets[row].data[column] = value;
    this.chart.update();
  }
}

export default ChartJsWrapper;
