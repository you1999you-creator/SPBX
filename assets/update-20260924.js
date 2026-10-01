// Public market snapshot. Private account information must not be embedded here.
(() => {
  const nav = document.querySelector('.links');
  const link = document.createElement('a');
  link.href = '#update-20260924';
  link.textContent = '10/1 更新';
  nav?.prepend(link);
  nav?.querySelectorAll('a').forEach(item => {
    if (item.getAttribute('href') === '#latest-brief') item.textContent = '8/29 過去記録';
    if (item.getAttribute('href') === '#spbx-latest') item.textContent = '旧SPBX';
  });
  document.querySelectorAll('main > section:not(#update-20260924)').forEach(section => {
    if (['neural-activity','dock-game','space-cat-station'].includes(section.id)) return;
    const note = document.createElement('p');
    note.className = 'archive-notice';
    note.textContent = '過去記録：このブロックの価格・予測・イベントは当時のものです。最新確認分はページ先頭へ。';
    section.prepend(note);
  });
  const oldHero = document.querySelector('.hero');
  if (oldHero) oldHero.hidden = true;
  const ask = document.getElementById('askCat');
  ask?.addEventListener('click', () => {
    document.getElementById('catDirection').textContent = 'IONQ：高値からの売りを警戒';
    document.getElementById('catBullChance').textContent = '算出保留';
    document.getElementById('catConfidenceBar').style.width = '0%';
    document.getElementById('catRange').textContent = '未算出';
    document.getElementById('catBoundary').textContent = '未算出';
    document.getElementById('catReason').textContent = '古い予測を今日の予測として使わないニャ。公式材料と確定した価格・出来高を別々に確認しよう。';
    document.getElementById('catBubble').textContent = '10/1更新：IONQは9/30終値43.86ドル。出来高増でも安値付近の引けは警戒ニャ。上昇確率は未算出。';
  });
  if (ask) ask.click();
  const caution = document.querySelector('.catCaution');
  if (caution) caution.textContent = '予測値・確率は算出保留。過去のモデル値を最新予測として表示しません。';
  const forecastLabel = document.querySelector('.catForecast > .label');
  if (forecastLabel) forecastLabel.textContent = '2026-10-01 / US CLOSE 9-30';
  const fields = ['qty','cost','price','fx'].map(key => document.getElementById('calc-' + key));
  const money = value => Math.round(value).toLocaleString('ja-JP');
  function calculate() {
    const output = document.getElementById('calc-output');
    if (fields.some(field => field.value === '' || !field.validity.valid)) {
      output.textContent = '株数・取得単価・為替を入力してください。'; return;
    }
    const [qty,cost,price,fx] = fields.map(field => Number(field.value));
    const profit = qty * (price - cost);
    output.textContent = `元本込み：${money(qty * price * fx)}円 ／ ドル損益：${profit.toFixed(2)} USD ／ 損益の円換算：${money(profit * fx)}円`;
  }
  fields.forEach(field => field.addEventListener('input', calculate));
  const footer = document.querySelector('footer .shell');
  if (footer) footer.textContent = 'SPBX / Updated 2026-10-01 JST / US close 9-30 / Timestamped snapshots, not live quotes / Private account data excluded';
})();
