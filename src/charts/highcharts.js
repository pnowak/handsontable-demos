'use strict';

import Highcharts from 'highcharts';
import { hotOptions, get } from '../app';

class HighCharts {
	constructor(highRoot) {
		this.highcharts = new Highcharts.Chart(get(highRoot), this.highOptions());
		this.name = 'highcharts';
	}

	valueChanged(col, value) {
		this.highcharts.series[0].data[col].update(value);
	}

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
