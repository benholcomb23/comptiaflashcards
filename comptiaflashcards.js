let flashcards = []
let card_answer
const answer_box = document.getElementById("answer_box");
const display = document.getElementById("correct_incorrect")

fetch("command_flashcards.json")
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
    }

function submitAnswer() {
    const user_answer = answer_box.value;
    
    console.log("button pressed")
    console.log(user_answer)
    if (user_answer == card_answer) {
        display.innerHTML = `<p>Correct!</p>`;
        answer_box.value = ``;

        setTimeout(() => {
            display.textContent = ``
            showrandomFlashcard();
        }, 1000);

    }
    else {
        console.log("user answer incorrect")
        display.innerHTML = `
        <p>Incorrect!</p>
        `;
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