import HotCharts from './hotCharts';
import HighChartExtends from './charts/highChart';
import AmChartExtends from './charts/amChart';

const highChart = new HighChartExtends('highcharts');
const amChart = new AmChartExtends('amcharts');
const hotCharts = new HotCharts('root', highChart, amChart);

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
  const [row, column, previousValue, currentValue] = changes[0];

  hotCharts.charts.forEach((chart) => {
    chart.observeChange(column, currentValue);
  });
});
