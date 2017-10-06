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
        type: 'spline',
        width: 650,
        animation: Highcharts.svg,
      },
      title: {
        text: 'Highcharts & Handsontable',
      },
      plotOptions: {
        spline: {
          dataLabels: {
            enabled: true,
          },
          marker: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      xAxis: {
        categories: HighchartsWrapper.updateTimeDate(hotInstance),
      },
      yAxis: {
        title: {
          text: 'Value',
        },
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

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.name = hotInstance.getDataAtCell(index, 0);
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
  static updateTimeDate(hotInstance) {
    const categoriesArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      categoriesArray.push(hotInstance.getDataAtCell(index, 2));
    }
    console.log(categoriesArray);
    return categoriesArray;
  }

  /**
*
*
*
* @param {index}
*
*/
  removeRow(index, hotInstance) {
    this.chart.series[index].remove();

    this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
*
*
*
* @param {}
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
    if (column === 3) {
      return;
    }

    this.chart.series[row].data[column].update(value);
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

      this.chart.series[row].data.push(seconds);

      this.chart.update(this.chart.series[row].data);
    }
  }
}

export default HighchartsWrapper;
