# German I Assignment Practice

Website: [https://avishkar-rawal.github.io/German_practice/](https://avishkar-rawal.github.io/German_practice/)

## What this website is

This is a small, unofficial study tool for practising questions from past German I assignments.

It lets a learner:

- choose an available assignment;
- answer questions on a continuous scrollable page;
- use Exam Mode or Practice Mode;
- use the question navigator to jump to a question;
- save answers in the browser;
- receive a score after submitting; and
- review answers while studying.

The website is for personal learning and revision. It is not an official examination, course page, answer-submission system, or replacement for the original course.

## Important notice

- This project is not affiliated with, sponsored by, or endorsed by NPTEL, SWAYAM, or any course provider.
- The assignments are from past course material and are presented here only as a practice interface.
- The project does not claim ownership of third-party questions, images, audio, names, or trademarks.
- Original content remains with its respective copyright owners.
- The site does not collect registrations, passwords, payment details, or personal information.
- Answers and progress are stored only in the visitor's own browser using local storage.
- Audio links, where shown, go to third-party public URLs. The audio is not hosted by this project.
- Questions, answers, marks, and images may contain mistakes. Always use the official course source for authoritative information.

If you own content shown here and would like it corrected or removed, please contact the repository owner through the GitHub repository. A removal or correction request will be reviewed promptly.

## How to use it

1. Open the website.
2. Choose an available week and assignment.
3. Select **Exam Mode** to complete the test before seeing feedback.
4. Select **Practice Mode** to receive feedback after trying a question.
5. Scroll through the assignment, or use the question navigator to jump to a question.
6. Select **Start over** if you want to remove all saved answers and begin again. The site asks for confirmation first.
7. Submit the assignment when you are finished.

## Run it on your computer

This is a static website. It uses plain HTML, CSS, and JavaScript. It does not require React, a database, or a server.

Open the root `index.html` file in a browser, or serve the folder with any local static web server.

## Project structure

```text
index.html                         Assignment-selection page
landing.css                        Landing-page styles
tests/week-04-assignment-04/       Week 4 practice test
  index.html                        Test page
  questions.js                      Question data
  script.js                         Quiz behaviour
  style.css                         Test styles
  assets/                           Local question images
.github/workflows/deploy.yml        GitHub Pages deployment
```

Future assignments can be added in separate folders under `tests/`.

## GitHub Pages

The included GitHub Actions workflow publishes the repository as a static GitHub Pages site. After pushing changes to the main branch, GitHub can deploy the updated files automatically.

This project is intended to remain a simple educational practice website, not a redistribution service or an official course platform.
