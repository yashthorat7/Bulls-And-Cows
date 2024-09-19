const dialogues = [
    'aye stinky pirates!',
    'it\'s a compliment to us',
    'welcome to the UCHIHA ISLAND',
    'thanks mate... now give me the treasure ⚔️',
    'woah woah woah... hold your swords',
    'you talk like your mom',
    'i only have a piece of the treasure',
    'i will take that',
    'it\'s in the unbreakable suitecase... and I forgot the pincode',
    'ha! you forgot it for the plot... didn\'t ya?',
    'No',
    'aah... whatever! I want to touch your unbreakable case'
];

let messageIndex = 0;
let messageToggle = true;
let borderToggle = true;
const images = ['assets/enemy.png', 'assets/us.png'];

window.onload = initializePage;

function initializePage() {
    addColorDiv();
    const urlParams = new URLSearchParams(window.location.search);
    const shipNumber = urlParams.get('number');
    const descriptionElement = document.querySelector('.text-box');
    if (descriptionElement && shipNumber) {
        descriptionElement.textContent = `SHIP ${shipNumber}`;
    }
};

function addColorDiv() {
    if (messageIndex >= dialogues.length) {
        const urlParams = new URLSearchParams(window.location.search);
        const shipNumber = urlParams.get('number');
        window.location.href = `puzzle1.html?number=${shipNumber}`;
        return;
    }

    const topSection = document.getElementById('topSection');
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';

    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.style.backgroundImage = `url('${images[messageToggle ? 0 : 1]}')`;

    const newDiv = document.createElement('div');
    newDiv.className = 'message-box ' + (borderToggle ? 'blue-border' : 'yellow-border');
    newDiv.textContent = dialogues[messageIndex];

    if (messageToggle) {
        chatContainer.appendChild(photo);
        chatContainer.appendChild(newDiv);
    } else {
        chatContainer.appendChild(newDiv);
        chatContainer.appendChild(photo);
    }

    topSection.appendChild(chatContainer);
    messageToggle = !messageToggle;
    borderToggle = !borderToggle;
    messageIndex++;
    topSection.scrollTop = topSection.scrollHeight;
}
