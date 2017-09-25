import HighchartsWrapper from './highcharts';
import AmChartsWrapper from './amCharts';
import ChartJsWrapper from './chartJs';
import FusionChartsWrapper from './fusionCharts';

const chartWrappers = [];
const selectedClass = 'selected';
const controls = document.getElementById('controls');
const mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', HighchartsWrapper);
mapChartsToWrapper.set('amCharts', AmChartsWrapper);
mapChartsToWrapper.set('Chart.js', ChartJsWrapper);
mapChartsToWrapper.set('FusionCharts', FusionChartsWrapper);

function onAfterInit() {
  const isListItem = document.getElementsByTagName('li');
  const allListItems = Array.from(isListItem);

  allListItems.forEach((li) => {
    if (Handsontable.dom.hasClass(li, selectedClass)) {
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

      chartWrapper.updateChartData(row, column, currentValue, this);
    });
  });
}

function onAfterCreateColumn(index) {
  chartWrappers.forEach((chartWrapper) => {
    chartWrapper.addNewTeam(this, index);
  });
}

function onAfterCreateRow(index) {
  chartWrappers.forEach((chartWrapper) => {
    chartWrapper.addNewGame(this, index);
  });
}

function onAfterRemoveColumn(index) {
  chartWrappers.forEach((chartWrapper) => {
    chartWrapper.removeColumn(index);
  });
}

function onAfterRemoveRow(index) {
  chartWrappers.forEach((chartWrapper) => {
    chartWrapper.removeRow(index);
  });
}

const hot = new Handsontable(document.getElementById('root'), {
  data: [
    [120, 160, 80],
    [130, 115, 95],
    [150, 120, 60],
  ],
  colHeaders(index) {
    return `Team ${index + 1}`;
  },
  rowHeaders(index) {
    return `Game ${index + 1}`;
  },
  contextMenu: ['remove_row', 'remove_col'],
  rowHeaderWidth: 100,
  className: 'htCenter',
  type: 'numeric',
  width: 650,
  maxRows: 5,
  maxCols: 5,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
  afterCreateCol: onAfterCreateColumn,
  afterCreateRow: onAfterCreateRow,
  afterRemoveCol: onAfterRemoveColumn,
  afterRemoveRow: onAfterRemoveRow,
});

controls.addEventListener('click', (event) => {
  const isButton = event.target.nodeName.toLowerCase() === 'button';

  if (isButton) {
    const buttonValue = event.target.value;

    if (buttonValue === 'addNewGame') {
      const nextRow = hot.countRows() + 1;

      if (nextRow <= hot.getSettings().maxRows) {
        hot.alter('insert_row', nextRow);
      }
    }

    if (buttonValue === 'addNewTeam') {
      const nextColumn = hot.countCols() + 1;

      if (nextColumn <= hot.getSettings().maxCols) {
        hot.alter('insert_col', nextColumn);
      }
    }
  }
});
