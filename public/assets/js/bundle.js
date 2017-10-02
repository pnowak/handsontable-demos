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

var clock = {
  totalSeconds: 0,

  start: function start(td, hotInstance, row, column) {
    var _this = this;

    var parts = td.textContent.split(':');

    this.interval = setInterval(function () {
      _this.totalSeconds += 1;

      parts[0] = Math.floor(_this.totalSeconds / 3600 % 60);
      parts[1] = Math.floor(_this.totalSeconds / 60 % 60);
      parts[2] = parseInt(_this.totalSeconds % 60, 10);

      var hour = (parts[0] < 10 ? '0' : '') + parts[0];
      var minute = (parts[1] < 10 ? '0' : '') + parts[1];
      var second = (parts[2] < 10 ? '0' : '') + parts[2];

      hotInstance.setDataAtCell(row, column, hour + ':' + minute + ':' + second);
    }, 1000);
  },
  pause: function pause() {
    clearInterval(this.interval);
    delete this.interval;
  },
  reset: function reset(hotInstance, row, column) {
    clearInterval(this.interval);
    delete this.interval;

    this.totalSeconds = 0;

    hotInstance.setDataAtCell(row, column, '00:00:00');
  }
};

mapChartsToWrapper.set('Highcharts', _highcharts2.default);
mapChartsToWrapper.set('amCharts', _amCharts2.default);
mapChartsToWrapper.set('Chart.js', _chartJs2.default);
mapChartsToWrapper.set('FusionCharts', _fusionCharts2.default);

function onAfterInit() {
  var _this2 = this;

  var isListItem = document.getElementsByTagName('li');
  var allListItems = Array.from(isListItem);

  allListItems.forEach(function (li) {
    if (Handsontable.dom.hasClass(li, selectedClass)) {
      var chartName = li.children[0].textContent;
      var ActiveChartWrapper = mapChartsToWrapper.get(chartName);

      chartWrappers.push(new ActiveChartWrapper('chart', _this2));
    }
  });
}

function onAfterSetDataAtCell(changes) {
  var _this3 = this;

  changes.forEach(function (change) {
    chartWrappers.forEach(function (chartWrapper) {
      var _change = _slicedToArray(change, 4),
          row = _change[0],
          column = _change[1],
          currentValue = _change[3];

      console.log(row, column, currentValue);

      chartWrapper.updateChartData(row, column, currentValue, _this3);
    });
  });
}

function onAfterRemoveColumn(index) {
  var _this4 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.removeColumn(index, _this4);
  });
}

function onAfterRemoveRow(index) {
  var _this5 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.removeRow(index, _this5);
  });
}

function startPauseResetButtonRenderer(instance, td, row, col, prop, value) {
  var isRows = instance.rootElement.querySelectorAll('.ht_master table tr');
  var allRows = Array.from(isRows);
  var escaped = Handsontable.helper.stringify(value);

  Handsontable.dom.addClass(td, 'htCenter');

  allRows.forEach(function () {
    var timer = Object.create(clock);console.log(timer);

    Handsontable.dom.addEvent(instance.rootElement, 'click', function (event) {
      var target = event.target;

      if (target.nodeName.toLowerCase() === 'button') {
        var buttons = Array.from(document.getElementsByTagName('button'));

        buttons.forEach(function (button) {
          if (button === target) {
            var timeCell = instance.getCell(row, col - 1);

            if (target.textContent === 'Start') {
              target.textContent = 'Pause';
              timer.start(timeCell, instance, row, col - 1);
            }

            if (target.textContent === 'Pause') {
              target.textContent = 'Start';
              timer.pause();
            }

            if (target.textContent === 'Reset') {
              timer.reset(instance, row, col - 2);
            }
          }
        });
      }
    });
  });

  td.innerHTML = escaped;

  return td;
}

Handsontable.renderers.registerRenderer('start/pause/reset', startPauseResetButtonRenderer);

new Handsontable(document.getElementById('root'), {
  data: [['Task 1', 'Tom', '13/11/2018', '00:00:00', '<button type="button">Start</button>', '<button type="button">Reset</button>'], ['Task 2', 'Mark', '14/11/2018', '00:00:00', '<button type="button">Start</button>', '<button type="button">Reset</button>'], ['Task 3', 'Kate', '15/11/2018', '00:00:00', '<button type="button">Start</button>', '<button type="button">Reset</button>']],
  colHeaders: ['Task', 'User', 'Date', 'Time spent', 'Start/Pause', 'Reset'],
  rowHeaders: true,
  columns: [{}, {
    type: 'dropdown',
    source: ['Tom', 'Mark', 'Kate', 'Eddy']
  }, {
    type: 'date',
    dateFormat: 'MM/DD/YYYY',
    correctFormat: true,
    allowEmpty: false
  }, {
    type: 'time',
    timeFormat: 'HH:mm:ss',
    correctFormat: true,
    readOnly: true
  }, {
    renderer: 'start/pause/reset',
    readOnly: true
  }, {
    renderer: 'start/pause/reset',
    readOnly: true
  }],
  contextMenu: ['remove_row', 'remove_col', 'commentsAddEdit'],
  minSpareRows: 1,
  className: 'htCenter',
  width: 650,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  afterSetDataAtCell: onAfterSetDataAtCell,
  afterRemoveCol: onAfterRemoveColumn,
  afterRemoveRow: onAfterRemoveRow
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
    key: 'addNewGame',


    /**
    *
    *
    *
    * @param {}
    *
    */
    value: function addNewGame(hotInstance, index) {
      var objectGraph = {
        fillAlphas: 0.8,
        lineAlpha: 0.2,
        type: 'column',
        balloonText: hotInstance.getSettings().rowHeaders(index) + ': [[' + hotInstance.getSettings().rowHeaders(index) + ']]',
        valueField: '' + hotInstance.getSettings().rowHeaders(index)
      };

      this.chart.graphs.push(objectGraph);

      for (var i = 0; i < hotInstance.countCols(); i += 1) {
        this.chart.dataProvider[i][hotInstance.getSettings().rowHeaders(index)] = 0;
      }

      this.chart.validateNow(true);
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      var objectTeam = {
        team: 'Team ' + (index + 1)
      };

      for (var i = 0; i < hotInstance.countRows(); i += 1) {
        objectTeam[hotInstance.getSettings().rowHeaders(i)] = 0;
      }

      this.chart.dataProvider.push(objectTeam);

      this.chart.validateNow(true);
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.graphs.splice(index, 1);

      for (var j = 0; j < hotInstance.countRows(); j += 1) {
        for (var i = 0; i < hotInstance.countCols(); i += 1) {
          this.chart.dataProvider[i][hotInstance.getSettings().rowHeaders(j)] = hotInstance.getDataAtCell(j, i);
        }

        this.chart.graphs[j].balloonText = hotInstance.getSettings().rowHeaders(j) + ': [[' + hotInstance.getSettings().rowHeaders(j) + ']]';
        this.chart.graphs[j].valueField = '' + hotInstance.getSettings().rowHeaders(j);
      }

      this.chart.validateNow(true);
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.dataProvider.splice(index, 1);

      for (var i = 0; i < hotInstance.countCols(); i += 1) {
        this.chart.dataProvider[i].team = hotInstance.getSettings().colHeaders(i);

        for (var j = 0; j < hotInstance.countRows(); j += 1) {
          this.chart.graphs[j].balloonText = hotInstance.getSettings().rowHeaders(j) + ': [[' + hotInstance.getSettings().rowHeaders(j) + ']]';
          this.chart.graphs[j].valueField = '' + hotInstance.getSettings().rowHeaders(j);
        }
      }

      this.chart.validateNow(true);
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value, hotInstance) {
      this.chart.dataProvider[column][hotInstance.getSettings().rowHeaders(row)] = value;

      this.chart.validateNow(true);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'serial',
        theme: 'light',
        dataProvider: AmChartsWrapper.zipTeamWithGameData(hotInstance),
        valueAxes: [{
          gridColor: '#FFFFFF',
          gridAlpha: 0.2,
          dashLength: 0
        }],
        gridAboveGraphs: true,
        startDuration: 1,
        graphs: AmChartsWrapper.updateChartGraphs(hotInstance),
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'team',
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
    *  "name": "Team 1",
    *  "game1": 144,
    *  "game2": 30,
    *  and so on
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithGameData',
    value: function zipTeamWithGameData(hotInstance) {
      var colsArray = [];

      var _loop = function _loop(i) {
        var obj = {};

        obj.team = hotInstance.getSettings().colHeaders(i);

        hotInstance.getDataAtCol(i).map(function (item, index) {
          obj[hotInstance.getSettings().rowHeaders(index)] = item;

          return obj;
        });

        colsArray.push(obj);
      };

      for (var i = 0; i < hotInstance.countCols(); i += 1) {
        _loop(i);
      }

      return colsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateChartGraphs',
    value: function updateChartGraphs(hotInstance) {
      var graphs = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        var _obj = {};

        _obj.fillAlphas = 0.8;
        _obj.lineAlpha = 0.2;
        _obj.type = 'column';
        _obj.balloonText = hotInstance.getSettings().rowHeaders(index) + ': [[' + hotInstance.getSettings().rowHeaders(index) + ']]';
        _obj.valueField = '' + hotInstance.getSettings().rowHeaders(index);

        graphs.push(_obj);
      }
      console.log(graphs);
      return graphs;
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
    key: 'removeRow',


    /**
    *
    *
    *
    * @param {}
    *
    */
    value: function removeRow(index, hotInstance) {
      this.chart.data.datasets.splice(index, 1);

      for (var i = 0; i < hotInstance.countRows(); i += 1) {
        this.chart.data.datasets[i].label = hotInstance.getSettings().rowHeaders(i);
      }

      this.chart.update();
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.data.labels.splice(index, 1);

      for (var i = 0; i < hotInstance.countCols(); i += 1) {
        this.chart.data.labels[i] = hotInstance.getSettings().colHeaders(i);

        for (var j = 0; j < hotInstance.countRows(); j += 1) {
          this.chart.data.datasets[j].label = hotInstance.getSettings().rowHeaders(j);
          this.chart.data.datasets[j].data[index] = hotInstance.getDataAtCell(j, i);
        }
      }

      this.chart.update();
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value) {
      this.chart.config.data.datasets[0].data[row].push(value);
      this.chart.update();
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'line',
        data: {
          labels: ChartJsWrapper.updateTimeDate(hotInstance),
          datasets: [{ data: ChartJsWrapper.zipTeamWithRowData(hotInstance) }]
        },
        options: {
          animation: {
            duration: 1000,
            easing: 'linear'
          },
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
            titleFontSize: 21,
            bodyFontSize: 18
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 23
              },
              scaleLabel: {
                display: true,
                labelString: 'Time spent'
              }
            }],
            xAxes: [{
              ticks: {
                fontSize: 23
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }]
          }
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
    *  label: "Game 1",
    *  backgroundColor: "rgba(255, 99, 132, 0.2)",
    *  data: [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithRowData',
    value: function zipTeamWithRowData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        if (hotInstance.getDataAtCell(index, 3) != null) {
          rowsArray.push([hotInstance.getDataAtCell(index, 3)]);
        }
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateTimeDate',
    value: function updateTimeDate(hotInstance) {
      var categoriesArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        if (hotInstance.getDataAtCell(index, 3) != null) {
          categoriesArray.push(hotInstance.getSettings().data[index][2]);
        }
      }

      return categoriesArray;
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
    key: 'addNewGame',


    /**
    *
    *
    *
    * @param {}
    *
    */
    value: function addNewGame(hotInstance, index) {
      var obj = {};

      obj.seriesname = hotInstance.getSettings().rowHeaders(index);
      obj.data = hotInstance.getDataAtRow(index).map(function (item) {
        var o = {};

        o.value = item;

        return o;
      });

      this.chart.args.dataSource.dataset.push(obj);

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      var o = {};
      o.label = hotInstance.getSettings().colHeaders(index);

      this.chart.args.dataSource.categories[0].category.push(o);

      for (var i = 0; i < this.chart.args.dataSource.dataset.length; i += 1) {
        this.chart.args.dataSource.dataset[i].data[index] = { value: null };
      }

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.args.dataSource.dataset.splice(index, 1);

      for (var i = 0; i < hotInstance.countRows(); i += 1) {
        this.chart.args.dataSource.dataset[i].seriesname = hotInstance.getSettings().rowHeaders(i);
      }

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.args.dataSource.categories[0].category.splice(index, 1);

      for (var i = 0; i < hotInstance.countCols(); i += 1) {
        this.chart.args.dataSource.categories[0].category[i].label = hotInstance.getSettings().colHeaders(i);

        for (var j = 0; j < hotInstance.countRows(); j += 1) {
          this.chart.args.dataSource.dataset[j].seriesname = hotInstance.getSettings().rowHeaders(j);
          this.chart.args.dataSource.dataset[j].data[i].value = hotInstance.getDataAtCell(j, i);
        }
      }

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value) {
      this.chart.args.dataSource.dataset[row].data[column].value = value;

      this.chart.setJSONData(this.chart.args.dataSource);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(fusionChartsRootId, hotInstance) {
      return {
        id: 'fusionChart',
        type: 'mscolumn2d',
        renderAt: fusionChartsRootId,
        width: 650,
        height: 420,
        dataFormat: 'json',
        dataSource: {
          chart: {
            caption: 'FusionCharts & Handsontable',
            xAxisName: 'Teams',
            yAxisName: 'Values'
          },
          categories: [{ category: FusionChartsWrapper.updateChartColumns(hotInstance) }],
          dataset: FusionChartsWrapper.zipTeamWithRowData(hotInstance)
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
    *  "seriesname": "Game 1",
    *  "data": [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithRowData',
    value: function zipTeamWithRowData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        var obj = {};

        obj.seriesname = hotInstance.getSettings().rowHeaders(index);
        obj.data = hotInstance.getDataAtRow(index).map(function (item) {
          var o = {};

          o.value = item;

          return o;
        });

        rowsArray.push(obj);console.log(obj);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateChartColumns',
    value: function updateChartColumns(hotInstance) {
      var category = [];

      for (var index = 0; index < hotInstance.countCols(); index += 1) {
        var o = {};

        o.label = hotInstance.getSettings().colHeaders(index);

        category.push(o);
      }

      return category;
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
    key: 'addNewGame',


    /**
    *
    *
    *
    * @param {}
    *
    */
    value: function addNewGame(hotInstance, index) {
      var obj = {};

      obj.name = hotInstance.getSettings().rowHeaders(index);
      obj.data = hotInstance.getDataAtRow(index);

      this.chart.addSeries(obj);

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      this.chart.xAxis[0].categories.push(hotInstance.getSettings().colHeaders(index));

      for (var i = 0; i < this.chart.series.length; i += 1) {
        this.chart.series[i].data[index] = hotInstance.getDataAtRow(index);
      }

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    *
    *
    * @param {index}
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.series[index].remove();

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    *
    *
    * @param {}
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.xAxis[0].categories.splice(index, 1);

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} row row index.
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value) {
      this.chart.series[row].data[column].update(value);
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
          categories: HighchartsWrapper.updateChartColumns(hotInstance)
        },
        series: HighchartsWrapper.zipTeamWithRowData(hotInstance)
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
    *  "name": "Game 1",
    *  "data": [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithRowData',
    value: function zipTeamWithRowData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        var obj = {};

        obj.name = hotInstance.getSettings().rowHeaders(index);
        obj.data = hotInstance.getDataAtRow(index);

        rowsArray.push(obj);console.log(obj);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateChartColumns',
    value: function updateChartColumns(hotInstance) {
      var categoriesArray = [];

      for (var index = 0; index < hotInstance.countCols(); index += 1) {
        categoriesArray.push(hotInstance.getSettings().colHeaders(index));
      }

      return categoriesArray;
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