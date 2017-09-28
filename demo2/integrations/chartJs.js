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
* amCharts data provider needs data array in form:
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

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.label = hotInstance.getSettings().rowHeaders(index);
      obj.backgroundColor = backgroundColors[index];
      obj.data = hotInstance.getDataAtRow(index);

      rowsArray.push(obj); console.log(obj);
    }

    return rowsArray;
  }

  /**
* Helper function.
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
*
*
* @param {}
*
*/
  addNewGame(hotInstance, index) {
    const backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];
    const obj = {};

    obj.label = hotInstance.getSettings().rowHeaders(index);
    obj.backgroundColor = backgroundColors[index];

    obj.data = hotInstance.getDataAtRow(index).map((item) => {
      const o = {};

      o.value = item;

      return o;
    });

    this.chart.data.datasets.push(obj);

    this.chart.update();
  }

  /**
*
*
*
* @param {}
*
*/
  addNewTeam(hotInstance, index) {
    this.chart.data.labels.push(hotInstance.getSettings().colHeaders(index));

    for (let i = 0; i < this.chart.data.datasets.length; i += 1) {
      this.chart.data.datasets[i].data[index] = { value: null };
    }

    this.chart.update();
  }

  /**
*
*
*
* @param {}
*
*/
  removeRow(index, hotInstance) {
    this.chart.data.datasets.splice(index, 1);

    for (let i = 0; i < hotInstance.countRows(); i += 1) {
      this.chart.data.datasets[i].label = hotInstance.getSettings().rowHeaders(i);
    }

    this.chart.update();
  }

  /**
*
*
*
* @param {}
*
*/
  removeColumn(index, hotInstance) {
    this.chart.data.labels.splice(index, 1);

    for (let i = 0; i < hotInstance.countCols(); i += 1) {
      this.chart.data.labels[i] = hotInstance.getSettings().colHeaders(i);

      for (let j = 0; j < hotInstance.countRows(); j += 1) {
        this.chart.data.datasets[j].label = hotInstance.getSettings().rowHeaders(j);
        this.chart.data.datasets[j].data[index] = hotInstance.getDataAtCell(j, i);
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
