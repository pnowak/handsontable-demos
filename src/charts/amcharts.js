/*eslint no-undef: 1*/

'use strict';

import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/themes/light';
import { hotOptions } from '.././app';

class AmChart {
	constructor(amRoot) {
		this.amcharts = AmCharts.makeChart(amRoot, this.amOptions());
		this.name = 'amcharts';
	}

	valueChanged(col, value) {
		this.amcharts.dataProvider[col].value = value;

		this.amcharts.validateNow(true);
	}

	amOptions() {
		return {
			'type': 'serial',
			'theme': 'light',
			'dataProvider': this.merge(hotOptions().colHeaders, hotOptions().data[0]),
			'valueAxes': [ {
				'gridColor': '#FFFFFF',
				'gridAlpha': 0.2,
				'dashLength': 0
			} ],
			'gridAboveGraphs': true,
			'startDuration': 1,
			'graphs': [ {
				'balloonText': '[[category]]: <b>[[value]]</b>',
				'fillAlphas': 0.8,
				'lineAlpha': 0.2,
				'type': 'column',
				'valueField': 'value'
			} ],
			'chartCursor': {
				'categoryBalloonEnabled': false,
				'cursorAlpha': 0,
				'zoomable': false
			},
			'categoryField': 'key',
			'categoryAxis': {
				'gridPosition': 'start',
				'gridAlpha': 0,
				'tickPosition': 'start',
				'tickLength': 20
			},
			'export': {
				'enabled': true
			}
		}
	}

	merge(key, value) {
		let destination = [];

		for (let i = 0, k = key.length; i < k; i += 1) {
			for (let j = 0, v = value.length; j < v; j += 1) {
				if (i === j) {
					let obj = {};

					obj.key = key[i];
					obj.value = value[j];

					destination.push(obj);
				}
			}
		}

		return destination;
	}
}

export default AmChart;
