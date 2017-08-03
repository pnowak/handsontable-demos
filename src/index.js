'use strict';

import HotChart from './hotchart';
import HighChart from './charts/highcharts';
import AmChart from './charts/amcharts';
import { get } from './hotchart';

const highChart = new HighChart('highcharts');
const amChart = new AmChart('amcharts');
const hotChart = new HotChart('root', highChart, amChart);

const buttons = get('buttons');

buttons.addEventListener('click', (e) => {
    if (e.target.nodeName.toLowerCase() === "button") {
        hotChart.charts.forEach(function (chart) {
            let value = e.target.value;
            let name = chart.name;

            if (value === name) {
                let container = get(value);
                let desc = container.querySelectorAll('desc')[0].textContent;
                let versionDOMElement = get('version');

                container.classList.remove('disappear');
                versionDOMElement.textContent = desc;
            } else {
                get(name).classList.add('disappear');
            }
        });
    }
}, false);

hotChart.hot.addHook('beforeChange', function(changes) {
    let col = changes[0][1];
    let value = changes[0][3];

    hotChart.charts.forEach(function (chart) {
        chart.valueChanged(col, value);
    });
});
