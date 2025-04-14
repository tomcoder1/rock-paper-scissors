const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
//get score from localStorage, if no score -> set to 0 all.

function toString(move){
    if (move === 1)
        return "rock";
    if (move === 2)
        return "paper";
    return "scissors";
}

function play(playerMove) {
    const computerMove = Math.floor(Math.random() * 3) + 1;
    
    if (playerMove === computerMove) {
        renderResult(playerMove, computerMove, "draw");
        score.ties++;
    } else if (
        (playerMove === 1 && computerMove === 3) || 
        (playerMove === 2 && computerMove === 1) || 
        (playerMove === 3 && computerMove === 2)    
    ) {
        renderResult(playerMove, computerMove, "win");
        score.wins++;
    } else {
        renderResult(playerMove, computerMove, "lose");
        score.losses++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    //save to scoreboard
    renderScoreboard();
}

function colorRendering(result) {
    let color = '';
    if (result === 'win') color = 'green';
    else if (result === 'lose') color = 'red';
    else if (result === 'draw') color = 'grey';

    return `<span style="color: ${color};">${result}</span>`;
}

function renderResult(player, computer, result) {
    document.querySelector('.results').style.marginTop = '50px';
    document.querySelector('.current-result').innerHTML = `
        You: <img class="result-move-icon" src="images/${toString(player)}.png">
        Computer: <img class="result-move-icon" src="images/${toString(computer)}.png"><br>
        You ${colorRendering(result)}!
    `;
}


function renderScoreboard() {
    document.querySelector('.numbers-wins').innerHTML = `${score.wins}`;
    document.querySelector('.numbers-loses').innerHTML = `${score.losses}`;
    document.querySelector('.numbers-ties').innerHTML = `${score.ties}`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.setItem('score', JSON.stringify(score));
    renderScoreboard();
}

renderScoreboard();
console.log(score);
