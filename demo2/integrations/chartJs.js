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
      type: 'line',
      data: {
        labels: ChartJsWrapper.updateTimeDate(hotInstance),
        datasets: [{ data: ChartJsWrapper.zipTeamWithRowData(hotInstance) }],
      },
      options: {
        animation: {
          duration: 1000,
          easing: 'linear',
        },
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
            scaleLabel: {
              display: true,
              labelString: 'Time spent',
            },
          }],
          xAxes: [{
            ticks: {
              fontSize: 23,
            },
            scaleLabel: {
              display: true,
              labelString: 'Date',
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

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      if (hotInstance.getDataAtCell(index, 3) != null) {
        rowsArray.push([hotInstance.getDataAtCell(index, 3)]);
      }
    }

    return rowsArray;
  }

  /**
* Helper function.
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static updateTimeDate(hotInstance) {
    const categoriesArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      if (hotInstance.getDataAtCell(index, 3) != null) {
        categoriesArray.push(hotInstance.getSettings().data[index][2]);
      }
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
    this.chart.config.data.datasets[0].data[row].push(value);
    this.chart.update();
  }
}

export default ChartJsWrapper;
