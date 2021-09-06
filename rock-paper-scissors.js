let computerScore = 0;
let playerScore = 0;
let round = 0;

function computerPlay() {
    let num = Math.floor(Math.random() * 3);
    switch (num) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function playRound(playerSelection) {
    let computerSelection = computerPlay();
    if (computerSelection == "rock" && playerSelection == "paper" || computerSelection == "paper" && playerSelection == "scissors" || computerSelection == "scissors" && playerSelection == "rock") {
        playerScore++
        results.innerHTML = `You played ${playerSelection}.`;
        results.innerHTML += `<br>Computer played ${computerSelection}.`
        results.innerHTML += `<br>You win, ${playerSelection} beats ${computerSelection}.`;
        score.innerHTML = `Round: ${round + 1}/5<br>Player: ${playerScore}  Computer: ${computerScore}`;
    }

    if (playerSelection == "rock" && computerSelection == "paper" || playerSelection == "paper" && computerSelection == "scissors" || playerSelection == "scissors" && computerSelection == "rock") {
        computerScore++;
        results.innerHTML = `You played ${playerSelection}.`;
        results.innerHTML += `<br>Computer played ${computerSelection}.`;
        results.innerHTML += `<br>You lose, ${computerSelection} beats ${playerSelection}.`;
        score.innerHTML = `Round: ${round + 1}/5<br>Player: ${playerScore} Computer: ${computerScore}`;
    }

    if (playerSelection == computerSelection) {
        results.innerHTML = `You both played ${playerSelection}.`;
        results.innerHTML += `<br>Draw.`;
        score.innerHTML = `Round: ${round + 1}/5<br>Player: ${playerScore} Computer: ${computerScore}`;
    }
    round += 1;

    if (round == 5) {
        if (playerScore > computerScore) {
            results.innerHTML += "<br>Player wins the game";
            score.innerHTML = `Round: 5/5<br>Player: ${playerScore} Computer: ${computerScore}`;

        } else if (playerScore < computerScore) {
            results.innerHTML += "<br>Computer wins the game";
            score.innerHTML = `Round: 5/5<br>Player: ${playerScore} Computer: ${computerScore}`;

        } else {
            results.innerHTML += "<br>Game ends in a Draw."
            score.innerHTML = `Round: 5/5<br>Player: ${playerScore} Computer: ${computerScore}`;

        }
    }
}

const score = document.querySelector('#score');

const results = document.querySelector('#results')

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {   
    button.addEventListener('click', () => {
        playRound(`${button.id}`);
    })
});