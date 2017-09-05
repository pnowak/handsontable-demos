# Handsontable for Charts

[Handsontable](https://github.com/handsontable/handsontable) integration with different data charts.

## Table of contents
1. [Installation](#installation)
2. [Building](#building)
3. [Basic usage](#basic-usage)
4. [Examples](#examples)
5. [License](#license)
6. [Contact](#contact)

## Installation

```
git clone https://github.com/pnowak/handsontable-demos
cd handsontable-demos
npm install
```

### Building

If you used npm to download the library, you should be good to go, but if you want to make a build yourself, go to the directory where `handsontable-demos` source is located and run:

```
npm run build
```

This will create a /dist/bundle.js for you to use.

## Basic usage

```js
// import HighChartsWrapper...
import HighChartsWrapper from './charts/highChartsWrapper';

// ... and Handsontable
import Handsontable from 'handsontable';

const chartsWrapper = [];

const hot = new Handsontable(document.getElementById('root'), {
  data: [
    [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  ],
  colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rowHeaders: true,
  type: 'numeric',
  allowInvalid: false,
  afterInit: function afterInit() {
    chartsWrapper.push(new HighChartsWrapper('highcharts', this));
  },
});

hot.addHook('beforeChange', (changes) => {
  changes.forEach((change) => {
    chartsWrapper.forEach((chart) => {
      const [, column, , currentValue] = change;

      chart.updateChartData(column, currentValue);
    });
  });
});

```

## Examples
- [Simple handsontable-demos implementation with Highcharts](https://codepen.io/handsoncode/pen/prBejL?editors=1010)
- [Simple handsontable-demos implementation with AmCharts](https://codepen.io/handsoncode/pen/yorXbb?editors=1010)
- [handsontable-demos implementation](https://codepen.io/handsoncode/pen/PKgpaJ?editors=1010)



## License
`handsontable-demos` is released under the [MIT license](https://github.com/handsontable/andsontable-demos/blob/master/LICENSE).
All trademarks and copyrights belong to their respective owners.

## Contact
Feel free to give us feedback on this wrapper using this [contact form](https://handsontable.com/contact.html) or write directly at hello@handsontable.com.