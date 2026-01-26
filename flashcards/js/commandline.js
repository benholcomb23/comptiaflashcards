let flashcards = []
let card_answer
let amount_correct = 0
let amount_attempted= 0
let new_card = true
const correct_status = document.getElementById("amount_correct")
correct_status.innerHTML = `${amount_correct}/${amount_attempted}`
const answer_box = document.getElementById("answer_box");
const display = document.getElementById("correct_incorrect")

fetch("commandline.json")
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