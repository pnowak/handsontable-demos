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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Helper function.
*
* Zip column header to the value of the column from Handsontable object settings.
* amCharts/FusionCharts data provider needs data array in form:
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
function zipHeadersWithValues(columnHeaders, columnValues, key) {
  return columnHeaders.map(function (item, index) {
    var obj = {};

    obj[key] = item;
    obj.value = columnValues[index];

    return obj;
  });
}

exports.default = zipHeadersWithValues;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zip = __webpack_require__(0);

var _zip2 = _interopRequireDefault(_zip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
          data: (0, _zip2.default)(hotInstance.getSettings().colHeaders, hotInstance.getDataAtRow(0), 'label')
        }
      };
    }
  }]);

  return FusionChartsWrapper;
}();

exports.default = FusionChartsWrapper;

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fusionCharts = __webpack_require__(3);

var _fusionCharts2 = _interopRequireDefault(_fusionCharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chartWrappers = [];

function onAfterInit() {
  chartWrappers.push(new _fusionCharts2.default('chart', this));
}

function onBeforeChange(changes) {
  var _this = this;

  changes.forEach(function (change) {
    chartWrappers.forEach(function (chartWrapper) {
      var _change = _slicedToArray(change, 2),
          row = _change[0],
          column = _change[1];

      var currentValue = change[3] === '' ? 0 : change[3];

      if (change[3] === '') {
        _this.setDataAtCell(row, column, 0, 'onBeforeChange');
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

/***/ })
/******/ ]);
//# sourceMappingURL=fusionCharts.bundle.js.map