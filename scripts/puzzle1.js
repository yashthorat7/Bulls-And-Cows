let generatedNumber = generateRandomNumber();
let guessedNumbers = new Set();
let isFirstGuess = true;
const presetMessages = [
    "don't u want to make your parents proud?",
    "don't give up! keep trying",
    "you are progressing... just backwards",
    "you can also scroll the upper part",
    "take hints from the previous guesses",
    "you can also click on the numbers to change them",
    "...(speechless)"
];
window.onload = initializePage;

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const shipNumber = urlParams.get('number');
    const descriptionElement = document.querySelector('.button-description');
    if (descriptionElement && shipNumber) {
        descriptionElement.textContent = `SHIP ${shipNumber}`;
    }
}

function handleRestart() {
    location.reload();
}

function changeNumber(rectId, change) {
    const digitElement = document.getElementById(`digit-${rectId}`);
    const currentValue = parseInt(digitElement.textContent);
    const newValue = (currentValue + change + 10) % 10;
    digitElement.textContent = newValue;
}

function generateRandomNumber() {
    let digits = '0123456789';
    let result = '';
    while (result.length < 4) {
        let randomIndex = Math.floor(Math.random() * digits.length);
        let digit = digits[randomIndex];
        if (!result.includes(digit)) {
            result += digit;
        }
    }
    return result;
}

function getGuessedNumber() {
    return Array.from({ length: 4 }, (_, i) => document.getElementById(`digit-${i + 1}`).textContent).join('');
}

function showMessage(message, color = '#5d95df', fontSize = '3.8vw', fontWeight = 'bold') {
    const messageBox = document.querySelector('.message-box');
    messageBox.textContent = message;
    messageBox.style.color = color;
    messageBox.style.fontSize = fontSize;
    messageBox.style.fontWeight = fontWeight;
}

function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * presetMessages.length);
    showMessage(presetMessages[randomIndex]);
}

function handleGoButtonClick() {
    const guessedNumber = getGuessedNumber();
    if (guessedNumbers.has(guessedNumber)) {
        showMessage("this number was already guessed", '#ff5252');
        return;
    }
    if (new Set(guessedNumber).size !== guessedNumber.length) {
        showMessage("no repetition allowed", '#ff5252');
        return;
    }
    if (isFirstGuess) {
        document.querySelector('.log-box').innerHTML = '';
        isFirstGuess = false;
    }
    guessedNumbers.add(guessedNumber);
    compareNumbers(guessedNumber);
}

function compareNumbers(guessedNumber) {
    let bulls = 0, cows = 0;
    for (let i = 0; i < 4; i++) {
        if (guessedNumber[i] === generatedNumber[i]) {
            bulls++;
        } else if (generatedNumber.includes(guessedNumber[i])) {
            cows++;
        }
    }
    
    if (bulls + cows === 4 && bulls !== 4) {
        showMessage("you found the right nos... now just rearrange them");
        logResult(guessedNumber, bulls, cows);
    } else if (bulls === 4) {
        showMessage("UNLOCKED!", '#28a745', '6vw');
        triggerUnlock();
    } else {
        logResult(guessedNumber, bulls, cows);
        showRandomMessage();
    }
    console.log(`Generated No: ${generatedNumber}`);
}

function triggerUnlock() {
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    confetti({
        particleCount: 100,
        spread: 30,
        startVelocity: 90,
        angle: 90,
        scalar: 1,
        gravity: 5,
        origin: { y: 0.9 },
        tick: 2000,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const shipNumber = urlParams.get('number');
    setTimeout(() => window.location.href = `clue.html?number=${shipNumber}`, 2000);
}

function logResult(guessedNumber, bulls, cows) {
    const logBox = document.querySelector('.log-box');
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry');
    const guessedNumberEl = document.createElement('span');
    guessedNumberEl.classList.add('guessed-number');
    guessedNumberEl.textContent = guessedNumber;
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    const bullsEl = document.createElement('p');
    const cowsEl = document.createElement('p');

    if (bulls > 0) {
        bullsEl.innerHTML = `<span class="highlight">${bulls}</span> right no at right place`;
        bullsEl.style.color = '#6eea54';
    }

    if (cows > 0) {
        cowsEl.innerHTML = `<span class="highlight">${cows}</span> right no at wrong place`;
        cowsEl.style.color = '#ead656';   //#FF6F91
    } else if (bulls === 0 && cows === 0) {
        cowsEl.innerHTML = 'No number is right';
        cowsEl.style.color = '#FF6F91';
    }
    
    resultContainer.appendChild(bullsEl);
    if (cowsEl.innerHTML !== '') resultContainer.appendChild(cowsEl);
    logEntry.appendChild(guessedNumberEl);
    logEntry.appendChild(resultContainer);
    logBox.appendChild(logEntry);
    logBox.scrollTop = logBox.scrollHeight;
}
