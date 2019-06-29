const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const rules = document.getElementById("rules");
const modal = document.querySelector(".modal");
const rulesModal = document.querySelector(".rulesModal");
const scoreboard = {
  player: 0,
  computer: 0
};

// Play game
function play(e) {
  restart.style.display = "inline-block";
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand <= 0.2) {
    return "rock";
  } else if (rand <= 0.4) {
    return "paper";
  } else if (rand <= 0.6) {
    return "scissors";
  } else if (rand <= 0.8) {
    return "lizard";
  } else {
    return "spock";
  }
}

function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (
    (p === "rock" && (c === "scissors" || c === "lizard")) ||
    (p === "paper" && (c === "rock" || c === "spock")) ||
    (p === "scissors" && (c === "paper" || c === "lizard")) ||
    (p === "lizard" && (c === "paper" || c === "spock")) ||
    (p === "spock" && (c === "scissors" || c === "rock"))
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function showWinner(winner, computerChoice) {
  if (winner === "player") {
    // Inc player score
    scoreboard.player++;
  } else if (winner === "computer") {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
  }
  // Show modal result
  result.innerHTML = generateResultHTML(winner, computerChoice);
  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

  modal.style.display = "block";
}

function generateResultHTML(winner, choice) {
  var html;
  console.log(winner, choice);
  if (winner === "player") {
    html = '<h1 class="text-win">You Won!</h1>';
  } else if (winner === "computer") {
    html = '<h1 class="text-lose">You Lost!</h1>';
  } else {
    html = "<h1>It Was A Draw!</h1>";
  }
  html = `
  ${html}
  <i class="fas fa-hand-${choice} fa-10x"></i>
  <p>Computer Chose <strong>${choice.charAt(0).toUpperCase() +
    choice.slice(1)}</strong></p>
  `;
  return html;
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
  restart.style.display = "none";
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
  if (e.target == rulesModal) {
    rulesModal.style.display = "none";
    stopVideo(rulesModal);
  }
}

function openRulesModal() {
  rulesModal.style.display = "block";
  autoplayVideo(rulesModal);
}

var autoplayVideo = function(modal) {
  // Look for a YouTube, Vimeo, or HTML5 video in the modal
  var video = modal.querySelector(
    'iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video'
  );

  // Bail if the modal doesn't have a video
  if (!video) return;

  // If an HTML5 video, play it
  if (video.tagName.toLowerCase() === "video") {
    video.play();
    return;
  }

  // Add autoplay to video src
  // video.src: the current video `src` attribute
  // (video.src.indexOf('?') < 0 ? '?' : '&'): if the video.src already has query string parameters, add an "&". Otherwise, add a "?".
  // 'autoplay=1': add the autoplay parameter
  video.src =
    video.src + (video.src.indexOf("?") < 0 ? "?" : "&") + "autoplay=1";
};

var stopVideo = function(modal) {
  // Look for a YouTube, Vimeo, or HTML5 video in the modal
  var video = modal.querySelector(
    'iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video'
  );

  // Bail if the modal doesn't have a video
  if (!video) return;

  // If an HTML5 video, pause it
  if (video.tagName.toLowerCase() === "video") {
    video.pause();
    return;
  }

  // Remove autoplay from video src
  video.src = video.src.replace("&autoplay=1", "").replace("?autoplay=1", "");
};

// Event listeners
choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);
rules.addEventListener("click", openRulesModal);
