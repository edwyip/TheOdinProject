const Player = (hand) => {
    const name = prompt(`Who's playing ${hand}?`)
    const win = ()=>{
        const result = document.querySelector(".result")
        result.textContent=`Congratualation ${name}, You won!`
    }
    const div = document.querySelector("."+hand)
    div.textContent = name
    return { hand, name, win }
}

const Gameboard = (function() {
    const result = document.querySelector(".result")
    const players={}
    const boardTemplate = {
        top:["left", "center", "right"],
        mid:["left", "center", "right"],
        bot:["left", "center", "right"],
    }
    const board={}
    const boardList = ["top","mid","bot","left","center","right"]
    for (let item of boardList){
        board[item] = []
    }

    const init = (container) => {
        turns = 9
        hand ="X"
        result,textContent = ""
        while(container.firstChild){
            container.removeChild(container.lastChild)
        }
        for (let item of boardList){
            board[item] = []
        }
        players.X = Player("X")
        players.O = Player("O")
    }

    const newBoard = () =>{
        const newGameBtn = document.querySelector(".newGame")
        
        //render new board
        newGameBtn.addEventListener("click", () => {
            const container = document.querySelector(".container")
            init(container)
            for (const [row,col] of Object.entries(boardTemplate)) {
                for (let i=0;i<3;i++){
                    const square = document.createElement("div")
                    square.classList.add("square")
                    square.classList.add(row)
                    square.classList.add(col[i])

                    square.addEventListener("click",()=>updateBoard(square), { once: true })
                    container.appendChild(square)
                }
            }
        })
    }

    const updateBoard = (square) => {
        turns -= 1
        square.textContent = hand;
        [...square.classList].forEach((c)=>{
            if (boardList.includes(c)){
                board[c].push(hand)
                if(endGame(c)){
                    [...document.querySelectorAll(".square")].forEach(square=>{
                        square.replaceWith(square.cloneNode(true))
                    })
                }
            }
        })
        hand = hand==="X"? "O":"X"
        
    }

    const endGame = (c)=>{
        const domClass = board[c]

        //check win, must bbe placed previous of draw
        if (domClass.length===3){
            if (domClass[0] === domClass[1] && domClass[0] === domClass[2]) {
                if (domClass[0]==="X"){
                    players.X.win()
                } else {players.O.win()}
                DisplayController.win([...document.querySelectorAll("."+ c)])
                return true
            }
        }

        //check draw
        if (turns === 0){
            console.log("draw")
            DisplayController.draw()
            return true
        }
    }

    return { newBoard }
})()

const DisplayController = (function(){
    const win = (winSquares) => {
        winSquares.forEach((square) => square.classList.add("win"));
    }
    const draw = ()=> {
        const result = document.querySelector(".result")
        result.textContent= "It's a draw.";
    }

    return {win, draw}
})()

Gameboard.newBoard()