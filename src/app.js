'use strict';

import numbro from 'numbro';
import moment from 'moment';
import pikaday from 'pikaday';
import Zeroclipboard from 'zeroclipboard';
import Handsontable from 'handsontable';

export default class HotChart {
	constructor(hotRoot, ...charts) {
		this.hot = new Handsontable(document.getElementById(hotRoot), hotOptions());
		this.charts = charts;
	}
}

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
