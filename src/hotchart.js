'use strict';

import Handsontable from 'handsontable';

/**
* A Handsontable integrate with different charts.
*
*
* Create Handsontable instance linked with data from different chart/charts.
*
* const highChart = new HighChart('highcharts');
* const amChart = new AmChart('amcharts');
* const hotChart = new HotChart('root', highChart, amChart);
*
* @class HotChart.
*/
export default class HotChart {
	constructor(hotRoot, ...charts) {
		this.hot = new Handsontable(get(hotRoot), hotOptions());
		this.charts = charts;
	}
}

/**
*
* Handsontable options object.
*
* @returns {Object} Handsontable object settings.
*/
export function hotOptions() {
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

/**
* Helper function.
*
* @param {String} id is a string which can be used to uniquely identify the element, found in the HTML id attribute.
* @returns {HTMLElement} a reference to the element by its id or null if an element with the specified ID is not in the document.
*/
export function get(id) {
	return document.getElementById(id);
}
