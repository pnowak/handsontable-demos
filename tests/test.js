import { Selector } from 'testcafe';

fixture `Handsontable for charts`
  .page `file:///Users/piotrnowak/handsontable-demos/src/index.html`;

test('Charts are hidden after the page loads', async t => {
  const disappears = Selector('.items').child('.disappear').count;

  await t
    .expect(disappears).eql(2);
});

test('After clicked on the highcharts button the highcharts div appears', async t => {
  const highchartsButton = Selector('button[value=highcharts');
  const highchartsDiv = Selector('#highcharts');

  await t
    .click(highchartsButton)
    .expect(highchartsDiv.classNames).notContains('disappear');
});

test('After clicked on the amCharts button the amCharts div appears', async t => {
  const amChartsButton = Selector('button[value=amCharts');
  const amChartsDiv = Selector('#amCharts');

  await t
    .click(amChartsButton)
    .expect(amChartsDiv.classNames).notContains('disappear');
});

test('Handsontable drag first td value to second td', async t => {
  const hotTable = Selector('#root .ht_master .htCore tbody td');
  const firstTd = hotTable.nth(0);
  const secondTd = hotTable.nth(1);

  await t
    .drag(firstTd, 39, 2)
    .expect(secondTd.textContent).eql('30');
});

test('Handsontable copy first td value and paste in the second td', async t => {
  const hotTable = Selector('#root .ht_master .htCore tbody td');
  const firstTd = hotTable.nth(0);
  const secondTd = hotTable.nth(1);

  await t
    .expect(firstTd.textContent).eql('30')
    .expect(secondTd.textContent).eql('72')
    .click(firstTd, { ctrl: true } )
    .typeText(secondTd, '', { paste: true })
    .expect(secondTd.textContent).eql('30');
});
