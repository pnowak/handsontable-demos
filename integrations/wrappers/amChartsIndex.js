import Handsontable from 'handsontable';
import AmChartsWrapper from './amChartsWrapper';

const chartWrappers = [];

/**
*
* Initializes the AmChartsWrapper.
*
*/
function onAfterInit() {
  chartWrappers.push(new AmChartsWrapper('chart', this));
}

/**
*
* Watches changes from Handsontable and updates it in the AmChartsWrapper.
*
* @param {Array} changes array of changes from Handsontable.
*
*/
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

/**
*
* Initializes Handsontable instances.
*
*/
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
