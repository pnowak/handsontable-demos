/**
* Helper function.
*
* Bind column header to the value of the column from Handsontable object settings.
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
* @param {String} key property name.
* @returns {Array} a merged key-value pair in array.
*/
export default function zipHeadersWithValues(columnHeaders, columnValues, key) {
  return columnHeaders.map((item, index) => {
    const obj = {};

    obj[key] = item;
    obj.value = columnValues[index];

    return obj;
  });
}
