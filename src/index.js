/* eslint-disable no-new */
import Handsontable from 'handsontable';
import HighchartsWrapper from './chartWrappers/highcharts';
import AmChartsWrapper from './chartWrappers/amCharts';

function clickButtonsInit() {
  const buttons = document.getElementById('buttons');

  buttons.addEventListener('click', (event) => {
    if (event.target.nodeName.toLowerCase() === 'button') {
      const charts = Array.from(buttons.getElementsByTagName('button'));

      charts.forEach((chart) => {
        const isTarget = event.target.value === chart.value;

        if (isTarget) {
          const chartContainer = document.getElementById(chart.value);
          const chartVersionDesc = chartContainer.querySelectorAll('desc')[0].textContent;
          const chartVersionDOMElement = document.getElementById('version');

          Handsontable.dom.removeClass(chartContainer, 'disappear');
          chartVersionDOMElement.textContent = chartVersionDesc;
        } else {
          Handsontable.dom.addClass(document.getElementById(chart.value), 'disappear');
        }
      });
    }
  });
}

const chartsWrapper = [];

function onAfterInit() {
  chartsWrapper.push(new HighchartsWrapper('highcharts', this));
  chartsWrapper.push(new AmChartsWrapper('amCharts', this));
}

function onBeforeChange(changes) {
  changes.forEach((change) => {
    chartsWrapper.forEach((chart) => {
      const column = change[1];
      const currentValue = change[3] === '' ? 0 : change[3];

      chart.updateChartData(column, currentValue);
    });
  });
}

new Handsontable(document.getElementById('root'), {
  data: [
    [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  ],
  colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rowHeaders: true,
  type: 'numeric',
  maxRows: 1,
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
});

clickButtonsInit();
