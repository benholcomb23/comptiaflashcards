//Setting some globals, yay
let card_answer
let amount_correct = 0
let amount_attempted= 0
let new_card = true
const correct_status = document.getElementById("amount_correct")
correct_status.innerHTML = `${amount_correct}/${amount_attempted}`
const answer_box = document.getElementById("answer_box");
const display = document.getElementById("correct_incorrect");

//Getting the page id from the URL
const urlParams = new URLSearchParams(window.location.search);
const pageID = urlParams.get("page") || "home";

//Loads JSON key with JSON index of all data
async function loadDataIndex() {
    const response = await fetch("../json/pages.json");
    const data = await response.json();
    const IndexObject = data[pageID]
    return IndexObject
}

//This gets the actual JSON object info, such as title and location, but not the data from the eventual JSON
async function renderFlashcardData(FLASHCARD_OBJECT) {
    const card_JSON = await FLASHCARD_OBJECT;
    document.title = card_JSON.title
    return card_JSON
}

//This chooses a random card from array "Flashcards" and changes the HTML in flashcard.html
function showrandomFlashcard(flashcards) {
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

function submitAnswer(flashcards) {
    this.preventDefault;
    const user_answer = answer_box.value;
    if (user_answer == card_answer) {
        amount_attempted ++;
        amount_correct ++;
        display.innerHTML = `<p>Correct!</p>`;
        correct_status.innerHTML =  `${amount_correct}/${amount_attempted}`
        answer_box.value = ``;

        setTimeout(() => {
            display.textContent = ``
            
        }, 1000);
        showrandomFlashcard(flashcards);
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

//Creating an init function to handle async promises
async function init() {
    try {
        const jsonKey = await loadDataIndex()
        const targetCard = await renderFlashcardData(jsonKey)
        const flashcards = await (await fetch(targetCard.dataFile)).json();
        showrandomFlashcard(flashcards);

        //Submit Button Event Listener
        const submit_button = document.querySelector("#submit_answer_button")
        submit_button.addEventListener("click", () => submitAnswer(flashcards))

        //Enter Event Listener for Submit Button
        answer_box.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
    
                const answer_box = document.getElementById("answer_box");
                user_answer = answer_box.value.trim();
    
                if (user_answer === "") {
                    console.log("Error, you must enter something")
                }
                else{
                    submitAnswer(flashcards);
                }
    
            }
            
            });

            //New Question Event Listener
            const newQ_button = document.querySelector("#get_flashcard_button")
            newQ_button.addEventListener("click", () => showrandomFlashcard(flashcards))
    }
    catch {
        console.error("An error occured", error);
    }
}

document.addEventListener("DOMContentLoaded", init());