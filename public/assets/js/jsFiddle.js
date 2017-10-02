(function initJsFiddle() {
  const jsFiddleLink = document.getElementById('jsfiddle');
  const textAreaValue = document.getElementById('codeExample').value;
  const chartDOMElement = document.getElementById('chart');
  const scriptTag = document.getElementsByTagName('script');
  const allScript = Array.from(scriptTag);

  const mapChartLinks = new Map();

  mapChartLinks.set('./assets/js/highCharts.bundle.js', '<script src="https://code.highcharts.com/highcharts.js"></script>');
  mapChartLinks.set('./assets/js/amCharts.bundle.js', '<script src="https://www.amcharts.com/lib/3/amcharts.js">' +
    '</script><script src="https://cdn.amcharts.com/lib/3/serial.js"></script>' +
    '<script src="https://cdn.amcharts.com/lib/3/pie.js"></script>' +
    '<script src="https://cdn.amcharts.com/lib/3/themes/light.js"></script>');
  mapChartLinks.set('./assets/js/chartJs.bundle.js', '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.bundle.min.js"></script>');

  let html = '<div id="root"></div>';
  let css = '</style>' +
    '<link rel="stylesheet" type="text/css" href="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.css">';

  allScript.forEach((script) => {
    if (!script.src.includes('codeMirror') && !script.src.includes('jsFiddle')) {
      if (mapChartLinks.has(script.src)) {
        css += mapChartLinks.get(script.src);
      } else {
        css += `<script src=${script.src}></script>`;
      }
    }
  });

  if (chartDOMElement.getContext) {
    html += '<canvas id="chart" style="width: 650px; height: 420px;"></canvas>';
  } else {
    html += '<div id="chart" style="width: 650px; height: 420px;"></div>';
  }

  const form = document.createElement('form');
  form.action = 'http://jsfiddle.net/api/post/library/pure/';
  form.method = 'POST';
  form.target = '_blank';
  form.innerHTML = `<input type="text" name="title" value="">
    <textarea name="html">${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    <textarea name="css">${css.replace(/,/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>;
    <textarea name="js">${textAreaValue.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>`;

  form.style.visibility = 'hidden';

  document.body.appendChild(form);

  jsFiddleLink.addEventListener('click', (event) => {
    event.preventDefault();
    form.submit();
  });
}());
