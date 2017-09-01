import Handsontable from 'handsontable';
import HotCharts from './hotCharts';
import HighChartsWrapper from './charts/highChartsWrapper';
import AmChartsWrapper from './charts/amChartsWrapper';

const highChartsWrapper = new HighChartsWrapper('highCharts');
const amChartsWrapper = new AmChartsWrapper('amCharts');
const hotCharts = new HotCharts('root', highChartsWrapper, amChartsWrapper);

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (event) => {
  if (event.target.nodeName.toLowerCase() === 'button') {
    hotCharts.charts.forEach((chart) => {
      if (event.target.value === chart.name) {
        const container = document.getElementById(chart.name);
        const desc = container.querySelectorAll('desc')[0].textContent;
        const versionDOMElement = document.getElementById('version');

        Handsontable.dom.removeClass(container, 'disappear');
        versionDOMElement.textContent = desc;
      } else {
        Handsontable.dom.addClass(document.getElementById(chart.name), 'disappear');
      }
    });
  }
});

hotCharts.hot.addHook('beforeChange', (changes) => {
  changes.forEach((item) => {
    hotCharts.charts.forEach((chart) => {
      const [, column, , currentValue] = item;

      chart.updateChartData(column, currentValue);
    });
  });
});
