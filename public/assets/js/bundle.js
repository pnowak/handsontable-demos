/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _highcharts = __webpack_require__(4);

var _highcharts2 = _interopRequireDefault(_highcharts);

var _amCharts = __webpack_require__(1);

var _amCharts2 = _interopRequireDefault(_amCharts);

var _chartJs = __webpack_require__(2);

var _chartJs2 = _interopRequireDefault(_chartJs);

var _fusionCharts = __webpack_require__(3);

var _fusionCharts2 = _interopRequireDefault(_fusionCharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chartWrappers = [];
var selectedClass = 'selected';
var mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', _highcharts2.default);
mapChartsToWrapper.set('amCharts', _amCharts2.default);
mapChartsToWrapper.set('Chart.js', _chartJs2.default);
mapChartsToWrapper.set('FusionCharts', _fusionCharts2.default);

function onAfterInit() {
  var _this = this;

  var isListItem = document.getElementsByTagName('li');
  var allListItems = Array.from(isListItem);

  allListItems.forEach(function (li) {
    if (Handsontable.dom.hasClass(li, selectedClass)) {
      var chartName = li.children[0].textContent;
      var ActiveChartWrapper = mapChartsToWrapper.get(chartName);

      chartWrappers.push(new ActiveChartWrapper('chart', _this));
    }
  });
}

function onBeforeChange(changes) {
  var _this2 = this;

  changes.forEach(function (change) {
    chartWrappers.forEach(function (chartWrapper) {
      var _change = _slicedToArray(change, 2),
          row = _change[0],
          column = _change[1];

      var currentValue = change[3] === '' ? 0 : change[3];

      if (change[3] === '') {
        _this2.setDataAtCell(row, column, 0, 'onBeforeChange');
      }

      chartWrapper.updateChartData(column, currentValue);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line no-new
  new Handsontable(document.getElementById('root'), {
    data: [[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]],
    colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    rowHeaders: true,
    type: 'numeric',
    width: 650,
    maxRows: 1,
    stretchH: 'all',
    allowInvalid: false,
    afterInit: onAfterInit,
    beforeChange: onBeforeChange
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A amChart data visualisation.
*
* Create amChart instance linked with data from Handsontable.
*
* @class AmChartsWrapper.
*/
var AmChartsWrapper = function () {
  /**
  * Create a AmChartsWrapper.
  * @param {string} amChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function AmChartsWrapper(amChartsRootId, hotInstance) {
    _classCallCheck(this, AmChartsWrapper);

    this.name = 'amCharts';
    this.chart = AmCharts.makeChart(amChartsRootId, AmChartsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * amChart options object.
  *
  * @returns {Object} amChart object configs.
  */


  _createClass(AmChartsWrapper, [{
    key: 'updateChartData',


    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */
    value: function updateChartData(column, value) {
      this.chart.dataProvider[column].value = value;

      this.chart.validateNow(true);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'serial',
        theme: 'light',
        dataProvider: AmChartsWrapper.zipHeadersWithValues(hotInstance.getSettings().colHeaders, hotInstance.getDataAtRow(0)),
        valueAxes: [{
          gridColor: '#FFFFFF',
          gridAlpha: 0.2,
          dashLength: 0
        }],
        gridAboveGraphs: true,
        startDuration: 1,
        graphs: [{
          balloonText: '[[category]]: <b>[[value]]</b>',
          fillAlphas: 0.8,
          lineAlpha: 0.2,
          type: 'column',
          valueField: 'value'
        }],
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'key',
        categoryAxis: {
          gridPosition: 'start',
          gridAlpha: 0,
          tickPosition: 'start',
          tickLength: 20
        },
        export: {
          enabled: true
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  "key": "May",
    *  "value": 144
    * }
    *
    * @param {String} columnHeaders column headers from Handsontable object settings.
    * @param {Number} columnValues column values from Handsontable object settings.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipHeadersWithValues',
    value: function zipHeadersWithValues(columnHeaders, columnValues) {
      return columnHeaders.map(function (item, index) {
        var obj = {};

        obj.key = item;
        obj.value = columnValues[index];

        return obj;
      });
    }
  }]);

  return AmChartsWrapper;
}();

exports.default = AmChartsWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A ChartJs data visualisation.
*
* Create ChartJs instance linked with data from Handsontable.
*
* @class ChartJsWrapper.
*/
var ChartJsWrapper = function () {
  /**
  * Create a ChartJsWrapper.
  * @param {string} chartJsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function ChartJsWrapper(chartJsRootId, hotInstance) {
    _classCallCheck(this, ChartJsWrapper);

    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartJsRootId), ChartJsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * ChartJs options object.
  *
  * @returns {Object} ChartJs object configs.
  */


  _createClass(ChartJsWrapper, [{
    key: 'updateChartData',


    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */
    value: function updateChartData(column, value) {
      this.chart.data.datasets[0].data[column] = value;
      this.chart.update();
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'bar',
        data: {
          labels: hotInstance.getSettings().colHeaders,
          datasets: [{
            data: hotInstance.getDataAtRow(0),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            fontSize: 32,
            fontStyle: 'normal',
            text: 'Chart.js & Handsontable'
          },
          tooltips: {
            titleFontSize: 24,
            bodyFontSize: 21
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 24
              }
            }],
            xAxes: [{
              ticks: {
                fontSize: 24
              }
            }]
          }
        }
      };
    }
  }]);

  return ChartJsWrapper;
}();

exports.default = ChartJsWrapper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A FusionCharts data visualisation.
*
* Create FusionCharts instance linked with data from Handsontable.
*
* @class FusionChartsWrapper.
*/
var FusionChartsWrapper = function () {
  /**
  * Create a FusionChartsWrapper.
  * @param {string} fusionChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function FusionChartsWrapper(fusionChartsRootId, hotInstance) {
    _classCallCheck(this, FusionChartsWrapper);

    this.name = 'fusioncharts';
    this.chart = new FusionCharts(FusionChartsWrapper.getChartOptions(fusionChartsRootId, hotInstance)).render();
  }

  /**
  *
  * FusionCharts options object.
  *
  * @returns {Object} FusionCharts object configs.
  */


  _createClass(FusionChartsWrapper, [{
    key: 'updateChartData',


    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */
    value: function updateChartData(column, value) {
      this.chart.args.dataSource.data[column].value = value;

      this.chart.setJSONData(this.chart.args.dataSource);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(fusionChartsRootId, hotInstance) {
      return {
        id: 'fusionChart',
        type: 'column2d',
        renderAt: fusionChartsRootId,
        width: 650,
        height: 420,
        dataFormat: 'json',
        dataSource: {
          chart: {
            caption: 'FusionCharts & Handsontable',
            xAxisName: 'Month',
            yAxisName: 'Values'
          },
          data: FusionChartsWrapper.zipHeadersWithValues(hotInstance.getSettings().colHeaders, hotInstance.getDataAtRow(0))
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  "label": "May",
    *  "value": 144
    * }
    *
    * @param {String} columnHeaders column headers from Handsontable object settings.
    * @param {Number} columnValues column values from Handsontable object settings.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipHeadersWithValues',
    value: function zipHeadersWithValues(columnHeaders, columnValues) {
      return columnHeaders.map(function (item, index) {
        var obj = {};

        obj.label = item;
        obj.value = columnValues[index];

        return obj;
      });
    }
  }]);

  return FusionChartsWrapper;
}();

exports.default = FusionChartsWrapper;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighchartsWrapper.
*/
var HighchartsWrapper = function () {
  /**
  * Create a HighChartsWrapper.
  * @param {string} highChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function HighchartsWrapper(highChartsRootId, hotInstance) {
    _classCallCheck(this, HighchartsWrapper);

    this.name = 'highcharts';
    this.chart = new Highcharts.Chart(document.getElementById(highChartsRootId), HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * HighCharts options object.
  *
  * @returns {Object} HighCharts object configs.
  */


  _createClass(HighchartsWrapper, [{
    key: 'updateChartData',


    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */
    value: function updateChartData(column, value) {
      this.chart.series[0].data[column].update(value);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        chart: {
          type: 'column',
          width: 650
        },
        title: {
          text: 'Highcharts & Handsontable'
        },
        xAxis: {
          categories: hotInstance.getSettings().colHeaders
        },
        series: [{
          colorByPoint: true,
          data: hotInstance.getDataAtRow(0)
        }]
      };
    }
  }]);

  return HighchartsWrapper;
}();

exports.default = HighchartsWrapper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map