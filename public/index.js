import Handsontable from 'handsontable';
import HighchartsWrapper from './integrations/highcharts';
import AmChartsWrapper from './integrations/amCharts';
import ChartJsWrapper from './integrations/chartJs';

const chartWrappers = [];

const mapChartsToWrapper = {
  HighCharts: HighchartsWrapper,
  amCharts: AmChartsWrapper,
  'Chart.js': ChartJsWrapper,
};

const mapChartNameToPackage = {
  HighCharts: 'highcharts',
  amCharts: 'amcharts3',
  'Chart.js': 'chart.js',
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

function initJsFiddle() {
  const jsFiddleLink = document.getElementById('jsfiddle');
  const textAreaValue = document.getElementById('codeExample').value;
  const chartDOMElement = document.getElementById('chart');
  const html = `<div id="root">${chartDOMElement.getContext ? '<canvas id="chart">' : '<div id="chart">'}`;
  const css = '</style><link rel="stylesheet" type="text/css" href="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.css"><script src="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.js"></script>';
  const js = textAreaValue;
  const resources = [
    'https://code.highcharts.com/highcharts.js',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.bundle.min.js',
    'https://www.amcharts.com/lib/3/amcharts.js',
    'https://cdn.amcharts.com/lib/3/serial.js',
    'https://cdn.amcharts.com/lib/3/pie.js',
    'https://cdn.amcharts.com/lib/3/themes/light.js',
  ];

  const form = document.createElement('FORM');
  form.action = 'http://jsfiddle.net/api/post/library/pure/';
  form.method = 'POST';
  form.target = '_blank';
  form.innerHTML = `<input type="text" name="title" value="">
    <textarea name="resources">${resources.join(', ').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    <textarea name="html">${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    <textarea name="css">${css.replace(/,/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>;
    <textarea name="js">${js.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>`;

  form.style.visibility = 'hidden';

  document.body.appendChild(form);

  jsFiddleLink.addEventListener('click', (event) => {
    event.preventDefault();
    form.submit();
  }, false);
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

initJsFiddle();
