import Handsontable from 'handsontable';
import HighchartsWrapper from './chartWrappers/highcharts';
import AmChartsWrapper from './chartWrappers/amCharts';

const buttons = document.getElementById('buttons');
const chartsWrapper = [];

const hot = new Handsontable(document.getElementById('root'), {
  data: [
    [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  ],
  colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rowHeaders: true,
  type: 'numeric',
  maxRows: 1,
  allowInvalid: false,
  afterInit: function afterInit() {
    chartsWrapper.push(new HighchartsWrapper('highcharts', this));
    chartsWrapper.push(new AmChartsWrapper('amCharts', this));
  },
});

hot.addHook('beforeChange', (changes) => {
  changes.forEach((change) => {
    chartsWrapper.forEach((chart) => {
      const column = change[1];
      const currentValue = change[3] === '' ? 0 : change[3];

      chart.updateChartData(column, currentValue);
    });
  });
});

buttons.addEventListener('click', (event) => {
  if (event.target.nodeName.toLowerCase() === 'button') {
    const charts = Array.from(buttons.getElementsByTagName('button'));

    charts.forEach((chart) => {
      if (event.target.value === chart.value) {
        const container = document.getElementById(chart.value);
        const desc = container.querySelectorAll('desc')[0].textContent;
        const versionDOMElement = document.getElementById('version');

        Handsontable.dom.removeClass(container, 'disappear');
        versionDOMElement.textContent = desc;
      } else {
        Handsontable.dom.addClass(document.getElementById(chart.value), 'disappear');
      }
    });
  }
});
