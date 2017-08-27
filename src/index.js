import HotChart from './hotchart';
import HighChart from './charts/highcharts';
import AmChart from './charts/amcharts';

const highChart = new HighChart('highcharts');
const amChart = new AmChart('amcharts');
const hotChart = new HotChart('root', highChart, amChart);

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (event) => {
  if (event.target.nodeName.toLowerCase() === 'button') {
    hotChart.charts.forEach((chart) => {
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

hotChart.hot.addHook('beforeChange', (changes) => {
  const [row, column, previousValue, currentValue] = changes[0];

  hotChart.charts.forEach((chart) => {
    chart.observeChange(column, currentValue);
  });
});
