import HighchartsWrapper from './wrappers/highchartsWrapper';
import AmChartsWrapper from './wrappers/amChartsWrapper';
import ChartJsWrapper from './wrappers/chartJsWrapper';

const SELECTED_CLASS = 'selected';

const chartWrappers = [];
const mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', HighchartsWrapper);
mapChartsToWrapper.set('amCharts', AmChartsWrapper);
mapChartsToWrapper.set('Chart.js', ChartJsWrapper);

function onAfterInit() {
  const isListItem = document.getElementsByTagName('li');
  const allListItems = Array.from(isListItem);

  allListItems.forEach((li) => {
    if (Handsontable.dom.hasClass(li, SELECTED_CLASS)) {
      const chartName = li.children[0].textContent;
      const ActiveChartWrapper = mapChartsToWrapper.get(chartName);

      chartWrappers.push(new ActiveChartWrapper('chart', this));
    }
  });
}

function onBeforeChange(changes) {
  changes.forEach((change) => {
    chartWrappers.forEach((chartWrapper) => {
      const [row, column] = change;
      const currentValue = change[3] === '' ? 0 : change[3];

      if (change[3] === '') {
        this.setDataAtCell(row, column, 0, 'onBeforeChange');
      }

      chartWrapper.updateChartData(column, currentValue);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
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
});
