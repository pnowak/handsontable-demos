import HotChart from '../src/hotchart';
import HighChart from '../src/charts/highcharts';
import AmChart from '../src/charts/amcharts';
import Handsontable from 'handsontable';

describe('HotChart', () => {
  beforeEach(() => {
    const hot = document.createElement('DIV');
    hot.id = 'hot';
    document.body.appendChild(hot);

    const high = document.createElement('DIV');
    high.id = 'high';
    document.body.appendChild(high);

    const am = document.createElement('DIV');
    am.id = 'am';
    document.body.appendChild(am);
  });


  test('is a class', () => {
    expect(HotChart).toBe('function');
  });

  test('expects hotChart.hot to be instanceof Handsontable', () => {
    const hot = new Handsontable('hot');
    const highChart = new HighChart('high');
    const amChart = new AmChart('am');
    const hotChart = new HotChart('hot', highChart, amChart);

    expect(hotChart.hot).toBeInstanceOf(hot);
  });

  test('expects the first parameter to be a non empty string', () => {
    const testHotChart = new HotChart(''); console.log(testHotChart);

    expect(testHotChart).toThrow(TypeError, 'Type of parameter must be a non-empty string.');
  });

  test('expects the second (and next) parameter to be an object', () => {
    const highChart = new HighChart('high');
    const amChart = new AmChart('am');

    expect(highChart).toBe({});

    expect(amChart).toBe({});

    expect('amChart').toThrow(TypeError, 'Type of parameter must be an object.');
  });

  test('expects hotChart.charts to be an array wtesth one or more elements', () => {
    const highChart = new HighChart('high');
    const amChart = new AmChart('am');
    const hotChart = new HotChart('hot', highChart, amChart);

    expect(hotChart.charts).toBe('array');

    expect(hotChart.charts.length).toBeGreaterThan(0);

    expect(hotChart.charts).toContain('HighCharts');

    expect(hotChart.charts).toContain('AmChart');
  });

  describe('have a chart -> AmChart', () => {
    test('which is a class', () => {
      expect(AmChart).toBe('function');
    });

    test('expects the first parameter to be a non empty string', () => {
      const testAmChart = new AmChart('');

      expect(testAmChart).toThrow(TypeError, 'Type of parameter must be a non-empty string.');
    });

    test('expects AmChart.amcharts to be an object', () => {
      const amChart = new AmChart('am');

      expect(amChart.amcharts).toBe('object');
    });

    test('expects AmChart.name to be string and have value "amcharts"', () => {
      expect(AmChart.name).toBe('string');

      expect(AmChart.name).toMatch('amcharts');
    });

    test('expects AmChart.amOptions to be an function and return object', () => {
      const amChart = new AmChart('am');

      expect(amChart.amcharts).toBe('function');

      expect(amChart.amOptions()).toBe('object');
    });

    test('is connected wtesth handsontable through shared data', () => {
      const highChart = new HighChart('high');
      const amChart = new AmChart('am');
      const hotChart = new HotChart('hot', highChart, amChart);

      hotChart.charts.amcharts.valueChanged(0, 1);

      expect(hotChart.charts.amcharts.dataProvider[0].value).toEqual(1);
    });

    describe('have a chart -> HighChart', () => {
      test('which is a class', () => {
        expect(HighChart).toBe('function');
      });

      test('expects the first parameter to be a non empty string', () => {
        const testHighChart = new HighChart('');

        expect(testHighChart).toThrow(TypeError, 'Type of parameter must be a non-empty string.');
      });

      test('expects HighChart.highcharts to be an object', () => {
        expect(HighChart.highcharts).toBe('object');
      });

      test('expects HighChart.name to be string and have value "highcharts"', () => {
        expect(HighChart.name).toBe('string');

        expect(HighChart.name).toMatch('highcharts');
      });

      test('expects HighChart.highOptions to be an function and return object', () => {
        expect(HighChart.highOptions).toBe('function');

        expect(HighChart.highOptions()).toBe('object');
      });

      test('is connected wtesth handsontable through shared data', () => {
        const highChart = new HighChart('high');
        const amChart = new AmChart('am');
        const hotChart = new HotChart('hot', highChart, amChart);

        hotChart.charts.highcharts.valueChanged(0, 1);

        expect(hotChart.charts.highcharts.series[0].data[0].y).toEqual(1);
      });
    });
  });
});
