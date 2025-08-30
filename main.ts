
type ProblemType = 'yomi' | 'kakitori' | 'yojijukugo';
type Problem = {
  type: ProblemType;
  question: string;
  answer: string;
  correct?: number;
  wrong?: number;
};

type Mode = ProblemType | 'mix';
let problems: Problem[] = [];
let currentProblems: Problem[] = [];
let currentIndex = 0;
let mode: Mode = 'yomi';
let correctCount = 0;
let wrongCount = 0;

// 初期化処理: JSONロード→イベントリスナー登録
document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('./problems.json');
  problems = await res.json();
  setupEventListeners();
});

function setupEventListeners() {
  const modeSelect = document.getElementById('mode-select')!;
  const main = document.getElementById('main')!;
  const displayArea = document.getElementById('display-area')!;
  const showAnswerBtn = document.getElementById('show-answer')!;
  const btnCorrect = document.getElementById('btn-correct')!;
  const btnWrong = document.getElementById('btn-wrong')!;
  const endBtn = document.getElementById('end')!;

  modeSelect.addEventListener('click', e => {
    const t = e.target as HTMLElement;
    if (t.tagName === 'BUTTON') {
      mode = t.getAttribute('data-mode') as Mode;
      currentProblems = selectProblems(mode);
      currentIndex = 0;
      correctCount = 0;
      wrongCount = 0;
      modeSelect.style.display = 'none';
      main.style.display = '';
      showQuestion();
    }
  });

  // 画面全体をタッチして正解表示
  displayArea.addEventListener('click', (e) => {
    const answerDiv = document.getElementById('answer')!;
    const showAnswerBtn = document.getElementById('show-answer')!;
    
    // 正解表示前の状態でのみ反応
    if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
      showAnswer();
    }
  });

  showAnswerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 親要素のクリックイベントを防ぐ
    showAnswer();
  });
  btnCorrect.addEventListener('click', () => nextQuestion(true));
  btnWrong.addEventListener('click', () => nextQuestion(false));
  endBtn.addEventListener('click', () => {
    main.style.display = 'none';
    modeSelect.style.display = '';
  });
}

function shuffle<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectProblems(mode: Mode): Problem[] {
  let filtered: Problem[];
  if (mode === 'mix') {
    filtered = problems.slice();
  } else {
    filtered = problems.filter(p => p.type === mode);
  }
  // 正解率が低いものを優先（仮実装: ランダム）
  return shuffle(filtered);
}

function showQuestion() {
  const questionDiv = document.getElementById('question')!;
  const displayArea = document.getElementById('display-area')!;
  const touchHint = document.getElementById('touch-hint')!;
  const answerDiv = document.getElementById('answer')!;
  const showAnswerBtn = document.getElementById('show-answer')!;
  const btnCorrect = document.getElementById('btn-correct')!;
  const btnWrong = document.getElementById('btn-wrong')!;
  const progressDiv = document.getElementById('progress')!;
  
  // 問題リストの最後まで行ったら、再度シャッフルして最初から
  if (currentIndex >= currentProblems.length) {
    currentProblems = shuffle(currentProblems);
    currentIndex = 0;
  }
  
  const p = currentProblems[currentIndex];
  questionDiv.textContent = p.type === 'kakitori' ? `「${p.question}」を書きなさい` : p.question;
  
  // 画面全体をクリック可能にする視覚的ヒント
  displayArea.classList.add('clickable');
  touchHint.style.display = 'block';
  
  answerDiv.style.display = 'none';
  showAnswerBtn.style.display = '';
  btnCorrect.style.display = 'none';
  btnWrong.style.display = 'none';
  progressDiv.textContent = `正解: ${correctCount} / 不正解: ${wrongCount}`;
}

function showAnswer() {
  const answerDiv = document.getElementById('answer')!;
  const displayArea = document.getElementById('display-area')!;
  const touchHint = document.getElementById('touch-hint')!;
  const showAnswerBtn = document.getElementById('show-answer')!;
  const btnCorrect = document.getElementById('btn-correct')!;
  const btnWrong = document.getElementById('btn-wrong')!;
  
  const p = currentProblems[currentIndex];
  answerDiv.textContent = `正解：${p.answer}`;
  answerDiv.style.display = '';
  showAnswerBtn.style.display = 'none';
  btnCorrect.style.display = '';
  btnWrong.style.display = '';
  
  // クリック可能状態を解除
  displayArea.classList.remove('clickable');
  touchHint.style.display = 'none';
}

function nextQuestion(isCorrect: boolean) {
  if (isCorrect) correctCount++;
  else wrongCount++;
  currentIndex++;
  showQuestion();
}


