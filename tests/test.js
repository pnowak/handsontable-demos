import { Selector } from 'testcafe';

fixture `Handsontable for charts`
  .page `file:///Users/piotrnowak/handsontable-demos/src/index.html`;

const hotTable = Selector('#root .ht_master .htCore tbody td');
const corner = Selector('.wtBorder.current.corner');
const firstTd = hotTable.nth(0);
const secondTd = hotTable.nth(1);
const lastTd = hotTable.nth(11);

test('Charts are hidden after the page loads', async (t) => {
  const disappears = Selector('.items').child('.disappear').count;

  await t
    .expect(disappears).eql(2);
});

test('After clicked on the highcharts button the highcharts div appears', async (t) => {
  const highchartsButton = Selector('button[value=highcharts');
  const highchartsDiv = Selector('#highcharts');

  await t
    .click(highchartsButton)
    .expect(highchartsDiv.classNames).notContains('disappear');
});

test('After clicked on the amCharts button the amCharts div appears', async (t) => {
  const amChartsButton = Selector('button[value=amCharts');
  const amChartsDiv = Selector('#amCharts');

  await t
    .click(amChartsButton)
    .expect(amChartsDiv.classNames).notContains('disappear');
});

test('Handsontable drag down not working', async (t) => {
  const firstTr = Selector('#root .ht_master .htCore tbody tr');

  await t
    .click(firstTd)
    .click(corner)
    .drag(corner, 0, 40, { speed: 0.5 })
    .expect(firstTr.nextSibling('tr').count)
      .eql(0);
});

test('Handsontable drag first td value to last td', async (t) => {
  await t
    .click(firstTd)
    .click(corner)
    .drag(corner, 500, -3, { speed: 0.5 })
    .expect(lastTd.textContent)
      .eql('30');
});

test('Handsontable copy first td value and paste in the second td', async (t) => {
  await t
    .expect(firstTd.textContent).eql('30')
    .expect(secondTd.textContent).eql('72')
    .typeText(secondTd, '30', { replace: true, paste: true, speed: 0.5 })
    .expect(secondTd.textContent)
      .eql('30');
});
