import Handsontable from 'handsontable';
import numbro from 'numbro';
import moment from 'moment';
import pikaday from 'pikaday';
import Zeroclipboard from 'zeroclipboard';
import Highcharts from 'highcharts';

class HotChart {
	constructor(hotOpt, charOpt) {
		this.chart = new Highcharts.Chart(document.getElementById('container'), charOpt = this.charOptions());
		this.hot = new Handsontable(document.getElementById('root'), hotOpt = this.hotOptions());
	}

	charOptions() {
		return {
			title: {
		        text: 'HighChart & Handsontable'
		    },

		    subtitle: {
		        text: 'Plain'
		    },

		    xAxis: {
		        categories: this.hotOptions().colHeaders //colHeaders from Table
		    },

		    series: [{
		        type: 'column',
		        colorByPoint: true,
		        data: this.hotOptions().data //data from Table
		    }]
        }
	}

	hotOptions() {
		return {
			data: [
				["239.65","0.000128","-0.2379","47.044"],
				["238.99","0.0106","-0.2435","5.11"],
				["231.26","0.0066","-0.2521","7.571"],
				["239.12","0.0082","-0.2454","16.429"],
				["255.07","0.0091","-0.2017","252"],
				["238.91","0.0077","-0.2437","995"],
				["211.51","0.0089","-0.1880","4.28"],
				["210.65","0.0078","-0.1930","2.521"],
				["205.06","0.0107","-0.2251","96"],
				["212.41","0.0085","-0.1949","456"],
				["227.94","0.0158","-0.1363","49"],
				["211.28","0.0078","-0.1765","19"],
				["1486.97","0.0112","-0.2310","168"],
				["1310.00","-0.01812","-0.3310","0"],
				["1497.50","0.0051","-0.2309","160"]
			],
			colHeaders: ["Price", "1D Chg", "YTD Chg", "Vol BTC"],
			rowHeaders: true,
			columns: [
			    {type: 'numeric', format: '$0,0.00'},
			    {type: 'numeric', format: '0.00%'},
			    {type: 'numeric', format: '0.00%'},
			    {type: 'numeric', format: '0.00'}
			]
		}
	}
}

export default HotChart;