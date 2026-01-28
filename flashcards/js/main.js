// Gets the page "name" from the URL
const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get("page") || "home";
console.log(pageId)


async function loadJSONkey() {
    const response = await fetch("../json/pages.json");
    const data = await response.json();
    console.log(data);
    const jsonPageObject = data[pageId]
    console.log(jsonPageObject)
    return jsonPageObject
    
}

async function loadPartial(url, elementId) {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
}

async function renderFlashcardData() {
    const contentData = await loadJSONkey();
    console.log(contentData)
    document.title = contentData.title
    return contentData
}

async function renderPage() {
    const response = await fetch(`../pages/page.html`)
    const html = await response.text();
    return html
}

async function init() {
    try {
        await loadPartial("../templates/header.html", "header");
        await loadPartial("../templates/footer.html", "footer");

        const pageData = await renderPage();
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = pageData   
        
    } catch (err) {
        console.error("error", err);
    }
    const contentData = await renderFlashcardData();
    const flashcards = await (await fetch(contentData.dataFile)).json();
    // Now that data fetching is done, here's the actual JS functionality
    let card_answer
    let amount_correct = 0
    let amount_attempted= 0
    let new_card = true
    const correct_status = document.getElementById("amount_correct")
    correct_status.innerHTML = `${amount_correct}/${amount_attempted}`
    const answer_box = document.getElementById("answer_box");
    const display = document.getElementById("correct_incorrect")

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
    showrandomFlashcard();
}

init();