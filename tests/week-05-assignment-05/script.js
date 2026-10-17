const state = {
  mode: 'practice',
  answers: JSON.parse(localStorage.getItem('german-week5-answers') || '{}'),
  practice: {}
};
const $ = id => document.getElementById(id);
const normal = value => String(value || '').trim().toLocaleLowerCase('de-DE').replace(/\s+/g, ' ');
const accepted = answer => Array.isArray(answer) ? answer.map(normal) : String(answer).split('/').map(normal);
const correct = q => accepted(q.answer).includes(normal(state.answers[q.id]));
const imagePath = name => name ? `assets/${name}` : '';
const instructions = {
  'Listening: time': 'Listen to the audio. What is the time? Mark a or b.\nWelche Uhrzeit hören Sie? a) oder b)?',
  'Listening: dialogues': 'Listen to the dialogues and mark the correct timings. Example: 0. b).',
  'Reading comprehension': 'Read the mail and choose Richtig or Falsch for the statements 1 to 5 below. 0 is an example.',
  'Imperative sentences with Sie': 'Write imperative sentences with Sie:',
  'Verb conjugation': 'Fill in the blanks with the given verbs. Conjugate them correctly according to the sentence.',
  'Vocabulary word bank': 'Understand the expression in the column on the left and fill in the appropriate word in the blanks in the column on the right. Choose from among the words given in the box. Use each word ONLY ONCE.',
  'Modal verbs': 'Fill in the blanks with the correct conjugation of wollen / können / müssen. Please write the FULL WORD in the box.',
  'Separable verbs': 'Conjugate the separable verbs given in brackets and fill in the blanks with the appropriate verb forms and prefixes.',
  'Verb selection': 'Choose the right option to complete each sentence. Write only the corresponding letter in the answer: A, B, C or D.',
  'Akkusativ articles': 'Akkusativ! Fill in the blanks with DAS, DIE or DEN. For genders of new words refer to www.leo.org.',
  'Akkusativ indefinite articles': 'Akkusativ! Fill in the blanks with EIN, EINE or EINEN. For genders of new words refer to www.leo.org.',
  'mögen or möchten': 'Fill in the correct form of mögen OR möchten.',
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
  localStorage.setItem('german-week5-answers', JSON.stringify(state.answers));
}
function answerMarkup(q) {
  if (q.type === 'text') return `<input class="answer-input" id="answer-${q.id}" value="${escapeHtml(state.answers[q.id] || '')}" placeholder="Type your answer…">`;
  return `<select class="answer-input" id="answer-${q.id}"><option value="">Choose an answer…</option>${q.options.map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('')}</select>`;
}
function renderQuestion(q, index) {
  const item = document.createElement('div');
  item.className = 'question-item';
  item.id = `question-${q.id}`;
  item.innerHTML = `
    <div class="subquestion-meta"><strong>Question ${q.id}: <span>${escapeHtml(q.prompt)}</span></strong><b>${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}</b></div>
    <a class="audio-link" href="${q.audio || '#'}" target="_blank" rel="noreferrer" ${q.audio ? '' : 'hidden'}>Open the original listening audio ↗</a>
    <div class="answer-area">${answerMarkup(q)}<div class="practice-controls"></div></div>
    <div class="feedback" hidden></div>`;
  const input = item.querySelector(`#answer-${q.id}`);
  if (q.type !== 'text') input.value = state.answers[q.id] || '';
  input.addEventListener('input', event => {
    state.answers[q.id] = event.target.value;
    save();
    renderGrid();
  });
  const controls = item.querySelector('.practice-controls');
  if (state.mode === 'practice') {
    const button = document.createElement('button');
    button.className = 'primary small';
    button.textContent = 'Check answer';
    button.addEventListener('click', () => {
      state.practice[q.id] = true;
      showFeedback(q, item);
    });
    controls.append(button);
  }
  if (state.mode === 'practice' && state.practice[q.id]) showFeedback(q, item);
  return item;
}
function groupKey(q) {
  return [q.section, q.instruction || instructions[q.section] || '', q.image || '', q.companionImage || ''].join('|');
}
function questionGroups() {
  return questions.reduce((groups, q) => {
    const previous = groups[groups.length - 1];
    if (previous && groupKey(previous[previous.length - 1]) === groupKey(q)) previous.push(q);
    else groups.push([q]);
    return groups;
  }, []);
}
function renderGroup(group) {
  const first = group[0];
  const start = questions.indexOf(first) + 1;
  const end = start + group.length - 1;
  const card = document.createElement('article');
  card.className = 'card question-card';
  card.innerHTML = `
    <div class="question-meta"><span>${escapeHtml(first.section)}</span><strong>Questions ${start}-${end} of ${questions.length}</strong><b>${group.reduce((sum, q) => sum + q.marks, 0).toFixed(1)} marks</b></div>
    <div class="progress"><span style="width:${(end / questions.length) * 100}%"></span></div>
    <h2>Original item${group.length > 1 ? 's' : ''} ${group.map(q => q.id).join(', ')}</h2>
    <p class="instruction">${escapeHtml(first.instruction || instructions[first.section] || '')}</p>
    <img class="source-image" src="${imagePath(first.image)}" alt="Original assignment source for questions ${start}-${end}" ${first.image ? '' : 'hidden'}>
    <a class="source-image-link" href="${imagePath(first.image)}" target="_blank" rel="noreferrer" ${first.image ? '' : 'hidden'}>Open full-size original question ↗</a>
    <img class="source-image" src="${imagePath(first.companionImage)}" alt="${first.companionImage ? `Companion original assignment source for questions ${start}-${end}` : ''}" ${first.companionImage ? '' : 'hidden'}>
    <a class="source-image-link" href="${imagePath(first.companionImage)}" target="_blank" rel="noreferrer" ${first.companionImage ? '' : 'hidden'}>Open companion image full size ↗</a>
    ${first.example ? `<p class="example">${escapeHtml(first.example)}</p>` : ''}
    <div class="subquestion-list"></div>`;
  const list = card.querySelector('.subquestion-list');
  group.forEach(q => list.append(renderQuestion(q, questions.indexOf(q))));
  return card;
}
function showFeedback(q, card) {
  const feedback = card.querySelector('.feedback');
  const isRight = correct(q);
  feedback.hidden = false;
  feedback.className = `feedback ${isRight ? 'right' : 'wrong'}`;
  feedback.innerHTML = `<button class="feedback-close" type="button" aria-label="Close answer feedback">×</button><strong>${isRight ? 'Correct!' : 'Not quite.'}</strong><span>Correct answer: <b>${escapeHtml(Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer)}</b></span>${q.explanation ? `<span>${escapeHtml(q.explanation)}</span>` : ''}${!isRight ? '<button class="link-button retry" type="button">Retry this question</button>' : ''}`;
  feedback.querySelector('.feedback-close').addEventListener('click', () => {
    state.practice[q.id] = false;
    feedback.hidden = true;
  });
  const retry = feedback.querySelector('.retry');
  if (retry) retry.addEventListener('click', () => {
    state.answers[q.id] = '';
    state.practice[q.id] = false;
    save();
    render();
    document.getElementById(`question-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
function renderGrid() {
  $('questionGrid').innerHTML = questions.map((q, i) => `<button class="${state.answers[q.id]?.trim() ? 'answered' : ''}" data-index="${i}">${q.id}</button>`).join('');
  $('questionGrid').querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    document.getElementById(`question-${questions[Number(button.dataset.index)].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  $('answeredCount').textContent = `${questions.filter(q => state.answers[q.id]?.trim()).length}/${questions.length} answered`;
}
function render() {
  $('modeLabel').textContent = state.mode === 'exam' ? 'Exam' : 'Practice';
  document.querySelectorAll('[data-mode]').forEach(item => item.classList.toggle('active', item.dataset.mode === state.mode));
  $('questionList').innerHTML = '';
  questionGroups().forEach(group => $('questionList').append(renderGroup(group)));
  $('submitBar').hidden = false;
  renderGrid();
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
}
function showResults() {
  const total = questions.reduce((sum, q) => sum + q.marks, 0);
  const score = questions.reduce((sum, q) => sum + (correct(q) ? q.marks : 0), 0);
  const percent = Math.round(score / total * 100);
  $('quizView').hidden = true;
  $('submitBar').hidden = true;
  const results = $('resultsView');
  results.hidden = false;
  results.innerHTML = `<div class="score"><strong>${score.toFixed(1)}</strong><span>/ ${total.toFixed(1)} marks</span><em>${percent}%</em></div><div class="result-stats"><span><b>${questions.filter(correct).length}</b> correct</span><span><b>${questions.filter(q => state.answers[q.id]?.trim() && !correct(q)).length}</b> incorrect</span><span><b>${questions.filter(q => !state.answers[q.id]?.trim()).length}</b> unanswered</span></div><h2>Answer review</h2><div class="review-list">${questions.map(q => `<div class="review ${correct(q) ? 'right' : 'wrong'}"><b>${q.id}</b><span>${escapeHtml(q.prompt)}</span><span>Your answer: ${escapeHtml(state.answers[q.id] || '—')}</span>${!correct(q) ? `<span>Correct: ${escapeHtml(Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer)}</span>` : ''}</div>`).join('')}</div><button class="primary" id="returnButton">Return to quiz</button>`;
  $('returnButton').addEventListener('click', () => {
    results.hidden = true;
    $('quizView').hidden = false;
    $('submitBar').hidden = false;
    render();
  });
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
$('cancelLeave').addEventListener('click', () => { $('leaveDialog').hidden = true; });
$('confirmLeave').addEventListener('click', () => { window.location.href = '../../index.html'; });
$('resetQuiz').addEventListener('click', () => {
  $('resetDialog').hidden = false;
  $('cancelReset').focus();
});
$('cancelReset').addEventListener('click', () => { $('resetDialog').hidden = true; });
$('confirmReset').addEventListener('click', () => {
  localStorage.removeItem('german-week5-answers');
  state.answers = {};
  state.practice = {};
  $('resetDialog').hidden = true;
  $('resultsView').hidden = true;
  $('quizView').hidden = false;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
$('navigatorToggle').addEventListener('click', () => {
  const open = $('navigatorToggle').getAttribute('aria-expanded') === 'true';
  $('navigatorToggle').setAttribute('aria-expanded', String(!open));
  $('navigatorBody').hidden = open;
  $('navigatorToggle').lastElementChild.textContent = open ? '⌄' : '⌃';
  $('navigator').classList.toggle('is-collapsed', open);
});
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  state.mode = button.dataset.mode;
  render();
}));
$('submitButton').addEventListener('click', () => {
  if (confirm('Submit your answers now? You will see your score and corrections.')) showResults();
});
render();
