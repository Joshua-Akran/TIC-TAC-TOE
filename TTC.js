const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = [
    "","","",
    "","","",
    "","",""
]
let go = "circle"
infoDisplay.textContent = "Circle Goes First"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
}

createBoard()

function addGo(e) {
  const goDisplay = document.createElement("div")
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === "circle" ? "cross" : "circle"         //? --> means true  : --> means otherwise/else
  infoDisplay.textContent = "it is now " + go + "'s go"
  e.target.removeEventListener("click", addGo)
  checkScore()
}

function checkScore() {
   const allSquare = document.querySelectorAll(".square")
   const winningCombos=[
    [0,1,2], [0,3,6], [2,5,8],
     [6,7,8],[1,4,7],[3,4,5],
     [0,4,8],[2,4,6]
   ]

   winningCombos.forEach(Array => {
    const circleWins = Array.every(cell => 
        allSquare[cell].firstChild?.classList.contains("circle"))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
   })

   winningCombos.forEach(Array => {
    const crossWins = Array.every(cell => 
        allSquare[cell].firstChild?.classList.contains("cross"))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
   })

}