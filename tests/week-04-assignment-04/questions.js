const textGroup = (start, section, answers, prompt, image, explanation = '', labels = null) =>
  answers.map((answer, i) => ({ id: start + i, section, type: 'text', answer, prompt: `${prompt} ${labels ? labels[i] : i + 1}.`, marks: .5, image, explanation }));
const choice = (id, section, answer, prompt, options, image, marks = 1) =>
  ({ id, section, type: 'choice', answer, prompt, options, image, marks });
const select = (id, section, answer, prompt, options, image, marks = 1) =>
  ({ id, section, type: 'select', answer, prompt, options, image, marks });
const listening = (id, answer, prompt, image, audio) =>
  ({ id, section: 'Listening', type: 'text', answer, prompt, image, audio, marks: 1,
    instruction: id < 33
      ? 'Listen to the Information about phone numbers and write the numbers WITHOUT any spaces between the numbers.'
      : 'Listen to the audio and match the people with places, as shown in the example.' });

const questions = [
  ...textGroup(1, 'Personal information and vocabulary', ['Schurig', 'Köln/Koeln', 'Taxifahrerin', 'schwimmen/schwimmt'], 'Fill in the form. Write only one word for blank', 'W4Q1.png', 'Type the German word exactly as it appears in the form.', [1, 3, 4, 5]),
  ...textGroup(5, 'Verb conjugation', ['Bist', 'liest', 'Hast', 'arbeitet', 'reisen'], 'Write the correctly conjugated verb for item', 'W4Q2.png', 'German verbs change their ending to agree with the subject.'),
  ...textGroup(10, 'Matching', ['E', 'A', 'D', 'B', 'C'], 'Match item', 'W4Q3.png', '', [1, 2, 3, 4, 5]),
  ...textGroup(15, 'Verb selection', ['B', 'E', 'F', 'A', 'C', 'D'], 'Choose the appropriate verb for sentence', 'W4Q4.png', '', [1, 2, 3, 4, 5, 6]),
  ...textGroup(21, 'Hobbies and activities', ['lernt', 'fotografiert', 'singt', 'tanzen'], 'Write the correctly conjugated verb for item', 'W4Q5.png'),
  choice(25, 'Sentence ordering', 'bca', 'Bring the jumbled sentence in item 2 into proper order. The example is “bca”.', ['abc', 'cba', 'bca'], 'W4Q6.png'),
  choice(26, 'Sentence ordering', 'cba', 'Bring the jumbled sentence in item 3 into proper order.', ['cba', 'abc'], 'W4Q6.png'),
  listening(27, '68354817', 'Listen to the information and enter the number for item 1(A), without spaces.', 'W4Q7.1.png', 'https://drive.google.com/file/d/1Su4o1kWQY3PKBGl3SJ1Yw-SxqQWI39D9/view?usp=sharing'),
  listening(28, '264', 'Listen to the information and enter the number for item 2, without spaces.', 'W4Q7.1.png', 'https://drive.google.com/file/d/1Su4o1kWQY3PKBGl3SJ1Yw-SxqQWI39D9/view?usp=sharing'),
  listening(29, '5511428', 'Listen to the information and enter the number for item 3(A), without spaces.', 'W4Q7.1.png', 'https://drive.google.com/file/d/1Su4o1kWQY3PKBGl3SJ1Yw-SxqQWI39D9/view?usp=sharing'),
  listening(30, '354', 'Listen to the information and enter the number for item 3(B), without spaces.', 'W4Q7.1.png', 'https://drive.google.com/file/d/1Su4o1kWQY3PKBGl3SJ1Yw-SxqQWI39D9/view?usp=sharing'),
  listening(31, '1144809387', 'Listen to the information and enter the number for item 4(A), without spaces.', 'W4Q7.1.png', 'https://drive.google.com/file/d/1Su4o1kWQY3PKBGl3SJ1Yw-SxqQWI39D9/view?usp=sharing'),
  listening(32, '54', 'Listen to the information and enter the number for item 4(B), without spaces.', 'W4Q7.1.png', 'https://drive.google.com/file/d/1Su4o1kWQY3PKBGl3SJ1Yw-SxqQWI39D9/view?usp=sharing'),
  listening(33, 'E2e', 'Listen and match person 2 with the correct place. Enter the code in the form shown in the example.', 'W4Q8.png', 'https://drive.google.com/file/d/1YPV5XHhlfuMZuV41wsjnAARdhRt37nbj/view?usp=sharing'),
  listening(34, 'B3a', 'Listen and match person 3 with the correct place. Enter the code in the form shown in the example.', 'W4Q8.png', 'https://drive.google.com/file/d/1YPV5XHhlfuMZuV41wsjnAARdhRt37nbj/view?usp=sharing'),
  listening(35, 'D4b', 'Listen and match person 4 with the correct place. Enter the code in the form shown in the example.', 'W4Q8.png', 'https://drive.google.com/file/d/1YPV5XHhlfuMZuV41wsjnAARdhRt37nbj/view?usp=sharing'),
  listening(36, 'C5d', 'Listen and match person 5 with the correct place. Enter the code in the form shown in the example.', 'W4Q8.png', 'https://drive.google.com/file/d/1YPV5XHhlfuMZuV41wsjnAARdhRt37nbj/view?usp=sharing'),
  ...[
    ['koche', ['kocht', 'koche', 'kochen']], ['arbeite', ['arbeite', 'arbeitest', 'arbeitet']], ['spreche', ['spricht', 'spreche', 'sprechen']],
    ['wohnst', ['wohnt', 'wohnen', 'wohnst']], ['sprichst', ['sprichst', 'spreche', 'sprechen']], ['wohnen', ['wohnt', 'wohnen', 'wohnst']],
    ['spricht', ['spricht', 'spreche', 'sprechen']], ['wohnt', ['wohnt', 'wohnen', 'wohnst']], ['liest', ['Lest', 'liest', 'lesen']],
    ['sprechen', ['sprichst', 'spreche', 'sprechen']], ['Lest', ['Lest', 'liest', 'lesen']], ['wohnen', ['wohnt', 'wohnen', 'wohnst']], ['kochen', ['kocht', 'koche', 'kochen']]
  ].map((item, i) => select(i + 37, 'Regular verb conjugation', item[0], `Choose the correct conjugation for item ${i + 1}.`, item[1], 'W4Q9.png', .5)),
  select(50, 'Strong verbs', 'gebe-gibst-gibt-geben-gebt-geben', 'Choose the complete correct conjugation of geben.', ['gebe-gibst-gibt-geben-gebt-geben', 'gebst-gibt-gibe-geben-gebt-geben', 'gebe-gibst-gibt-geben-gebt-geben'], 'W4Q10.1.png'),
  select(51, 'Strong verbs', 'habe-hast-hat-haben-habt-haben', 'Choose the complete correct conjugation of haben.', ['habe-hast-hat-haben-habt-haben', 'habe-habst-habt-haben-habt-haben', 'habe-hast-hat-haben-hat-haben'], 'W4Q10.2.png'),
  select(52, 'Strong verbs', 'nehme-nimmst-nimmt-nehmen-nehmt-nehmen', 'Choose the complete correct conjugation of nehmen.', ['nehme-nihmst-nihmt-nehmen-nihmt-nehmen', 'nehme-nimmst-nimmt-nehmen-nehmt-nehmen', 'nehme-nihmst-nihmt-nehmen-nihmt-nehmen'], 'W4Q10.3.png'),
  select(53, 'Strong verbs', 'schlafe-schläfst-schläft-schlafen-schlaft-schlafen', 'Choose the complete correct conjugation of schlafen.', ['schlafe-schläfst-schläft-schlafen-schlaft-schlafen', 'schlafe-schliefst-schlieft-schlafen-schlaft-schlafen', 'schlafe-schlafst-schlaft-schlafen-schläft-schlafen'], 'W4Q10.4.png'),
  ...textGroup(54, 'Possessive pronouns', ['seine', 'euer', 'meine', 'ihr', 'unsere'], 'Fill in the possessive pronoun for sentence', 'W4Q11.png', 'Possessive pronouns take endings that agree with the noun.').map((q, i) => ({ ...q, marks: 1 })),
  ...textGroup(59, 'Vocabulary categorisation', ['b', 'e', 'a', 'g', 'c', 'd', 'h', 'f'], 'Place word in the correct row; enter its letter for item', 'W4Q12.png'),
  ...textGroup(67, 'Sentence matching', ['g', 'b', 'e', 'c', 'd', 'a'], 'Match column item with the corresponding letter for item', 'W4Q13.png'),
  ...textGroup(73, 'Word-bank completion', ['hoch', 'gibt', 'fahren', 'Park', 'Filme'], 'Complete word-bank blank', 'W4Q14.png').map(q => ({ ...q, marks: 1 })),
  ...textGroup(78, 'Reading comprehension', ['d', 'e', 'c', 'a'], 'Read the text and enter the section containing the answer to question', 'W4Q15.png', 'Look for the meaning in the reading text, not just an identical word.').map(q => ({ ...q, marks: 1 })),
  ...[
    ['der Staubsauger', ['der Teppich', 'der Staubsauger', 'die Stehlampe']], ['der Fernseher', ['das Radio', 'der Fernseher', 'die Stehlampe']],
    ['das Radio', ['die Stehlampe', 'die Kaffeemaschine', 'das Radio']], ['die Kaffeemaschine', ['die Kaffeemaschine', 'der Teppich', 'der Stuhl']],
    ['der Teppich', ['der Teppich', 'die Stehlampe', 'der Kühlschrank']], ['die Stehlampe', ['der Fernseher', 'der Stuhl', 'die Stehlampe']],
    ['der Stuhl', ['der Staubsauger', 'der Stuhl', 'der Teppich']]
  ].map((item, i) => select(i + 82, 'Household devices and objects', item[0], `Which device or object does what in item ${i + 1}?`, item[1], 'W4Q16.png'))
];
