let questions = [
    {
        num: 1,
        question: "What does URL stand for?",
        answer: "Uniform Resource Locator",
        options:["Universal Resource Link", "Uniform Resource Locator", "University Research Land", "Universal Rescue Limited"]
    },
    {
        num: 2,
        question: "What's JavaScript?",
        answer: "It's a scripting language.",
        options:["It's a type of coffee.", "It's a supercomputer.", "It's a scripting language.", "It's an island."]
    },
    {
        num: 3,
        question: "How to remove elements in an array?",
        answer: "Slice",
        options:["Slice", "Reduce", "Remove", "Subtract"]
    },
    {
        num: 4,
        question: "What does DOM stand for in HTML?",
        answer: "Document Object Model",
        options:["Domain", "Documented Object Method", "Decentralised Object Machine", "Document Object Model"]
    },
    {
        num: 5,
        question: "Where to insert a JavaScript in HTML?",
        answer: "The 'body' section",
        options:["The 'head' or the 'body' section", "The 'head' section", "The 'body' section", "The 'footer' section"]
    },
    {
        num: 6,
        question: "How do you call a function named 'fn()'?",
        answer: "fn()",
        options:["call fn()", "call function fn()", "fn()", "execute fn()"]
    },
    {
        num: 7,
        question: "What is 'this' within an Object?",
        answer: "The Object",
        options:["The JavaScript", "The browser", "The Object", "A variable"]
    },
    {
        num: 8,
        question: "Which one is NOT a type of event?",
        answer: "buttonpressed",
        options:["click", "mouseover", "keydown", "buttonpressed"]
    },
    {
        num: 9,
        question: "Which windows command allows user input?",
        answer: "prompt",
        options:["prompt", "confirm", "message", "alert"]
    },
    {
        num: 10,
        question: "What is the number of the Universe?",
        answer: "42",
        options:["0", "84320843", "42", "Infinity"]
    },
]

const button = document.querySelector('.start-button');
const reset = document.querySelector('.reset-button');
const timer = document.querySelector('.timer-count');
const win = document.querySelector('.correct');
const lose = document.querySelector('.incorrect');
const query_text = document.querySelector(".query_text");
const option_list = document.querySelector(".option_list");

let time = 0;
let index = 0;
let correct = 0;
let incorrect = 0;
const penalty = 15;
let localArray = [];

let record = {
    initial: '',
    score: ''
};

function game(index) {
    query_text.innerHTML = '';
    option_list.innerHTML = '';
    let userAns = '';
    let correctAns = '';

    let que_tag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
    let option_index = '<button class="option"><span>' + questions[index].options[0] + '</span></button>' 
    + '<button class="option"><span>' + questions[index].options[1] + '</span></button>'
    + '<button class="option"><span>' + questions[index].options[2] + '</span></button>'
    + '<button class="option"><span>' + questions[index].options[3] + '</span></button>';
    
    query_text.innerHTML = que_tag;
    option_list.innerHTML = option_index;

    option_list.addEventListener("click", function(event) {
        userAns = event.target.textContent;
        correctAns = questions[index].answer;
        /*console.log(userAns);
        console.log(correctAns);*/
        if((userAns === correctAns) && (userAns != null) && (correctAns != null)) {
            correct ++;
            win.innerHTML = correct;
        } else if ((userAns != correctAns) && (userAns != null) && (correctAns != null)) {
            incorrect ++;
            lose.innerHTML = incorrect;
            if (time > 15) {
                time = time - penalty;
            }
        } else {
            alert("Ooops! Something wrong. Please press 'Reset' button.");
            return;
        }
        if (index < questions.length-1) {
            index ++;
            game(index);
        } else {
            time = 0;
        }
    }, {once: true}); 
}

function setTime() {
    var timerInterval = setInterval(function() {
        time--;
        timer.textContent = time;

        /* clear time and store records in local storage. */
        if(time == 0 || time < 0) {
            clearInterval(timerInterval);
            button.disabled = true;
            /*console.log(button);*/
            timer.textContent = 0;
            let person = prompt("Please enter your initials.");
            record.initial = person;
            record.score = win.textContent;
            /*console.log(record);*/
            localRecord = JSON.parse(localStorage.getItem("storedRecord"));
            /*console.log(localRecord);*/

            if (localRecord == null) {
                localArray = [record];
            } else {
                localArray = localRecord;
                localArray.push(record);
            }
            /*console.log(localArray);*/

            localStorage.setItem("storedRecord", JSON.stringify(localArray));
            alert("Press 'Reset' button to play again.");
        } 
    }, 1000);
}

/* start the application by pressing the 'Start' button.*/
button.addEventListener("click", function(event) {
    const element = event.target;
    if (element.matches("button") === true) {
        time = 100;
        setTime()
        game(index);
    }
});

/* reload the application by pressing the 'Reset' button. */
reset.addEventListener("click", function(event) {
    const element = event.target;
    if (element.matches("button") === true) {
        button.disabled = false;
        window.location.reload();
    }
});