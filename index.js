'use strict';

import HotChart from './src/app';
import HighChart from './Highcharts/app';
import AmChart from './amCharts/app';

const highChart = new HighChart('highcharts');
const amChart = new AmChart('amcharts');
const hotChart = new HotChart('root', highChart, amChart);

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (e) => {
    if (e.target.nodeName.toLowerCase() === "button") {
        hotChart.charts.forEach(function (chart, index) {
            let value = e.target.value;
            let name = chart.name;

            if (value === name) {
                document.getElementById(value).classList.remove('disappear');
            } else {
                document.getElementById(name).classList.add('disappear');
            }
        });
    }
}, false);

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
