function handleButtonClick() {
    const inputBox = document.querySelector('.input-box');
    const userInput = inputBox.value;
    const shipNumber = parseInt(userInput);
    
    if (!isNaN(shipNumber) && shipNumber >= 10 && shipNumber <= 50) {
        window.location.href = `chat.html?number=${shipNumber}`;
    } else {
        alert('Invalid ship!');
    }
}