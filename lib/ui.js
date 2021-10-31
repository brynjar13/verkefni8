import { el } from './helpers.js'
import { round } from '../main.js'
import { checkGame, playAsText, computerPlay } from './rock-paper-scissors.js'
/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
export function createButtons(max, onClick) {
  const rounds_buttons = document.querySelector('.rounds__buttons')
  rounds_buttons.append(el('button','1'));
  rounds_buttons.append(el('button','3'));
  rounds_buttons.append(el('button','5'));
  rounds_buttons.append(el('button','7'));
  rounds_buttons.append(el('button','9'));

  rounds_buttons.addEventListener('click', round);
}

export function show(part) {
  
  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
  const play = document.querySelector('.play');
  const result = document.querySelector('.result');

  // Felum allt
  start.classList.add('hidden');
  rounds.classList.add('hidden');
  play.classList.add('hidden');
  result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case 'play':
      play.classList.remove('hidden');
      break;
    case 'result':
      result.classList.remove('hidden');
      break;
    default:
      console.warn(`${part} óþekkt`);
  }

}

/**
 * @typedef {Object} Results
 * @property {string} player Það sem spilari spilaði
 * @property {string} computer Það sem tölva spilaði
 * @property {number} result Útkoma úr leik, `-1`, `0`, eða `1`
 * @property {number} currentRound Núverandi umferð
 * @property {number} totalRounds Heildarfjöldi umferð
 * @property {number} playerWins Sigrar spilara í umferð
 * @property {number} computerWins Sigrar tölvu í umferð
 */

/**
 * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
 * @param {Results} r Gildi fyrir skjá
 */
export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  const resultPlayer = document.querySelector('.result__player');
  const resultComputer = document.querySelector('.result__computer');
  const gameResult = checkGame(player,computer);
  const current_round = document.querySelector('.result__currentRound');
  const total_rounds = document.querySelector('.result__totalRounds');
  const winner = document.querySelector('.result__result');
  const score = document.querySelector('.result__status');
  resultPlayer.textContent = `${playAsText(player)}`;
  resultComputer.textContent = `${playAsText(computer)}`;
  total_rounds.textContent = `${totalRounds}`;
  score.textContent = `staðan er ${playerWins} - ${computerWins}`;

  if (gameResult !== 0) {
    current_round.textContent = `${currentRound++}`;
  }

  if (gameResult === 1) {
    winner.textContent = 'Þú vinnur';
  } else if (gameResult === -1) {
    winner.textContent = 'Tölva vinnur';
  } else {
    winner.textContent = 'Það er jafntefli';
  }


}
