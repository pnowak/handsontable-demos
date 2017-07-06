'use strict';

import numbro from 'numbro';
import moment from 'moment';
import pikaday from 'pikaday';
import Zeroclipboard from 'zeroclipboard';
import Handsontable from 'handsontable';
import Highcharts from 'highcharts';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/themes/light';

class HotChart {
	constructor(hotRoot, charRoot) {
		this.hot = new Handsontable(document.getElementById(hotRoot), this.hotOptions());
		this.chart = (charRoot === 'container') ? new Highcharts.Chart(document.getElementById(charRoot), this.charOptions()) : AmCharts.makeChart(charRoot, this.amOptions());
	}

	hotOptions() {
		return {
			data: [
					[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
			],
			colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			rowHeaders: true,
			columns: [
			    {type: 'numeric'},
			    {type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'},
				{type: 'numeric'}
			]
		}
	}

	charOptions() {
		return {
			title: {
		        text: 'HighChart & Handsontable'
		    },

		    xAxis: {
		        categories: this.hotOptions().colHeaders //colHeaders from Hot
		    },

		    series: [{
		        type: 'column',
		        colorByPoint: true,
		        data: this.hotOptions().data[0] //data from Hot
		    }]
	    }
	}

	amOptions() {
		return {
			'type': 'serial',
			'theme': 'light',
			'dataProvider': this.merge(this.hotOptions().colHeaders, this.hotOptions().data[0]),
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

export default HotChart;
