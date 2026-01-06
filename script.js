const card = document.querySelectorAll(".card");
let selectedCard = null;
let isConfirmed = false;
const modal = document.getElementById("modal");
const question = document.getElementById("question");
const yesBtn = document.getElementById("ya");
const noBtn = document.getElementById("batal");
const notif = document.getElementById("notif");
const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");
const back3 = document.getElementById("back3");

card.forEach(function(card) {
  card.addEventListener("click", function() {
    if (isConfirmed)return;
    selectedCard = card;
    modal.style.display = "flex";
    question.textContent = `Anda yakin ingin memilih kartu ke ${card.id.replace("card", "")}?`
  });
});

noBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

modal.addEventListener("click", function() {
  modal.style.display = "none";
});

yesBtn.addEventListener("click", function() {
  modal.style.display = "none";
  isConfirmed = true;
  if (!selectedCard) return;
  const cardId = selectedCard.id;
  localStorage.setItem("selectedCard", cardId);
  flipCard();
  selectedCard.style.background = "#00ff00";
  showNotif(cardId);
});

function flipCard() {
  card.forEach(function(card) {
    card.classList.add("flipped");
  });
}

function showNotif(cardId) {
  if (!cardId) return;
  switch(cardId) {
    case "card1":
      notif.textContent = "Selamat, Kamu mendapatkan hadiah BONUS DEPOSIT 10% dari Kartu 1.";
      back1.textContent = "DANA KAGET 10%";
      back2.textContent = "BONUS NEW MEMBER 100%";
      back3.textContent = "SALDO DANA 50 RIBU";
      break;
    case "card2":
      notif.textContent = "Selamat, Kamu mendapatkan hadiah BONUS DEPOSIT 10% dari Kartu 2.";
      back1.textContent = "DANA KAGET 50 RIBU";
      back2.textContent = "BONUS DEPOSIT 10%";
      back3.textContent = "BONUS NEW MEMBER 100%";
      break;
    case "card3":
      notif.textContent = "Selamat, Kamu mendapatkan hadiah BONUS DEPOSIT 10% dari Kartu 3.";
      back1.textContent = "BONUS NEW MEMBER 100%";
      back2.textContent = "DANA KAGET 50 RIBU";
      back3.textContent = "BONUS DEPOSIT 10%";
      break;
  }
}

window.addEventListener("DOMContentLoaded", function() {
  const savedCard = localStorage.getItem("selectedCard");
  const savedCardEl = document.getElementById(savedCard);
  if(savedCard) {
    flipCard();
    showNotif(savedCard);
    savedCardEl.style.background = "#00ff00";
    isConfirmed = true;
  }
});

const winner = document.getElementById("winner");
const prizes = [
  { text: "BONUS DEPOSIT 10%", chance: 75 },
  { text: "BONUS NEW MEMBER 100%", chance: 20 },
  { text: "DANA KAGET 50 RIBU", chance: 5}
];

function getRandomPrize() {
  const rand = Math.random()* 100;
  let cumulative = 0;
  
  for (const prize of prizes) {
    cumulative += prize.chance;
    if (rand < cumulative) {
      return prize.text;
    }
  }
}

function randomUserId() {
  const names = ["andi", "budi", "rina", "siti", "agus"];
  const name = names[Math.floor(Math.random() * names.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return name.slice(0, 2) + "***" + num;
}

setInterval(function() {
  const prize = getRandomPrize();
  const userId = randomUserId();
  winner.textContent = `USER ${userId} Baru Saja Mendapatkan ${prize}`;
}, 5000);
