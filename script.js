const [
  playerScoreEl,
  playerChoiceEl,
  computerScoreEl,
  computerChoiceEl,
  resultText,
  playerRock,
  playerPaper,
  playerScissors,
  playerLizard,
  playerSpock,
  computerRock,
  computerPaper,
  computerScissors,
  computerLizard,
  computerSpock
] = [
  'playerScore',
  'playerChoice',
  'computerScore',
  'computerChoice',
  'resultText',
  'playerRock',
  'playerPaper',
  'playerScissors',
  'playerLizard',
  'playerSpock',
  'computerRock',
  'computerPaper',
  'computerScissors',
  'computerLizard',
  'computerSpock'
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
}

let computerChoice = ''
const computerRandomChoice = () => {
  const num = Math.floor(
    Math.random() * Math.floor(Object.keys(choices).length)
  )
  computerChoice = Object.keys(choices)[num]
}

// call functions to process turn
const checkResult = () => {
  resetSelected()
  computerRandomChoice()
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
  resetSelected()
  styleChoice(choice, 'player')
  computerRandomChoice()
  styleChoice(computerChoice, 'computer')
}
