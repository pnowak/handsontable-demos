(function initJsFiddle() {
  const jsFiddleLink = document.getElementById('jsfiddle');
  const textAreaValue = document.getElementById('codeExample').value;
  const chartDOMElement = document.getElementById('chart');
  const scriptTag = document.getElementsByTagName('script');
  const allScript = Array.from(scriptTag);

  let html = '<div id="root"></div>';
  let css = '</style>' +
    '<link rel="stylesheet" type="text/css" href="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.css">' +
    '<script src="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.js"></script>';

  allScript.forEach((script) => {
    if (!script.src.includes('assets') && !script.src.includes('handsontable') && !script.src.includes('codemirror')) {
      css += `<script src=${script.src}></script>`;
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
