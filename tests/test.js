import { Selector } from 'testcafe';

fixture `Handsontable for charts`
  .page `../www/index.html`;

const hotTable = Selector('#root .ht_master .htCore tbody td');
const highChart = Selector('#chart svg .highcharts-series-group .highcharts-series rect');
const corner = Selector('.wtBorder.current.corner');
const firstTd = hotTable.nth(0);
const sixTd = hotTable.nth(5);
const lastTd = hotTable.nth(11);

test('Highcharts are visible after the page loads', async (t) => {
  const oneChart = Selector('#chart').child('.highcharts-container').count;

  await t
    .expect(oneChart).eql(1);
});

test('When Handsontable drag down in Highcharts nothing happens', async (t) => {
  const firstHighchart = highChart.nth(0);
  const initialHeight = firstHighchart.getAttribute('height');

  await t
    .click(firstTd)
    .click(corner)
    .drag(corner, 0, 40, { speed: 0.5 })
    .expect(firstHighchart.classNames)
      .contains('highcharts-color-0')
    .expect(firstHighchart.getAttribute('height'))
      .eql(await initialHeight);
});

test('When Handsontable drag first td value to last td Highcharts change value', async (t) => {
  const lastHighchart = highChart.nth(11);
  const initialHeight = lastHighchart.getAttribute('height');

  await t
    .click(firstTd)
    .click(corner)
    .drag(corner, 550, -3, { speed: 0.5 })
    .expect(lastTd.textContent)
      .eql('30')
    .expect(lastHighchart.getAttribute('height'))
      .notEql(await initialHeight);
});

test('When Handsontable change value Highcharts change value too', async (t) => {
  const sixHighchart = highChart.nth(5);

  await t
    .expect(sixTd.textContent)
      .eql('176')
    .typeText(sixTd, '1', { replace: true })
    .pressKey('1')
    .click(Selector('#chart'))
    .expect(sixTd.textContent)
      .eql('1')
    .expect(sixHighchart.getAttribute('height'))
      .eql('1');
});
