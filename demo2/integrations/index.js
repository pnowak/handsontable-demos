import HighchartsWrapper from './highcharts';
import AmChartsWrapper from './amCharts';
import ChartJsWrapper from './chartJs';
import FusionChartsWrapper from './fusionCharts';

const chartWrappers = [];
const selectedClass = 'selected';
const mapChartsToWrapper = new Map();

const clock = {
  totalSeconds: 0,

  start(td, hotInstance, row, column) {
    const parts = td.textContent.split(':');

    this.interval = setInterval(() => {
      this.totalSeconds += 1;

      parts[0] = Math.floor((this.totalSeconds / 3600) % 60);
      parts[1] = Math.floor((this.totalSeconds / 60) % 60);
      parts[2] = parseInt(this.totalSeconds % 60, 10);

      const hour = (parts[0] < 10 ? '0' : '') + parts[0];
      const minute = (parts[1] < 10 ? '0' : '') + parts[1];
      const second = (parts[2] < 10 ? '0' : '') + parts[2];

      hotInstance.setDataAtCell(row, column, `${hour}:${minute}:${second}`);
    }, 1000);
  },

  pause() {
    clearInterval(this.interval);
    delete this.interval;
  },

  reset(hotInstance, row, column) {
    clearInterval(this.interval);
    delete this.interval;

    this.totalSeconds = 0;

    hotInstance.setDataAtCell(row, column, '00:00:00');
  },
};

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

function onAfterSetDataAtCell(changes) {
  changes.forEach((change) => {
    chartWrappers.forEach((chartWrapper) => {
      const [row, column, , currentValue] = change;
      console.log(row, column, currentValue);

      chartWrapper.updateChartData(row, column, currentValue, this);
    });
  });
}

function onAfterRemoveColumn(index) {
  chartWrappers.forEach((chartWrapper) => {
    chartWrapper.removeColumn(index, this);
  });
}

function onAfterRemoveRow(index) {
  chartWrappers.forEach((chartWrapper) => {
    chartWrapper.removeRow(index, this);
  });
}

function startPauseButtonRenderer(instance, td, row, col, prop, value) {
  const escaped = Handsontable.helper.stringify(value);

  td.innerHTML = escaped;

  Handsontable.dom.addClass(td, 'htCenter');

  Handsontable.dom.addEvent(td, 'click', (event) => {
    const target = event.target;

    if (target.nodeName.toLowerCase() === 'button') {
      const buttons = Array.from(document.getElementsByTagName('button'));

      buttons.forEach((button) => {
        if (button === target) {
          const timeCell = instance.getCell(row, col - 1);

          if (target.textContent === 'Start') {
            target.textContent = 'Pause';
            clock.start(timeCell, instance, row, col - 1);
          } else {
            target.textContent = 'Start';
            clock.pause();
          }
        }
      });
    }
  });

  return td;
}

function resetButtonRenderer(instance, td, row, col, prop, value) {
  const escaped = Handsontable.helper.stringify(value);

  td.innerHTML = escaped;

  Handsontable.dom.addClass(td, 'htCenter');

  Handsontable.dom.addEvent(td, 'click', () => {
    clock.reset(instance, row, col - 2);
  });

  return td;
}

Handsontable.renderers.registerRenderer('start/pauseButton', startPauseButtonRenderer);
Handsontable.renderers.registerRenderer('resetButton', resetButtonRenderer);

new Handsontable(document.getElementById('root'), {
  data: [
    ['Task 1', 'Tom', '13/11/2018', '00:00:00', '<button type="button">Start</button>', '<button type="button">Reset</button>'],
    ['Task 2', 'Mark', '14/11/2018', '00:00:00', '<button type="button">Start</button>', '<button type="button">Reset</button>'],
    ['Task 3', 'Kate', '15/11/2018', '00:00:00', '<button type="button">Start</button>', '<button type="button">Reset</button>'],
  ],
  colHeaders: ['Task', 'User', 'Date', 'Time spent', 'Start/Pause', 'Reset'],
  rowHeaders: true,
  columns: [
    { },
    {
      type: 'dropdown',
      source: ['Tom', 'Mark', 'Kate', 'Eddy'],
    },
    {
      type: 'date',
      dateFormat: 'MM/DD/YYYY',
      correctFormat: true,
      allowEmpty: false,
    },
    {
      type: 'time',
      timeFormat: 'HH:mm:ss',
      correctFormat: true,
      readOnly: true,
    },
    {
      renderer: 'start/pauseButton',
      readOnly: true,
    },
    {
      renderer: 'resetButton',
      readOnly: true,
    },
  ],
  contextMenu: ['remove_row', 'remove_col', 'commentsAddEdit'],
  minSpareRows: 1,
  className: 'htCenter',
  width: 650,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  afterSetDataAtCell: onAfterSetDataAtCell,
  afterRemoveCol: onAfterRemoveColumn,
  afterRemoveRow: onAfterRemoveRow,
});
