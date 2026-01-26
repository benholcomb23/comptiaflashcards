
// This fetches JSON
async function loadJSON(path) {
    const res = fetch(path);
    return res.json();
}

// Gets the page from the URL
const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get("page") || "home";

// Load pages.json for metadata, 
const pages = loadJSON("/json/pages.json");
console.log(pages)
const pageData = pages[pageId];
console.log(pageData)
// using js object to set title of page
document.title = pageData.title;

// Load page content JSON
const contentData = loadJSON(pageData.dataFile);
let flashcards = []
let card_answer
let amount_correct = 0
let amount_attempted= 0
let new_card = true
const correct_status = document.getElementById("amount_correct")
correct_status.innerHTML = `${amount_correct}/${amount_attempted}`
const answer_box = document.getElementById("answer_box");
const display = document.getElementById("correct_incorrect")

fetch(contentData)
    console.log("okkkk we fetching something")
    .then(response => response.json())
    .then(data => {
        flashcards = data;
    showrandomFlashcard();
    })


function showrandomFlashcard() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    const card = flashcards[randomIndex];
    const flashcardDiv = document.getElementById("flashcard");
    card_answer = card.answer;
    console.log(card.answer)
    flashcardDiv.innerHTML = `
    <h2>${card.question}</h2>
    `;
    new_card = true;
    }

function submitAnswer() {
    const user_answer = answer_box.value;
    
    console.log("button pressed")
    console.log(user_answer)
    if (user_answer == card_answer) {
        amount_attempted ++;
        amount_correct ++;
        display.innerHTML = `<p>Correct!</p>`;
        correct_status.innerHTML =  `${amount_correct}/${amount_attempted}`
        answer_box.value = ``;

        setTimeout(() => {
            display.textContent = ``
            showrandomFlashcard();
        }, 1000);

    }
    else {
        if (new_card == true) {
            amount_attempted ++;
        }
        display.innerHTML = `
        <p>Incorrect!</p>
        `;
        correct_status.innerHTML =  `${amount_correct}/${amount_attempted}`
        new_card = false
    }
}

answer_box.addEventListener('keydown', (event) => {
    console.log("keydown is working")
    if (event.key === 'Enter') {
        event.preventDefault();

        const answer_box = document.getElementById("answer_box");
        user_answer = answer_box.value.trim();

        if (user_answer === "") {
            console.log("Error, you must enter something")
        }
        else{
            submitAnswer();
        }

    }
});