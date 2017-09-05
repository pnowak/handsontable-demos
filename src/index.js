import Handsontable from 'handsontable';
import HighChartsWrapper from './charts/highChartsWrapper';
import AmChartsWrapper from './charts/amChartsWrapper';

const buttons = document.getElementById('buttons');

const hot = new Handsontable(document.getElementById('root'), {
  data: [
    [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  ],
  colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rowHeaders: true,
  type: 'numeric',
  allowInvalid: false,
  afterInit: function afterInit() {
    this.charts = [];

    this.charts.push(new HighChartsWrapper('highcharts', this));
    this.charts.push(new AmChartsWrapper('amCharts', this));
  },
});

hot.addHook('beforeChange', function beforeChange(changes) {
  changes.forEach((item) => {
    this.charts.forEach((chart) => {
      const [, column, , currentValue] = item;

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
