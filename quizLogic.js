
let quizQuestions = [];     // Array for displaying questions loaded from quizArray[]
let quizArray = [];         // Array holding the current quiz questions
let currentQuestionIndex = 0;
let question;
let options;
let correctAnswer;
let totalNumberOfQuestions = 0;
let totalQestion;
let remaningQuestion = quizQuestions.length;
let correctScore = 0;
let incorrectScore = 0;
let selectedOption = null;
let alertHeader = document.getElementById('alert');
let generatedNumbers = new Set();  // For generating random unique question indexes

let displayTotalQuestion = document.getElementById('totalQuestion');
let displayCorrectAnswer = document.getElementById('correctAnswer');
let displayIncorrectAnswer = document.getElementById('incorrectAnswer');
let displayRemaningQuestion = document.getElementById('remaningQuestion');

function displayStatusBar(){
  
    displayCorrectAnswer.textContent = `Correct Answer: ${correctScore}`;
    displayIncorrectAnswer.textContent = `Incorrect Answer: ${incorrectScore}`;
    displayRemaningQuestion.textContent = `Remaning Questions: ${remaningQuestion}`;   

}

// Retrieve the player's name from localStorage (saved from the previous page)
const playerName = localStorage.getItem('playerName');
const playerSpan = document.getElementById('playerName');

// Retrieve the selected subject from localStorage (saved from the previous page)
const selectedSubject = localStorage.getItem('selectedSubject');
const subjectSpan = document.getElementById('subjectDisplay');

let subjectToDisplay;

switch(selectedSubject){

    case "OperatingSystem":{
        subjectToDisplay = "Operating System";
        break;
    }
    case "LinearAlgebra":{
        subjectToDisplay = "Linear Algebra";
        break;
    }
    case "ProfessionalPractice":{
        subjectToDisplay = "Professional Practice";
        break;
    }
    case "WebDevelopement":{
        subjectToDisplay = "Web Developement";
        break;
    }
    case "communicationSkill":{
        subjectToDisplay = "Communication Skills";
        break;
    }
    
    default:{
        console.log("Invalid Subject");
    }
}

playerSpan.textContent = `Player Name : ${playerName}`;
subjectSpan.textContent = `Subject Name : ${subjectToDisplay}`;

// Reference to the quiz container
const quizContainer = document.querySelector('.quiz-container');

// Load the quiz based on the selected subject

LoadSubjectFromFile();
displayStatusBar();

// Event listener for the "Submit" button
document.querySelector('.submit-btn').addEventListener('click', checkAnswer);

// Function to load the quiz questions based on the subject
function LoadSubjectFromFile() {
    quizArray = [];  // Reset the quiz array for new loading

    // Fetch the corresponding quiz file based on the selected subject
    fetch(`${selectedSubject}.txt`)
        .then(response => response.text())
        .then(text => {
            quizQuestions = parseQuizQuestions(text);  // Parse quiz questions from file
            totalQestion = quizQuestions.length;
            remaningQuestion = quizQuestions.length-1;
            displayTotalQuestion.textContent = `Total Questions: ${totalQestion}`;
            displayRemaningQuestion.textContent = `Remaning Questions: ${remaningQuestion}`;
           
            // console.log("The Quiz questions are:");
            // console.log(JSON.stringify(quizArray, null, 2));

            correctScore = 0;
            incorrectScore = 0;
            selectedOption = null;
            quizContainer.style.display = 'block';  // Display quiz container
            displayQuestion();  // Show the first question
        })
        .catch(error => console.error("Error in getting the file: " + error));

    if (!selectedSubject) {
        quizContainer.style.display = 'none';  // Hide quiz container if no subject is selected
    }
}

// Function to parse quiz questions from the text file
function parseQuizQuestions(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // Parse each question and its options (assuming 3 lines per question)
    for (let i = 0; i < lines.length; i += 3) {
        let questionText = lines[i].trim();
        let options = lines[i + 1].split(',').map(option => option.trim());
        let correctAnswer = parseInt(lines[i + 2].trim());
        
        quizArray.push({
            question: questionText,
            options: options,
            correctAnswer: correctAnswer
        });
    }
    
    return quizArray;
}

// Function to generate a random number to select a question, ensuring no duplicates
function getRandomNumber() {
    if (generatedNumbers.size === 10) {
        console.log("All numbers have been generated now.");
        return null;
    }

    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 10);  // Generate a random number between 0-9
    } while (generatedNumbers.has(randomNumber));

    generatedNumbers.add(randomNumber);  // Track the generated number
    return randomNumber;
}

// Timer Logic 

let reverseSecond = 15;
let retakeQuiz;

function reverseTime(){
    let timeReverse = document.getElementById('reverseSecond');
    timeReverse.textContent = reverseSecond;
    reverseSecond--;
    
    if(reverseSecond<-1){
       clearInterval(intervalId); 
       retakeQuiz = confirm('The time is UP: Do you want to retake quiz');
       changeWindow();
    }
   
}
let intervalId = setInterval(reverseTime,1000);

function changeWindow(){
    if(retakeQuiz){
        window.location.href = 'quizRule.html';
    }
    else{
        window.location.href = 'index.html';
    }   
}


// Function to display a question along with its options
function displayQuestion() {
  
    const numberOfQuestion = document.getElementById('displayNumberOfQuestion');
    const questionToDisplay = document.querySelector('.question-display');
    const optionList = document.querySelector('.options');    

    currentQuestionIndex = getRandomNumber();  // Get a random question index

    numberOfQuestion.textContent = totalNumberOfQuestions + 1+" .";  // Update question number display
    questionToDisplay.textContent = quizQuestions[currentQuestionIndex].question;  // Display the question
    optionList.innerHTML = quizQuestions[currentQuestionIndex].options.map((option, index) => {
        return `<li><button class="option-btn" data-index=${index}>${option}</button></li>`;
    }).join("");  // Display the options as buttons

    setUserOptionIndex();   // Set up the event listener for selecting an option
}

// Function to handle user option selection and update the selectedOption variable
function setUserOptionIndex() {
    document.querySelectorAll('.option-btn').forEach(button => {
        // Add click event to each option button
        // console.log("The button is "+JSON.stringify(button, null, 2));
        button.addEventListener('click', function() {
           
            selectedOption = parseInt(this.getAttribute('data-index'));  // Store the selected option index
            console.log("selected option "+selectedOption);
           
        });
    });
}

// Function to check the user's answer and display the next question or result
function checkAnswer() {
    
    if (selectedOption === null) {
        alert("Please select an option first.");
        return;
    }
    
   
    console.log(alertHeader);
    
    const correctAnswerIndex = quizQuestions[currentQuestionIndex].correctAnswer;
  
   if(totalNumberOfQuestions < quizQuestions.length){

    if (selectedOption === correctAnswerIndex) {
        
        correctScore++;
        alertHeader.textContent = "Correct";
       
    } else {
       
        incorrectScore++;
        for(let i=0;i<quizQuestions[currentQuestionIndex].options.length;i++){
            if(i===correctAnswerIndex){
                alertHeader.textContent = `Incorrect: Correct Answer is: ${quizQuestions[currentQuestionIndex].options[i]}`;
                
                break;
            }
        }
        
    }
   }

    totalNumberOfQuestions++;  // Increment the question count
    remaningQuestion--;
    
       
      
    if (totalNumberOfQuestions < quizQuestions.length) {
        selectedOption = null;
        reverseSecond = 15; // Again set the time 15 seconds 
        displayStatusBar();      
        displayQuestion();  // Show the next question

    } else{
       // selectedOption = null;
       
        clearInterval(intervalId);  // Also stop the timer if not any question exists
        remaningQuestion = 0;
        displayStatusBar(); 
       console.log(document.getElementsByClassName('.submit-btn'));
       let submitButton = document.querySelector('.submit-btn');
       submitButton.textContent = 'Check Result';
       submitButton.addEventListener('click',SetUpResult);        
    
    }
}

function PrintSpace(){

    alertHeader.textContent = " ";

}

function SetUpResult(){
   
    localStorage.setItem('playerName',playerName);
    localStorage.setItem('subjectName',selectedSubject);
    localStorage.setItem('totalQuestions',totalQestion);
    localStorage.setItem('correctAnswer',correctScore);
    localStorage.setItem('incorrectAnswer',incorrectScore);

    window.location.href = "displayResult.html";
}
   