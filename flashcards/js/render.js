//Renders the flashcard HTML
async function renderPage() {
    const response = await fetch(`../pages/flashcard.html`)
    const html = await response.text();
    return html
}

async function loadPartial(url, elementId) {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
}

async function loadApp() {
    const script = document.createElement("script");
    script.src = `../js/flashcard.js`
    document.body.appendChild(script)
}

//Creating an init function to store data
async function init() {
    try {
        await loadPartial("../templates/header.html", "header");
        await loadPartial("../templates/footer.html", "footer");

        const pageData = await renderPage();
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = pageData;
        loadApp();
        
    } catch (err) {
        console.error("error", err);
    }
}

init()