import HighchartsWrapper from './highcharts';
import AmChartsWrapper from './amCharts';
import ChartJsWrapper from './chartJs';
import FusionChartsWrapper from './fusionCharts';

const chartWrappers = [];
const selectedClass = 'selected';
const mapChartsToWrapper = new Map();

const clock = {
  totalSeconds: 0,

  start(td) {
    const parts = td.innerHTML.split(':');

    this.interval = setInterval(() => {
      this.totalSeconds += 1;

      parts[0] = Math.floor(this.totalSeconds / 3600);
      parts[1] = Math.floor((this.totalSeconds / 60) % 60);
      parts[2] = parseInt(this.totalSeconds % 60, 10);

      const hour = (parts[0] < 10) ? `0${parts[0]}` : parts[0];
      const minute = (parts[1] < 10) ? `0${parts[1]}` : parts[1];
      const second = (parts[2] < 10) ? `0${parts[2]}` : parts[2];

      td.textContent = `${hour}:${minute}:${second}`;
    }, 1000);
  },

  pause() {
    clearInterval(this.interval);
    delete this.interval;
  },

  reset(td) {
    clearInterval(this.interval);
    delete this.interval;

    this.totalSeconds = 0;
    td.textContent = '00:00:00';
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

  Handsontable.dom.addEvent(td, 'click', () => {
    const timeCell = instance.getCell(row, col - 1);

    if (td.firstChild.textContent === 'Start') {
      td.firstChild.textContent = 'Pause';
      clock.start(timeCell);
    } else {
      td.firstChild.textContent = 'Start';
      clock.pause();
    }
  });

  return td;
}

function resetButtonRenderer(instance, td, row, col, prop, value) {
  const escaped = Handsontable.helper.stringify(value);

  td.innerHTML = escaped;

  Handsontable.dom.addClass(td, 'htCenter');

  Handsontable.dom.addEvent(td, 'click', () => {
    const timeCell = instance.getCell(row, col - 2);
    clock.reset(timeCell);
  });

  return td;
}

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
      defaultDate: '01/01/1900',
      allowEmpty: false,
    },
    {
      type: 'time',
      timeFormat: 'hh:mm:ss',
      correctFormat: true,
      readOnly: true,
    },
    {
      renderer: startPauseButtonRenderer,
      readOnly: true,
    },
    {
      renderer: resetButtonRenderer,
      readOnly: true,
    },
  ],
  contextMenu: ['remove_row', 'remove_col'],
  className: 'htCenter',
  width: 650,
  maxRows: 5,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
  afterCreateCol: onAfterCreateColumn,
  afterCreateRow: onAfterCreateRow,
  afterRemoveCol: onAfterRemoveColumn,
  afterRemoveRow: onAfterRemoveRow,
});
