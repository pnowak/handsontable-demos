import HotChart from './hotchart';
import HighChart from './charts/highcharts';
import AmChart from './charts/amcharts';

const highChart = new HighChart('highcharts');
const amChart = new AmChart('amcharts');
const hotChart = new HotChart('root', highChart, amChart);

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (e) => {
  if (e.target.nodeName.toLowerCase() === 'button') {
    hotChart.charts.forEach((chart) => {
      const value = e.target.value;
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
}, false);

hotChart.hot.addHook('beforeChange', (changes) => {
  const col = changes[0][1];
  const value = changes[0][3];

  hotChart.charts.forEach((chart) => {
    chart.valueChanged(col, value);
  });
});
