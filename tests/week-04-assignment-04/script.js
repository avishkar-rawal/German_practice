const state = {
  index: 0,
  mode: 'exam',
  answers: JSON.parse(localStorage.getItem('german-week4-answers') || '{}'),
  practice: {}
};
const $ = id => document.getElementById(id);
const normal = value => String(value || '').trim().toLocaleLowerCase('de-DE').replace(/\s+/g, ' ');
const accepted = answer => Array.isArray(answer) ? answer.map(normal) : String(answer).split('/').map(normal);
const correct = q => accepted(q.answer).includes(normal(state.answers[q.id]));
const imagePath = name => name ? `assets/${name}` : '';
const instructions = {
  'Personal information and vocabulary': 'Fill in the form. Write only one word for each blank.',
  'Verb conjugation': 'Write the verbs in the correctly conjugated form.',
  Matching: 'Match the following:\nType in ONLY the corresponding letters(a, b, c, d, or e) NOT the sentences.',
  'Verb selection': 'Which verb is appropriate for which sentence? Write ONLY the corresponding letter in the answer box: A, B, D, or E. DO NOT write/type in the words.',
  'Hobbies and activities': 'What do the people like to do? Write the verbs in correctly conjugated form.',
  'Sentence ordering': 'Instructions: Bring the jumbled sentences into proper order.',
  Listening: 'Listen to the Information about phone numbers and write the numbers WITHOUT any spaces between the numbers.',
  'Regular verb conjugation': 'Choose the correct verb and complete the sentences. Pay attention to the subject and verb conjugation: 0.5 Points for each answer.',
  'Strong verbs': 'Choose the correct conjugation for the following irregular verbs.\nKonjugieren Sie die folgenden starken Verben.',
  'Possessive pronouns': 'Fill in the blanks with appropriate possessive pronouns (for the underlined words) with correct endings.',
  'Vocabulary categorisation': 'Which word fits into which row? (Use dictionary (www.leo.org) if needed)\nWrite ONLY the corresponding letter in the answer box: A, B, D, or E. DO NOT write/type in the words.',
  'Sentence matching': 'Match the two columns to make small complete sentences. Write ONLY the corresponding letter in the answer box: A, B, D, or E. DO NOT write/type in the words.',
  'Word-bank completion': 'Fill in the blanks with the words given in the box.',
  'Reading comprehension': 'Read the text. In which section (A-E) would you find the answer to which question (1-5)?',
  'Household devices and objects': 'Which device does what? Choose the correct option for each box: a, b or c'
};

function save() {
  localStorage.setItem('german-week4-answers', JSON.stringify(state.answers));
}
function renderGrid() {
  $('questionGrid').innerHTML = questions.map((q, i) => `<button class="${i === state.index ? 'current ' : ''}${state.answers[q.id]?.trim() ? 'answered' : ''}" data-index="${i}">${q.id}</button>`).join('');
  $('questionGrid').querySelectorAll('button').forEach(button => button.addEventListener('click', () => { state.index = Number(button.dataset.index); render(); }));
  $('answeredCount').textContent = `${questions.filter(q => state.answers[q.id]?.trim()).length}/${questions.length} answered`;
}
function render() {
  const q = questions[state.index];
  $('sectionLabel').textContent = q.section;
  $('progressLabel').textContent = `Question ${state.index + 1} of ${questions.length}`;
  $('marksLabel').textContent = `${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}`;
  $('progressBar').style.width = `${((state.index + 1) / questions.length) * 100}%`;
  $('questionTitle').textContent = `Original item ${q.id}`;
  $('instruction').textContent = q.instruction || instructions[q.section] || '';
  const image = $('sourceImage');
  image.src = imagePath(q.image);
  image.alt = `Original assignment source for question ${q.id}`;
  image.hidden = !q.image;
  const imageLink = $('sourceImageLink');
  imageLink.hidden = !q.image;
  imageLink.href = imagePath(q.image);
  const secondaryImage = $('sourceImageSecondary');
  const secondaryImageLink = $('sourceImageSecondaryLink');
  secondaryImage.src = imagePath(q.companionImage);
  secondaryImage.alt = q.companionImage ? `Companion original assignment source for question ${q.id}` : '';
  secondaryImage.hidden = !q.companionImage;
  secondaryImageLink.hidden = !q.companionImage;
  secondaryImageLink.href = imagePath(q.companionImage);
  $('prompt').textContent = q.prompt;
  const audio = $('audioLink');
  audio.hidden = !q.audio;
  if (q.audio) audio.href = q.audio;
  $('answerArea').innerHTML = q.type === 'text'
    ? `<input class="answer-input" id="answerInput" value="${escapeHtml(state.answers[q.id] || '')}" placeholder="Type your answer…">`
    : `<select class="answer-input" id="answerInput"><option value="">Choose an answer…</option>${q.options.map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('')}</select>`;
  if (q.type !== 'text') $('answerInput').value = state.answers[q.id] || '';
  $('answerInput').addEventListener('input', e => { state.answers[q.id] = e.target.value; save(); renderGrid(); });
  const practiceControls = $('practiceControls');
  practiceControls.innerHTML = '';
  if (state.mode === 'practice') {
    const button = document.createElement('button');
    button.className = 'primary small';
    button.id = 'checkButton';
    button.textContent = 'Check answer';
    button.addEventListener('click', () => {
      state.practice[q.id] = true;
      showFeedback(q);
    });
    practiceControls.append(button);
  }
  $('feedback').hidden = true;
  if (state.mode === 'practice' && state.practice[q.id]) showFeedback(q);
  $('previousButton').disabled = state.index === 0;
  $('nextButton').textContent = state.index === questions.length - 1 ? 'Submit assignment' : 'Next →';
  renderGrid();
}
function showFeedback(q) {
  const feedback = $('feedback');
  const isRight = correct(q);
  feedback.hidden = false;
  feedback.className = `feedback ${isRight ? 'right' : 'wrong'}`;
  feedback.innerHTML = `<strong>${isRight ? 'Correct!' : 'Not quite.'}</strong><span>Correct answer: <b>${Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer}</b></span>${q.explanation ? `<span>${q.explanation}</span>` : ''}${!isRight ? '<button class="link-button" id="retry">Retry this question</button>' : ''}`;
  const retry = $('retry');
  if (retry) retry.addEventListener('click', () => { state.answers[q.id] = ''; state.practice[q.id] = false; render(); });
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
}
function showResults() {
  const total = questions.reduce((sum, q) => sum + q.marks, 0);
  const score = questions.reduce((sum, q) => sum + (correct(q) ? q.marks : 0), 0);
  const percent = Math.round(score / total * 100);
  $('quizView').hidden = true;
  const results = $('resultsView');
  results.hidden = false;
  results.innerHTML = `<div class="score"><strong>${score.toFixed(1)}</strong><span>/ ${total.toFixed(1)} marks</span><em>${percent}%</em></div><div class="result-stats"><span><b>${questions.filter(correct).length}</b> correct</span><span><b>${questions.filter(q => state.answers[q.id]?.trim() && !correct(q)).length}</b> incorrect</span><span><b>${questions.filter(q => !state.answers[q.id]?.trim()).length}</b> unanswered</span></div><h2>Answer review</h2><div class="review-list">${questions.map(q => `<div class="review ${correct(q) ? 'right' : 'wrong'}"><b>${q.id}</b><span>${q.prompt}</span><span>Your answer: ${escapeHtml(state.answers[q.id] || '—')}</span>${!correct(q) ? `<span>Correct: ${escapeHtml(Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer)}</span>` : ''}</div>`).join('')}</div><button class="primary" id="returnButton">Return to quiz</button>`;
  $('returnButton').addEventListener('click', () => { results.hidden = true; $('quizView').hidden = false; render(); });
}
$('modeToggle').addEventListener('click', () => {
  const open = $('modeToggle').getAttribute('aria-expanded') === 'true';
  $('modeToggle').setAttribute('aria-expanded', String(!open));
  $('modeSwitch').hidden = open;
  $('modeToggle').lastElementChild.textContent = open ? '⌄' : '⌃';
});
$('backToAssignments').addEventListener('click', () => {
  $('leaveDialog').hidden = false;
  $('cancelLeave').focus();
});
$('cancelLeave').addEventListener('click', () => {
  $('leaveDialog').hidden = true;
});
$('confirmLeave').addEventListener('click', () => {
  window.location.href = '../../index.html';
});
$('navigatorToggle').addEventListener('click', () => {
  const open = $('navigatorToggle').getAttribute('aria-expanded') === 'true';
  $('navigatorToggle').setAttribute('aria-expanded', String(!open));
  $('navigatorBody').hidden = open;
  $('navigatorToggle').lastElementChild.textContent = open ? '⌄' : '⌃';
  $('quizView').classList.toggle('navigator-collapsed', open);
});
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  state.mode = button.dataset.mode;
  $('modeLabel').textContent = state.mode === 'exam' ? 'Exam' : 'Practice';
  document.querySelectorAll('[data-mode]').forEach(item => item.classList.toggle('active', item === button));
  render();
}));
$('previousButton').addEventListener('click', () => { state.index--; render(); });
$('nextButton').addEventListener('click', () => {
  if (state.index === questions.length - 1) {
    if (confirm('Submit your answers now? You will see your score and corrections.')) showResults();
  } else { state.index++; render(); }
});
render();
