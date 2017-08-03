'use strict';

import Highcharts from 'highcharts';
import { hotOptions, get } from '../app';

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighCharts.
*/
class HighCharts {
	constructor(highRoot) {
		this.highcharts = new Highcharts.Chart(get(highRoot), this.highOptions());
		this.name = 'highcharts';
	}

	/**
	*
	* Listener for changes from Handsontable and updates it in the chart.
	*
	* @param {Number} col column index.
	* @param {Number} value column value.
	*
	*/
	valueChanged(col, value) {
		this.highcharts.series[0].data[col].update(value);
	}

	/**
	*
	* HighCharts options object.
	*
	* @returns {Object} HighCharts object configs.
	*/
	highOptions() {
		return {
			title: {
				text: 'HighChart & Handsontable'
			},

			xAxis: {
				categories: hotOptions().colHeaders //colHeaders from Hot
			},

			series: [{
				type: 'column',
				colorByPoint: true,
				data: hotOptions().data[0] //data from Hot
			}]
		}
	}
}

export default HighCharts;
