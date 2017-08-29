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
      const value = event.target.value;
      const name = chart.name;

      if (value === name) {
        const container = document.getElementById(value);
        const desc = container.querySelectorAll('desc')[0].textContent;
        const versionDOMElement = document.getElementById('version');

        container.classList.remove('disappear');
        versionDOMElement.textContent = desc;
      } else {
        document.getElementById(name).classList.add('disappear');
      }
    });
  }
});

hotCharts.hot.addHook('beforeChange', (changes) => {
  const [, column, , currentValue] = changes[0];

  hotCharts.charts.forEach((chart) => {
    chart.updateChartData(column, currentValue);
  });
});
