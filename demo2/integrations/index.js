import HighchartsWrapper from './highcharts';
import AmChartsWrapper from './amCharts';
import ChartJsWrapper from './chartJs';
import FusionChartsWrapper from './fusionCharts';

const SELECTED_CLASS = 'selected';
const START = 'Start';
const PAUSE = 'Pause';
const RESET = 'Reset';
const STARTTIME = '00:00:00';
const chartWrappers = [];
const mapTimerRow = new Map();
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

function onAfterSetDataAtCell(changes) {
  changes.forEach((change) => {
    chartWrappers.forEach((chartWrapper) => {
      const [row, column, , currentValue] = change;

      chartWrapper.updateCellData(row, column, currentValue, this);
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

        const hours = this.duration.hours();
        const minutes = this.duration.minutes();
        const seconds = this.duration.seconds();

        hotInstance.setDataAtCell(row, column, `${hours}:${minutes}:${seconds}`);
      }, 1000);
    }
  }

  pause() {
    if (this.status === 1) {
      this.status = 0;
      clearInterval(this.interval);
      this.interval = 0;
    }
  }

  reset(hotInstance, row, column) {
    this.status = 0;
    clearInterval(this.interval);
    this.interval = null;

    this.currentTime = STARTTIME;
    this.duration = moment.duration(this.currentTime);

    hotInstance.setDataAtCell(row, column, STARTTIME);
  }
}

function startPauseButtonRenderer(instance, td, row, col, prop, value) {
  let escaped;

  if (mapTimerRow.get(row) === undefined) {
    escaped = Handsontable.helper.stringify('<button type="button">Start</button>');
  } else if ((mapTimerRow.get(row).status === 1) && (mapTimerRow.get(row).interval > 0)) {
    escaped = Handsontable.helper.stringify('<button type="button">Pause</button>');
  } else if ((mapTimerRow.get(row).status === 0) && (mapTimerRow.get(row).interval === 0)) {
    escaped = Handsontable.helper.stringify('<button type="button">Start</button>');
  } else {
    escaped = Handsontable.helper.stringify('<button type="button">Start</button>');
  }

  Handsontable.dom.addClass(td, 'htCenter');

  td.innerHTML = escaped;

  return td;
}

function resetButtonRenderer(instance, td, row, col, prop, value) {
  const escaped = Handsontable.helper.stringify('<button type="button">Reset</button>');

  Handsontable.dom.addClass(td, 'htCenter');

  td.innerHTML = escaped;

  return td;
}

function initButtonsListener(hotInstance) {
  const rootElement = document.getElementById('root');

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
        mapTimerRow.get(rowIndex).start(hotInstance, rowIndex, colIndex);
      } else if (target.textContent === PAUSE) {
        mapTimerRow.get(rowIndex).pause();
      } else if (target.textContent === RESET) {
        mapTimerRow.get(rowIndex).reset(hotInstance, rowIndex, colIndex - 1);
      }
    }
  });
}


Handsontable.renderers.registerRenderer('start/pause', startPauseButtonRenderer);
Handsontable.renderers.registerRenderer('reset', resetButtonRenderer);

const hot = new Handsontable(document.getElementById('root'), {
  data: [
    ['Task 1', 'Tom', '13/11/2018', STARTTIME, null, null],
    ['Task 2', 'Mark', '14/11/2018', STARTTIME, null, null],
    ['Task 3', 'Kate', '15/11/2018', STARTTIME, null, null],
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
      renderer: 'start/pause',
      readOnly: true,
    },
    {
      renderer: 'reset',
      readOnly: true,
    },
  ],
  contextMenu: ['remove_row', 'remove_col', 'commentsAddEdit'],
  className: 'htCenter',
  width: 650,
  colWidth: 110,
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
  afterSetDataAtCell: onAfterSetDataAtCell,
  afterRemoveCol: onAfterRemoveColumn,
  afterRemoveRow: onAfterRemoveRow,
});

initButtonsListener(hot);
