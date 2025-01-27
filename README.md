# Quiz App

This project is a Quiz App implemented using HTML, CSS, and JavaScript. It stores quizzes in text files for specific subjects and includes a timer for each question. If the user does not select an option within the time limit, the quiz ends, and the user needs to retake it. The result and pass/fail status are displayed at the end of the quiz.

## Features
- Quizzes on various subjects: Linear Algebra, Communication Skills, Operating Systems, Web Design and Development, Professional Practice
- Timer of 15 seconds per question
- Automatic quiz end if no option is selected within the time limit
- Display of results and pass/fail status at the end of the quiz

## Files
- `index.html`: The main HTML file for the app
- `style.css`: The CSS file for styling the app
- `script.js`: The JavaScript file containing the logic for the quiz
- `linear_algebra.txt`: Text file containing questions for Linear Algebra
- `communication_skills.txt`: Text file containing questions for Communication Skills
- `operating_systems.txt`: Text file containing questions for Operating Systems
- `web_design_development.txt`: Text file containing questions for Web Design and Development
- `professional_practice.txt`: Text file containing questions for Professional Practice

## HTML Structure
The `index.html` file contains the structure of the quiz app, including:
- A section for the quiz title
- A section for the question and options
- A timer display
- A results display

## CSS Styling
The `style.css` file defines the styles for the quiz app, including:
- Layout and positioning of elements
- Styling for the question and options
- Styling for the timer and results display

## JavaScript Logic
The `script.js` file contains the logic for the quiz app, including:
- Loading questions from text files
- Displaying questions and options
- Implementing the 15-second timer
- Ending the quiz if no option is selected within the time limit
- Calculating and displaying the results and pass/fail status

## Usage
1. Clone the repository:
2. Navigate to the project directory:

3. Open `index.html` in a web browser to start the quiz.

## Example
```javascript
// Sample code for loading questions from a text file and starting the timer
function loadQuestions(subject) {
 // Fetch questions from the corresponding text file
 fetch(`${subject}.txt`)
     .then(response => response.text())
     .then(data => {
         const questions = parseQuestions(data);
         startQuiz(questions);
     });
}

function startQuiz(questions) {
 let currentQuestionIndex = 0;
 let timer = 15;

 function showQuestion() {
     if (currentQuestionIndex >= questions.length) {
         endQuiz();
         return;
     }

     const question = questions[currentQuestionIndex];
     displayQuestion(question);

     const interval = setInterval(() => {
         timer--;
         updateTimerDisplay(timer);
         if (timer === 0) {
             clearInterval(interval);
             endQuiz();
         }
     }, 1000);
 }

 function endQuiz() {
     displayResults();
 }

 showQuestion();
}

