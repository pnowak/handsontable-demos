import HotChart from '../src/hotchart';
import HighChart from '../src/charts/highcharts';
import AmChart from '../src/charts/amcharts';

const highChart = new HighChart('highcharts');
const amChart = new AmChart('amcharts');
const hotChart = new HotChart('root', highChart, amChart);


describe('HotChart', () => {
  it('is a class', () => {
    expect(HotChart).toBe('function');
  });

  it('expects the first parameter to be a non empty string', () => {
    const testHotChart = new HotChart('');

    expect(testHotChart).toThrow(TypeError, 'Type of parameter must be a non-empty string.');
  });

  it('expects the second (and next) parameter to be an object', () => {
    expect(highChart).toBe('object');

    expect(amChart).toBe('object');

    expect('amChart').toThrow(TypeError, 'Type of parameter must be an object.');
  });

  it('expects hotChart.charts to be an array with one or more elements', () => {
    expect(hotChart.charts).toBe('array');

    expect(hotChart.charts.length).toBeGreaterThan(0);

    expect(hotChart.charts).toContain('HighCharts');

    expect(hotChart.charts).toContain('AmChart');
  });

  describe('have a chart -> AmChart', () => {
    it('which is a class', () => {
      expect(AmChart).toBe('function');
    });

    it('expects the first parameter to be a non empty string', () => {
      const testAmChart = new AmChart('');

      expect(testAmChart).toThrow(TypeError, 'Type of parameter must be a non-empty string.');
    });

    it('expects AmChart.amcharts to be an object', () => {
      expect(amChart.amcharts).toBe('object');
    });

    it('expects AmChart.name to be string and have value "amcharts"', () => {
      expect(AmChart.name).toBe('string');

      expect(AmChart.name).toMatch('amcharts');
    });

    it('expects AmChart.amOptions to be an function and return object', () => {
      expect(amChart.amcharts).toBe('function');

      expect(amChart.amOptions()).toBe('object');
    });

    it('is connected with handsontable through shared data', () => {
      hotChart.charts.amcharts.valueChanged(0, 1);

      expect(hotChart.charts.amcharts.dataProvider[0].value).toEqual(1);
    });

    describe('have a chart -> HighChart', () => {
      it('which is a class', () => {
        expect(HighChart).toBe('function');
      });

      it('expects the first parameter to be a non empty string', () => {
        const testHighChart = new HighChart('');

        expect(testHighChart).toThrow(TypeError, 'Type of parameter must be a non-empty string.');
      });

      it('expects HighChart.highcharts to be an object', () => {
        expect(HighChart.highcharts).toBe('object');
      });

      it('expects HighChart.name to be string and have value "highcharts"', () => {
        expect(HighChart.name).toBe('string');

        expect(HighChart.name).toMatch('highcharts');
      });

      it('expects HighChart.highOptions to be an function and return object', () => {
        expect(HighChart.highOptions).toBe('function');

        expect(HighChart.highOptions()).toBe('object');
      });

      it('is connected with handsontable through shared data', () => {
        hotChart.charts.highcharts.valueChanged(0, 1);

        expect(hotChart.charts.highcharts.series[0].data[0].y).toEqual(1);
      });
    });
  });
});
