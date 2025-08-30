// 簡易テストランナー
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function showResult(name, passed, error) {
  const div = document.createElement('div');
  div.className = 'testcase ' + (passed ? 'pass' : 'fail');
  div.textContent = (passed ? '✔' : '✗') + ' ' + name + (passed ? '' : ': ' + error);
  document.getElementById('test-results').appendChild(div);
}

async function runTest(name, fn) {
  try {
    await fn();
    showResult(name, true);
  } catch (e) {
    showResult(name, false, e.message);
  }
}

// --- テストケース ---

runTest('problems.jsonが正しく読み込める', async () => {
  const res = await fetch('problems.json');
  const data = await res.json();
  assert(Array.isArray(data), '配列でない');
  assert(data.length > 0, 'データが空');
  assert(data.every(p => p.type && p.question && p.answer), '必須項目が欠落');
});

runTest('hintフィールドが含まれていない', async () => {
  const res = await fetch('problems.json');
  const data = await res.json();
  assert(data.every(p => !('hint' in p)), 'hintフィールドが存在する');
});

runTest('index.htmlに主要ボタンが存在する', async () => {
  const res = await fetch('index.html');
  const html = await res.text();
  assert(html.includes('data-mode="yomi"'), '読みボタンがない');
  assert(html.includes('data-mode="kakitori"'), '書き取りボタンがない');
  assert(html.includes('data-mode="yojijukugo"'), '四字熟語ボタンがない');
  assert(html.includes('data-mode="mix"'), '3種混合ボタンがない');
});
