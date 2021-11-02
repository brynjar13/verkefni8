// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { checkGame, computerPlay } from './lib/rock-paper-scissors.js';
import { createButtons, show, updateResultScreen } from './lib/ui.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  let computer = computerPlay();
  
  currentRound = 1

  let result = checkGame(player,computer)

  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player,
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  }); 

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil
  if (result !== 0) {
    currentRound++;
  }

  if (result === 1) {
    playerWins++;
  } else if (result === -1) {
    computerWins++;
  }

  // Ákveðum hvaða takka skuli sýna

  // Sýnum niðurstöðuskjá
  show('result')
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
export function round(e) {
  totalRounds = e.target.textContent;
  show('play');
}

// Takki sem byrjar leik
function hideall() {
  show('start');
}

const byrja = document
  .querySelector('.start button')

byrja.addEventListener('click', () => show('rounds'));
byrja.addEventListener('click', () => createButtons(round))
// Búum til takka

// Event listeners fyrir skæri, blað, steinn takka
// TODO
const skæri = document.querySelector('button.scissor').addEventListener('click', () => playRound('1'));
const steinn = document.querySelector('button.rock').addEventListener('click', () => playRound('3'));
const blað = document.querySelector('button.paper').addEventListener('click', () => playRound('2'));

/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */

function finishGame() {
  // Bætum við nýjasta leik

  // Uppfærum stöðu

  // Bætum leik við lista af spiluðum leikjum

  // Núllstillum breytur

  // Byrjum nýjan leik!
}

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
// TODO takki sem fer með í næstu umferð
