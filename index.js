'use strict';

import HotChart from './src/app';
import HighChart from './Highcharts/app';
import AmChart from './amCharts/app';

const highChart = new HighChart('container');
const amChart = new AmChart('chartdiv');
const hotChart = new HotChart('root', highChart, amChart);

hotChart.hot.addHook('beforeChange', function(changes, source) {
    if (source === 'loadData' || source === 'internal' || changes.length > 1) {
    	return;
    }

    let col = changes[0][1];
    let value = changes[0][3];

    hotChart.charts.forEach(function (chart, index) {
        chart.valueChanged(col, value);
    });
});
