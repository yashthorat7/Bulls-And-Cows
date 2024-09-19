window.onload = initializePage;

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const shipNumber = urlParams.get('number');
    const descriptionElement = document.querySelector('.ship-number');
    if (descriptionElement && shipNumber) {
        descriptionElement.textContent = `SHIP ${shipNumber}`;
    }
}

function onClick() {
    document.getElementById("overlay").style.display = "flex";
}