import HighchartsWrapper from './highcharts';
import AmChartsWrapper from './amCharts';
import ChartJsWrapper from './chartJs';
import FusionChartsWrapper from './fusionCharts';

const SELECTED_CLASS = 'selected';
const START = 'Start';
const PAUSE = 'Pause';
const RESET = 'Reset';
const chartWrappers = [];
const mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', HighchartsWrapper);
mapChartsToWrapper.set('amCharts', AmChartsWrapper);
mapChartsToWrapper.set('Chart.js', ChartJsWrapper);
mapChartsToWrapper.set('FusionCharts', FusionChartsWrapper);

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

function onAfterSetDataAtCell(changes) {
  changes.forEach((change) => {
    chartWrappers.forEach((chartWrapper) => {
      const [row, column, , currentValue] = change;

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

class Timer {
  constructor(row) {
    this.row = row;
    this.interval = null;
    this.currentTime = null;
    this.duration = 0;
    this.timeStamp = new Date();
    this.status = 0;
  }

  start(hotInstance, row, column) {
    this.currentTime = hotInstance.getDataAtCell(row, column);
    this.duration = moment.duration(this.currentTime);

    if (this.status === 0) {
      this.status = 1;
      this.interval = setInterval(() => {
        this.timeStamp = new Date(this.timeStamp.getTime() + 1000);

        this.duration = moment.duration(this.duration.asSeconds() + 1, 'seconds');

        let h = this.duration.hours();
        let m = this.duration.minutes();
        let s = this.duration.seconds();

        h = h.length === 1 ? `${0}h` : h;
        m = m.length === 1 ? `${0}m` : m;
        s = s.length === 1 ? `${0}s` : s;

        hotInstance.setDataAtCell(row, column, `${h}:${m}:${s}`);
      }, 1000);
    }
  }

  pause() {
    if (status === 1) {
      this.status = 0;
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset(hotInstance, row, column) {
    this.status = 0;
    clearInterval(this.interval);
    this.interval = null;

    this.currentTime = '00:00:00';
    this.duration = moment.duration(this.currentTime);

    hotInstance.setDataAtCell(row, column, '00:00:00');
  }
}

function startPauseResetButtonRenderer(instance, td, row, col, prop, value) {
  const escaped = Handsontable.helper.stringify(value);

  Handsontable.dom.addClass(td, 'htCenter');

  td.innerHTML = escaped;

  return td;
}

function initButtonsListener(hotInstance) {
  const rootElement = document.getElementById('root');
  const mapTimerRow = new Map();

  for (let rowIndex = 0; rowIndex < hotInstance.countRows(); rowIndex += 1) {
    mapTimerRow.set(rowIndex, new Timer(rowIndex));
  }

  rootElement.addEventListener('click', (event) => {
    const target = event.target;
    const isButton = target.nodeName.toLowerCase() === 'button';

    if (isButton) {
      const td = target.parentNode;
      const colIndex = td.cellIndex - 2;
      const rowIndex = td.parentNode.rowIndex - 1;

      if (target.textContent === START) {
        target.textContent = PAUSE;
        mapTimerRow.get(rowIndex).start(hotInstance, rowIndex, colIndex);
      }

      if (target.textContent === PAUSE) {
        target.textContent = START;
        mapTimerRow.get(rowIndex).pause();
      }

      if (target.textContent === RESET) {
        mapTimerRow.get(rowIndex).reset(hotInstance, rowIndex, colIndex - 1);
      }
    }
  });
}


Handsontable.renderers.registerRenderer('start/pause/reset', startPauseResetButtonRenderer);

const hot = new Handsontable(document.getElementById('root'), {
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
      renderer: 'start/pause/reset',
      readOnly: true,
    },
    {
      renderer: 'start/pause/reset',
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

initButtonsListener(hot);
