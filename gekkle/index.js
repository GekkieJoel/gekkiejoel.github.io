let sumbit = document.getElementById("submit-button");

let guesses = 1;
let guess1 = "⬜"
let guess2 = "⬜"
let guess3 = "⬜"
let guess4 = "⬜"

let final_guess = document.getElementById("final-guess");

let players = ["mechmanner","joellizzy","atheron","joa04","UbelsFamilie","nijnt","serprogame","floriandemol","daniSou1"];

let randomPlayer = players[Math.floor(Math.random() * players.length)];

let title = document.getElementById("info");
let endscreen = document.getElementById("endscreen");

let copyable = document.getElementById("copyable");

const dailyPuzzles = [
  {player: "serprogame"},
  {player: "UbelsFamilie"},
  {player: "mechmanner"},
  {player: "nijnt"},
  {player: "joa04"},
  {player: "atheron"},
  {player: "Bloeminpot0_0"},
  {player: "daniSou1"},
  {player: "floriandemol"},
  {player: "joellizzy"},
  {player: "joa04"},
  {player: "mechmanner"},
  {player: "serprogame"},
  {player: "Bloeminpot0_0"},
  {player: "UbelsFamilie"},
  {player: "joellizzy"}
];

const player_info = {
  mechmanner: ["gekkies1","gekkies2","gekkies3","gekkies4","gekkies5","gekkiesHardcore","skygekkies5","creategekkies2025"],
  joellizzy: ["gekkies1","gekkies2","gekkies3","gekkies4","gekkies5","gekkiesHardcore","creategekkies2025"],
  atheron: ["gekkies1","gekkies2","gekkies3","gekkies4","gekkies5","gekkiesHardcore","skygekkies5"],
  joa04: ["gekkies1","gekkies2","gekkies3","gekkies4","gekkies5"],
  UbelsFamilie: ["gekkies4"],
  nijnt: ["gekkies4","gekkies5","creategekkies2025"],
  serprogame: ["gekkies1","gekkies2","gekkies3","gekkies5"],
  floriandemol: ["gekkies3","gekkies5"],
  daniSou1: ["gekkies1","gekkies2","gekkies3"],
  Bloeminpot0_0: ["gekkies5"]
}

// Helper: get consistent game day string for puzzle & localStorage
function getTodayString() {
  const startDate = new Date("2025-06-21"); // fixed “day 0”
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const gameDate = new Date(startDate);
  gameDate.setDate(startDate.getDate() + diffDays);
  
  return gameDate.toISOString().slice(0, 10);
}

function getTodayIndex() {
  const startDate = new Date("2025-06-21"); // fixed “day 0”
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays % dailyPuzzles.length;
}

window.addEventListener("load", () => {
  const puzzleIndex = getTodayIndex();
  const todayPuzzle = dailyPuzzles[puzzleIndex];

  randomPlayer = todayPuzzle.player;

  const lastPlayedDate = localStorage.getItem("lastPlayedDate");
  const gameOver = localStorage.getItem("gameOver");
  const todayString = getTodayString();

  if (lastPlayedDate === todayString && (gameOver === "won" || gameOver === "lost")) {
    sumbit.disabled = true;
    document.getElementById("final-submit-button").disabled = true;
    endscreen.style.display = "block";
    title.textContent = "You already played today's puzzle!";
  } else {
    sumbit.disabled = false;
    document.getElementById("final-submit-button").disabled = false;
  }
});

function wasPlayerInSeason(player, season) {
  if (player_info[player]) {
    return player_info[player].includes(season);
  }
  return false;
}

sumbit.addEventListener("click", function() {
  let selectedSeason = document.getElementById("season-select").value;

  if (selectedSeason === "" || selectedSeason === "-- Season --") {
    alert("Please select a season before submitting!");
    return;
  }

  let isCorrect = wasPlayerInSeason(randomPlayer, selectedSeason);
  let guessElement;

  if (guesses === 4) {
    sumbit.disabled = true;
    title.textContent = "Make your final (player) guess!";
  }

  if (guesses === 1) {
    guessElement = document.getElementById("guess1");
    guess1 = isCorrect ? "🟩" : "🟥";
    final_guess.style.display = "block";
    title.textContent = "Guess a Season or player";
  } else if (guesses === 2) {
    guessElement = document.getElementById("guess2");
    guess2 = isCorrect ? "🟩" : "🟥";
  } else if (guesses === 3) {
    guessElement = document.getElementById("guess3");
    guess3 = isCorrect ? "🟩" : "🟥";
  } else if (guesses === 4) {
    guessElement = document.getElementById("guess4");
    guess4 = isCorrect ? "🟩" : "🟥";
  }

  if (guessElement) {
    guessElement.innerHTML = `Guess ${guesses}: ${selectedSeason}`;
    guessElement.style.backgroundColor = isCorrect ? "lightgreen" : "lightcoral";
    guesses++;
  }
});

document.getElementById("final-submit-button").addEventListener("click", function() {
  let selectedPlayer = document.getElementById("player-select").value;

  if (selectedPlayer === "" || selectedPlayer === "--Player--") {
    alert("Please select a player before submitting!");
    return;
  }

  if (selectedPlayer === randomPlayer) {
    win();
    console.log("W");
  } else {
    lose();
    console.log("L");
  }
});

function savePlayDate() {
  const todayString = getTodayString();
  localStorage.setItem("lastPlayedDate", todayString);
  sumbit.disabled = true;
  document.getElementById("final-submit-button").disabled = true;
}

function win() {
  title.textContent = "You guessed correctly!";
  endscreen.style.display = "block";

  const text = document.getElementById("text");
  text.textContent = `You guessed ${randomPlayer} correctly!`;

  copyable.textContent = `${getTodayString()}\n${guess1}\n${guess2}\n${guess3}\n${guess4}\n🏆`;
  localStorage.setItem("gameOver", "won");
  savePlayDate();
}

function lose() {
  title.textContent = `Aw, you lost! It was ${randomPlayer}`;
  endscreen.style.display = "block";

  const text = document.getElementById("text");
  text.textContent = `You unfortunately didn't know it was ${randomPlayer}`;

  copyable.textContent = `${getTodayString()}\n${guess1}\n${guess2}\n${guess3}\n${guess4}\n❌`;
  localStorage.setItem("gameOver", "lost");
  savePlayDate();
}

function copytext() {
  navigator.clipboard.writeText(copyable.textContent);
  alert("Copied the text: " + copyable.textContent);
}
