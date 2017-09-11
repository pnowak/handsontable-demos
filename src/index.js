/* eslint-disable no-new */
/* eslint-disable padded-blocks */
import Handsontable from 'handsontable';
import HighchartsWrapper from './chartWrappers/highcharts';
import AmChartsWrapper from './chartWrappers/amCharts';
import ChartJsWrapper from './chartWrappers/Chart';

const chartWrappers = [];

function initButtonsListener() {
  const buttonsWrapper = document.getElementById('buttons');

  buttonsWrapper.addEventListener('click', (event) => {
    const isButton = event.target.nodeName.toLowerCase() === 'button';
    const buttonsArray = Array.from(buttonsWrapper.getElementsByTagName('button'));

    if (isButton) {
      buttonsArray.forEach((chartWrapper) => {
        const chartWrapperIsTarget = event.target.value === chartWrapper.value;

        if (chartWrapperIsTarget) {
          const chartContainer = document.getElementById(chartWrapper.value);
          const chartVersionDOMElement = document.getElementById('version');
          const chartVersionDesc = chartContainer.querySelectorAll('desc')[0] ?
          chartContainer.querySelectorAll('desc')[0].textContent : '';

          chartVersionDOMElement.textContent = chartVersionDesc;

          Handsontable.dom.removeClass(chartContainer, 'disappear');

        } else {
          Handsontable.dom.addClass(document.getElementById(chartWrapper.value), 'disappear');
        }
      });
    }
  });
}

function onAfterInit() {
  chartWrappers.push(new HighchartsWrapper('highcharts', this));
  chartWrappers.push(new AmChartsWrapper('amCharts', this));
  chartWrappers.push(new ChartJsWrapper('Chart', this));
}

function onBeforeChange(changes) {
  changes.forEach((change) => {
    chartWrappers.forEach((chartWrapper) => {
      const column = change[1];
      const currentValue = change[3] === '' ? 0 : change[3];

      chartWrapper.updateChartData(column, currentValue);
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

initButtonsListener();
