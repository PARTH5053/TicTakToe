let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //player X & player O

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.classList.add("O");
      box.innerText = "O";
      turnO = false;
    } else {
      box.classList.remove("O");
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    let x = checkWinner();
    if (!x) {
      checkDraw();
    }
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        showWinner(posVal1);
      }
    }
  }
};

let checkDraw = () => {
  let countOfEmptyBoxes = 0;
  for (let box of boxes) {
    if (box.innerText == "") {
      countOfEmptyBoxes++;
    }
  }
  if (!countOfEmptyBoxes) {
    msg.innerText = "Uhhhh! Game is Draw! Play Again!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};
