import Handsontable from 'handsontable';
import HighchartsWrapper from './chartWrappers/highcharts';
import AmChartsWrapper from './chartWrappers/amCharts';
import ChartJsWrapper from './chartWrappers/Chart';

const chartWrappers = [];

const mapChartsToWrapper = {
  HighCharts: HighchartsWrapper,
  amCharts: AmChartsWrapper,
  ChartJs: ChartJsWrapper,
};

const mapChartNameToPackage = {
  HighCharts: 'highcharts',
  amCharts: 'amcharts3',
  ChartJs: 'chart.js',
};

function chartVersionFromPkg(chart, name) {
  // eslint-disable-line global-require
  const pkgName = require(`../node_modules/${chart}/package.json`);
  const version = JSON.stringify(pkgName.version);

  return `${name}: ${version}`;
}

function onAfterInit() {
  const isListItem = document.getElementsByTagName('li');
  const allListItems = Array.from(isListItem);
  const chartVersionDOMElement = document.getElementById('version');

  allListItems.forEach((li) => {
    if (Handsontable.dom.hasClass(li, 'selected')) {
      const chartName = li.children[0].textContent;
      const ActiveChart = mapChartsToWrapper[chartName];
      const chartVersion = mapChartNameToPackage[chartName];

      chartVersionDOMElement.textContent = chartVersionFromPkg(chartVersion, chartName);

      chartWrappers.push(new ActiveChart('chart', this));
    }
  });
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

// eslint-disable-next-line no-new
new Handsontable(document.getElementById('root'), {
  data: [
    [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  ],
  colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rowHeaders: true,
  type: 'numeric',
  width: 650,
  maxRows: 1,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
});

