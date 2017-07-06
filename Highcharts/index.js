'use strict';

import HotChart from './src/app';

const hotChart = new HotChart('root', 'chartdiv');

hotChart.hot.addHook('beforeChange', function(changes, source) {
    if (source === 'loadData' || source === 'internal' || changes.length > 1) {
    	return;
    }
    
    let col = changes[0][1];
    let value = changes[0][3];

    if (hotChart.chart.series) {
        hotChart.chart.series[0].data[col].update(value);
    } else {
        hotChart.chart.dataProvider[col].value = value;
    }
});