let progressbar = document.getElementById("progressbar");
let stellingenRemainingText = document.getElementById("remainingStandpunten");


let stellingenTitle = ["Spawn Protection", "Munteenheid", "Pvp", "Inwoners spawn", "Eten", "Belasting", "Overheid"];
let stellingenText = ["Spawn protection moet kleiner worden", "Elke speler mag zijn eigen valuta maken", "Pvp limiteren tot specifieke arena's",
  "Buitenlanders mogen niet in spawn wonen en moeten zich dus vestigen in ghettos rondom spawn", "Gratis eten is verkrijgbaar op spawn.",
"Belasting wordt ingevoerd", "De overheid blijft op afstand, maar grijpt in om vrijheid belastende ideeën in te perken en af te straffen."
];

let stellingTitleDisplay = document.getElementById("standpuntTitle");
let stellingTextDisplay = document.getElementById("standpuntText");

let progressbarCurrentProgress = 1;
let maxStellingen = 7;

progressbar.max = maxStellingen;

let partijen = [
  {name: "VVD", score: 0, color: "#213966", meningen: ["eens","eens","oneens","oneens","oneens","oneens","eens"]},
  {name: "NSB", score: 0, color: "#e50000ff", meningen: ["oneens","oneens","eens","oneens","eens","oneens","neutraal"]},
  {name: "CDA", score: 0, color: "#382106", meningen: ["oneens","oneens","neutraal","oneens","oneens","oneens","eens"]},
  {name: "BBB", score: 0, color: "#50ab4f", meningen: ["oneens","oneens","neutraal","oneens","oneens","oneens","eens"]},
  {name: "PVB", score: 0, color: "#610814", meningen: ["neutraal","neutraal","neutraal","eens","eens","eens","neutraal"]}
];

window.onload = function() {
  updateRemainingStellingen();
  newStelling();
}

function progressbarEvolve() {
  if (progressbar.value < progressbar.max) {
    progressbar.value += 1;
    progressbarCurrentProgress += 1;
    updateRemainingStellingen();
    newStelling();
  } else {
    hideEverything()
  }
}

function updateRemainingStellingen() {
  stellingenRemainingText.textContent = `${progressbarCurrentProgress}/${maxStellingen}`;
}

function newStelling() {
  stellingTitleDisplay.textContent = `${stellingenTitle[progressbarCurrentProgress - 1]}`; 
  stellingTextDisplay.textContent = `${stellingenText[progressbarCurrentProgress - 1]}`; 
}

function updateScore(keuze) {
  let currentStandpunt = progressbarCurrentProgress - 1;
  partijen.forEach(partij => {
    let partyChoice = partij.meningen[currentStandpunt];
    if (partyChoice === keuze) {
      partij.score += 1;
    }
  });
  progressbarEvolve();
}

function hideEverything() {
  document.getElementById("footer").style.display = "none";
  document.getElementById("standpunt").style.display = "none";

  document.getElementById("result").style.display = "flex";
  getTop3();
}

function getTop3() {
  let copyPartijen = [...partijen].sort((a, b) => b.score - a.score);
  let top3 = copyPartijen.slice(0,3);

  let percentage1 = ((top3[0].score / maxStellingen) * 100).toFixed(1);
  let percentage2 = ((top3[1].score / maxStellingen) * 100).toFixed(1);
  let percentage3 = ((top3[2].score / maxStellingen) * 100).toFixed(1);

  //number 1
  document.getElementById("img1").src = `images/partijen/${top3[0].name.toLowerCase()}.png`;
  document.getElementById("img1").style.backgroundColor = top3[0].color;
  document.getElementById("percentage1").textContent = `${percentage1}%`;
  document.getElementById("partij1Naam").textContent = top3[0].name;

  //number 2
  document.getElementById("img2").src = `images/partijen/${top3[1].name.toLowerCase()}.png`;
  document.getElementById("img2").style.backgroundColor = top3[1].color;
  document.getElementById("percentage2").textContent = `${percentage2}%`;
  document.getElementById("partij2Naam").textContent = top3[1].name;

  //number 3
  document.getElementById("img3").src = `images/partijen/${top3[2].name.toLowerCase()}.png`;
  document.getElementById("img3").style.backgroundColor = top3[2].color;
  document.getElementById("percentage3").textContent = `${percentage3}%`;
  document.getElementById("partij3Naam").textContent = top3[2].name;
}