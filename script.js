function rockPaperGame() {
  let userScore = 0;
  let compScore = 0;

  let msg = document.querySelector("#msg");

  let userScorePara = document.querySelector("#user-score");

  let compScorePara = document.querySelector("#comp-score");

  const choices = document.querySelectorAll(".choice");

  const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    //rock paper sciccors
    const randIndx = Math.floor(Math.random() * 3);
    return options[randIndx];
  }

  const drawGame = () => {
    msg.innerText = "The Game was Draw! Play again!";
    msg.style.backgroundColor = "grey";
  }

  const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
      userScore++;
      userScorePara.innerText = userScore;
      msg.innerText = `You Win!, Your ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
    } else {
      compScore++;
      compScorePara.innerText = compScore;
      msg.innerText = `You Loose!, ${compChoice} beats your ${userChoice}`;
      msg.style.backgroundColor = "red";
    }
  }

  const playGame = (userChoice) => {
    //Generate computer Choice
    const compChoice = genCompChoice();

    if(userChoice === compChoice) {
      //Draw Game
      drawGame();
    } else {
      let userWin = true;

      if(userChoice === "rock") {
        //scissors, paper
        userWin = compChoice === "paper" ? false : true;
      } else if(userChoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
      } else {
        userWin = compChoice === "rock" ? false : true;
      }

      showWinner(userWin, userChoice, compChoice);
    }
  };

  choices.forEach((choice) => {
    choice.addEventListener("click",() => {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    })
  })
}

function rollDice() {
  let diceBtn = document.querySelector("#roll");
  let diceNum = document.querySelector(".dice-num");

  console.log(diceBtn);

  diceBtn.addEventListener("click", () => {
    rollTheDice();
  })

  function rollTheDice() {
    let num = Math.floor(Math.random() * 6) + 1;
    diceNum.innerText = num;
  }
}

// Tic Tac Toe game Logic
function ticTacToe() {
  let boxes = document.querySelectorAll(".box");
  let resetBtn = document.querySelector("#reset-btn");
  let newGameBtn = document.querySelector("#new-btn");
  let msgContainer = document.querySelector(".win-msg-container");
  let msg = document.querySelector("#win-msg");
  let playCount = 0;

  let turnO = true; //playerO playerX

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ];

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      playCount++;

      if(turnO === true) { // player O
        box.innerText = "O";
        turnO = false;
        box.classList.add("playerO");
        box.classList.remove("playerX");
      } else { // player X
        box.innerText = "X";
        turnO = true;
        console.log(`This is Player ${box.innerText}`);
        box.classList.add("playerX");
        box.classList.remove("playerO");
      }

      box.disabled = true;
      const winner = checkWinner();
      if(!winner && playCount === 9) {
        drawGame();
      }
    });
  })

  const checkWinner = () => {
    for(pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if(pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          disableBoxes();
        }
      }
    }
  }

  const disableBoxes = () => {
    for(let box of boxes) {
      box.disabled = true;
    }
  }

  const enableBoxes = () => {
    for(let box of boxes) {
      box.disabled = false;
      box.innerText = "";
      msgContainer.classList.add("hide");
    }
  }

  const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
  }

  const resetGame = () => {
    turnO = true;
    enableBoxes();
  }

  const drawGame = () => {
    console.log("The game is a Draw!");
    msg.innerText = "The Game is a Draw, Play again!"
    msgContainer.classList.remove("hide");
    msg.classList.add("draw");
  }

  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame)
}

// rockPaperGame();
// rollDice();
ticTacToe();
