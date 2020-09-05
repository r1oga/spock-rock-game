import { startConfetti, stopConfetti, removeConfetti } from './confetti.js'

const [
  playerScoreEl,
  playerChoiceEl,
  computerScoreEl,
  computerChoiceEl,
  resultText
] = [
  'playerScore',
  'playerChoice',
  'computerScore',
  'computerChoice',
  'resultText'
].map(id => document.getElementById(id))

const allGameIcons = document.querySelectorAll('.far')

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] }
}

const capitalize = text => text[0].toUpperCase() + text.slice(1)

const resetSelected = () => {
  allGameIcons.forEach(icon => {
    icon.classList.remove('selected')
  })
  stopConfetti()
  removeConfetti()
}

let playerScore = 0
let computerScore = 0
let computerChoice = ''
const computerRandomChoice = () => {
  const num = Math.floor(
    Math.random() * Math.floor(Object.keys(choices).length)
  )
  computerChoice = Object.keys(choices)[num]
}

const updateScore = choice => {
  if (choice === computerChoice) {
    resultText.textContent = ' Draw!'
  } else if (choices[choice].defeats.includes(computerChoice)) {
    startConfetti()
    resultText.textContent = 'You won!'
    playerScore++
    playerScoreEl.textContent = playerScore
  } else {
    resultText.textContent = 'You lose!'
    computerScore++
    computerScoreEl.textContent = computerScore
  }
}
// Process round
const checkResult = choice => {
  resetSelected()
  computerRandomChoice()
  computerRandomChoice()
  styleChoice(computerChoice, 'computer')
  updateScore(choice)
}

const styleChoice = (choice, player) => {
  document
    .getElementById(`${player}${capitalize(choice)}`)
    .classList.add('selected')
  document.getElementById(`${player}Choice`).textContent = ` --- ${capitalize(
    choice
  )}`
}

const select = choice => {
  checkResult(choice)
  styleChoice(choice, 'player')
}

const resetAll = () => {
  playerScoreEl.textContent = 0
  computerScoreEl.textContent = 0
  playerChoiceEl.textContent = ''
  computerChoiceEl.textContent = ''
  resetSelected()
}
document.querySelector('.reset-icon').addEventListener('click', resetAll)

resetAll()

window.select = select
