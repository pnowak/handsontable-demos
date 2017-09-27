import zipHeadersWithValues from './helper/zip';

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
      type: 'column2d',
      renderAt: fusionChartsRootId,
      width: 650,
      height: 420,
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'FusionCharts & Handsontable',
          xAxisName: 'Month',
          yAxisName: 'Values',
        },
        data: zipHeadersWithValues(
          hotInstance.getSettings().colHeaders, hotInstance.getDataAtRow(0), 'label'),
      },
    };
  }

/**
*
* Watches changes from Handsontable and updates it in the chart.
*
* @param {Number} column column index.
* @param {Number} value column value.
*
*/
  updateChartData(column, value) {
    this.chart.args.dataSource.data[column].value = value;

    this.chart.setJSONData(this.chart.args.dataSource);
  }
}

export default FusionChartsWrapper;
