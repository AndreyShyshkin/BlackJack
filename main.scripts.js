let startBtn = document.querySelector("#start"); 
let hiddenCard = document.querySelector("#hidden");
let hit = document.querySelector("#hit");
let stay = document.querySelector("#stay");
let double = document.querySelector("#double");
let dealer = document.querySelector(".dealer");
let player = document.querySelector(".player");

let betBtn = document.getElementById("betBtn");
let newBet = document.getElementById("newBet");



let betNum = 0;
balance = 1000;


let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;

let canHit = true;


window.onload = function(){
    startBtn.disabled = true;
}

    document.getElementById("10bet").onclick = function(){
        bet.innerHTML = 10
        betNum = 10;
        startBtn.disabled = false;
    }
    document.getElementById("20bet").onclick = function(){
        bet.innerHTML = 20
        betNum = 20;
        startBtn.disabled = false;
    }
    document.getElementById("50bet").onclick = function(){
        bet.innerHTML = 50
        betNum = 50;
        startBtn.disabled = false;
    }
    document.getElementById("100bet").onclick = function(){
        bet.innerHTML = 100
        betNum = 100;
        startBtn.disabled = false;
    }

player.style.display = "none";
dealer.style.display = "none";
hit.style.display = "none";
stay.style.display = "none";
double.style.display = "none";
newBet.style.display = "none";


startBtn.onclick = function () {
        buildDeck();
        startGame();
        betBtn.style.display = "none";
        startBtn.style.display = "none";
        hit.style.display = "inline-block";
        stay.style.display = "inline-block";
        double.style.display = "inline-block";
        player.style.display = "inline-block";
        dealer.style.display = "inline-block";
}   

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }

    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let cardImg = document.createElement("img");
    let card = deck.pop();
    hiddenCard.style.display = "inline-block";  
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
}

hit.onclick = function () {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { 
        hit.disabled = true;
    }

}

double.onclick = function () {
    betNum = betNum * 2;
    bet.innerHTML = betNum
    double.disabled = true;
    hit.disabled = true;   
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
}

stay.onclick = function () {
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        console.dir(card)
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    hiddenCard.src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        balance -= betNum;
    }
    else if (dealerSum > 21) {
        message = "You win!";
        balance += betNum;
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
        balance += betNum;
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
        balance -= betNum;
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
    document.getElementById("balance").innerText = balance;
    newBet.style.display = "inline-block";
    hit.style.display = "none";
    stay.style.display = "none";
    double.style.display = "none";
    newBet.onclick = function(){ newBetFun() }
}

function newBetFun() {
    player.style.display = "none";
    dealer.style.display = "none";
    newBet.style.display = "none";

    betBtn.style.display = "inline-block";
    startBtn.style.display = "inline-block"; 

    document.getElementById("results").innerText = "";
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("your-sum").innerText = "";

    hit.disabled = false;
    stay.disabled = false;
    double.disabled = false;
    startBtn.disabled = true;

    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0; 
    bet.innerHTML = 0

    hidden;
    deck;

    canHit = true;



    let yourCardsDiv = document.getElementById("your-cards");
    while (yourCardsDiv.firstChild) {
        yourCardsDiv.removeChild(yourCardsDiv.firstChild);
    }

    let dealerCardsDiv = document.getElementById("dealer-cards");
    let childNodes = dealerCardsDiv.childNodes;

    for (var i = childNodes.length - 1; i >= 0; i--) {
        var childNode = childNodes[i];
        if (childNode.nodeName === "IMG" && childNode.id !== "hidden") {
            dealerCardsDiv.removeChild(childNode);
        }
    }

    document.getElementById("hidden").src = "./cards/BACK.png";
    document.getElementById("hidden").style.display = "none";
}
function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}