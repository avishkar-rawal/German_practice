const textGroup = (start, section, answers, prompt, image, explanation = '', labels = null, originalStart = null) =>
  answers.map((answer, i) => ({
    id: start + i,
    section,
    type: 'text',
    answer,
    prompt: `${prompt} ${labels ? labels[i] : i + 1}.`,
    marks: .5,
    image,
    explanation,
    originalLabel: labels ? labels[i] : (originalStart || 1) + i
  }));
const choice = (id, section, answer, prompt, options, image, marks = 1, originalLabel = id) =>
  ({ id, section, type: 'choice', answer, prompt, options, image, marks, originalLabel });

const nonListeningQuestions = [
  ...textGroup(1, 'Reading comprehension', ['Richtig', 'Falsch', 'Falsch', 'Richtig', 'Falsch'], 'Read the mail and choose Richtig or Falsch for statement', 'W5Q3.png', '', [1, 2, 3, 4, 5]),
  ...[ 
    ['Fahren Sie zum Bahnhof', ['Zum Bahnhof fahren Sie', 'Sie fahren zum Bahnhof', 'Fahren Sie zum Bahnhof']],
    ['Besuchen Sie die Kunsthalle', ['die Kunsthalle besuchen Sie', 'Besuchen Sie die Kunsthalle', 'Sie besuchen die Kunsthalle']],
    ['Gehen Sie rechts, dann geradeaus', ['Sie gehen rechts, dann geradeaus', 'rechts dann geradeaus gehen Sie', 'Gehen Sie rechts, dann geradeaus']],
    ['Reisen Sie nach Berlin', ['Nach Berlin reisen Sie', 'Reisen Sie nach Berlin', 'Sie kaufen eine Fahrkarte']],
    ['Kaufen Sie eine Fahrkarte', ['Kaufen Sie eine Fahrkarte', 'Eine Fahrkarte kaufen Sie', 'Sie reisen nach Berlin']],
    ['Fragen Sie die Taxifahrerin', ['die Taxifahrerin fragen Sie', 'Fragen Sie die Taxifahrerin', 'Sie fragen die Taxifahrerin']]
  ].map((item, i) => choice(i + 6, 'Imperative sentences with Sie', item[0], `Write the imperative sentence for item ${i + 1}`, item[1], 'W5Q4.png')),
  ...textGroup(12, 'Verb conjugation', ['suche', ['fährt', 'faehrt'], 'kauft', 'Gehen', 'Spricht'], 'Conjugate the verb for item', 'W5Q5.png', 'Use the subject and sentence context to choose the correct verb form.').map(q => ({ ...q, answer: Array.isArray(q.answer) ? q.answer.join('/') : q.answer })),
  ...textGroup(17, 'Vocabulary word bank', ['hören/hoeren', 'Stadt', 'trinken', 'Doppelzimmer', 'Vorname', 'sitzen', 'lesen', 'spielen'], 'Complete word-bank item', 'W5Q6.png', 'Use each word from the box only once.'),
  ...textGroup(25, 'Modal verbs', ['wollen', 'wollt', 'müssen/muessen', 'Könnt/Koennt', 'will/kann', 'kann', 'kann/muss', 'muss', 'kann'], 'Write the full modal-verb form for item', 'W5Q7.png', 'Write the full word, not an abbreviation.').map(q => ({ ...q, marks: 1 })),
  ...textGroup(34, 'Modal verbs', ['muss', 'können/koennen', 'Willst', 'können/koennen'], 'Fill in the correct modal verb for item', 'W5Q8.png', '', [3, 4, 5, 6]),
  ...textGroup(38, 'Separable verbs', ['kommt', 'an', 'steigen', 'aus', 'gehen', 'weg', 'fährt/faehrt', 'ab', 'schaut', 'an', 'lade', 'ein', 'steht', 'auf', 'ruft', 'an'], 'Complete separable-verb blank', 'W5Q8.png', 'Keep the conjugated verb and prefix in the correct positions.', '', null, 1),
  ...textGroup(54, 'Verb selection', ['B', 'C', 'D', 'A'], 'Write the corresponding letter for item', 'W5Q10.png', 'Write only A, B, C, or D.', [3, 4, 5, 6]),
  ...textGroup(58, 'Akkusativ articles', ['die/den', 'die', 'die', 'das', 'den', 'das', 'die', 'das', 'den'], 'Fill in the correct accusative article for item', 'W5Q11.png', '', [2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ...textGroup(67, 'Akkusativ indefinite articles', ['eine', 'einen', 'ein', 'einen', 'ein', 'einen', 'ein', 'eine', 'Ein'], 'Fill in the correct indefinite article for item', 'W5Q12.png', '', [2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ...textGroup(76, 'mögen or möchten', ['mag', 'möchte/moechte', 'möchtest/moechtest', 'möchten/moechten', 'mögen/moegen'], 'Fill in the correct form for item', 'W5Q13.png', 'Choose the correct form of mögen or möchten.', '', [1, 2, 3, 4, 5]).map((q, i) => ({
    ...q,
    marks: 1,
    prompt: [
      'Ich ______________ Literatur.',
      'Paula _______________ einen neuen Laptop kaufen.',
      '_________________ du eine Tasse Kaffee?',
      'Wir _________________ heute Abend ins Kino gehen.',
      'Meine Eltern _______________ klassische Musik.'
    ][i]
  }))
];

nonListeningQuestions.slice(0, 5).forEach(q => { q.companionImage = 'W5Q3.1.png'; });
nonListeningQuestions[0].example = 'Example: 0. Falsch.';
nonListeningQuestions[5].example = 'Example: 0. b).';

const listeningAudio = 'https://drive.google.com/file/d/1EqB0RPwaMVSy1I1v1MaeZL8Z-y0g1a8q/view?usp=sharing';
const dialogueAudio = [
  'https://drive.google.com/file/d/1576-i4zgfW4-Z6XmwthlgKol3Bf_rVUz/view?usp=sharing',
  'https://drive.google.com/file/d/1vmKnKpeGk7Go8I7vRBfeWRJCbFShVvWr/view?usp=sharing',
  'https://drive.google.com/file/d/10A3PXO5iS2YCKjM2CwckOjAP8wIg0gX2/view?usp=sharing',
  'https://drive.google.com/file/d/1xSUSobrZ_UgVZgAJInZBl1s52pmoYUJy/view?usp=sharing',
  'https://drive.google.com/file/d/1Arb9uTIPptlO6p9TZ0tACf0JoxBefJ6J/view?usp=sharing'
];
const listeningQuestions = [
  ['a) 14:00', ['a) 14:00', 'b) 04:10'], '1'],
  ['b) 10:07', ['a) 06:50', 'b) 10:07'], '2'],
  ['b) 03:45', ['a) 04:15', 'b) 03:45'], '3'],
  ['a) 11:30', ['a) 11:30', 'b) 12:30'], '4'],
  ['a) 09:14', ['a) 09:14', 'b) 09:40'], '5']
].map(([answer, options, label], i) => ({
  id: i + 1,
  section: 'Listening: time',
  type: 'choice',
  answer,
  options,
  prompt: `Mark the correct time for item ${label}.`,
  instruction: 'Listen to the audio. What is the time? Mark a or b. Welche Uhrzeit hören Sie? a) oder b)?',
  image: 'W5Q1.png',
  audio: listeningAudio,
  marks: 1
})).concat([
  ['a', 1], ['c', 2], ['a', 3], ['b', 4], ['c', 5]
].map(([answer, label], i) => ({
  id: i + 6,
  section: 'Listening: dialogues',
  type: 'choice',
  answer,
  options: ['a', 'b', 'c'],
  prompt: `Listen to the dialogue and mark the correct timing for item ${label}.`,
  instruction: 'Listen to the dialogues and mark the correct timings. Example: 0. b).',
  image: 'W5Q2.png',
  audio: dialogueAudio[i],
  marks: 1
})));

const questions = [
  ...listeningQuestions,
  ...nonListeningQuestions.map(q => ({ ...q, id: q.id + 10 }))
];
