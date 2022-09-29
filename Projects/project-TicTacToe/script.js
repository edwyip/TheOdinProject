const Player = (inputname, hand) => {
    const name = inputname
    const win = ()=>{
        const result = document.querySelector(".result")
        result.textContent=`Congradulation ${name}, You won!`
    }
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
    const boardList = ["top","mid","bot","left","center","right", "down", "up"]
    for (let item of boardList){
        board[item] = []
    }
    let breakLoop=false

    const init = (container) => {
        breakLoop = false
        turns = 9
        hand = "X"
        result.textContent = ""
        while(container.firstChild){
            container.removeChild(container.lastChild)
        }
        for (let item of boardList){
            board[item] = []
        }

        let tagX = document.querySelector(".X")
        let tagO = document.querySelector(".O")
        players.X = Player(tagX.value, "X")
        players.O = Player(tagO.value, "O")

        DisplayController.changeInputToText("X")
        DisplayController.changeInputToText("O")
        document.querySelector(".newGame").disabled = true
    }

    const newBoard = () =>{
        const newGameBtn = document.querySelector(".newGame")
        
        //render new board
        newGameBtn.addEventListener("click", () => {
            let tagX = document.querySelector(".X")
            console.log(tagX.checkValidity())
            let tagO = document.querySelector(".O")
            while (!tagX.checkValidity() || !tagO.checkValidity()){
                if (!tagX.checkValidity()){
                    tagX.style.border = "2px solid red"
                    tagX.style.color = "red"
                    return
                }
                if (!tagO.checkValidity()){
                    tagO.style.border = "2px solid red"
                    tagO.style.color = "red"
                    return
                }
            }
            const container = document.querySelector(".container")
            init(container)
            let num=1
            for (const [row,col] of Object.entries(boardTemplate)) {
                for (let i=0;i<3;i++){
                    const square = document.createElement("div")
                    square.classList.add("square")
                    square.classList.add(row)
                    square.classList.add(col[i])

                    //to do: add diagonial class
                    if ([1,5,9].includes(num)){
                        square.classList.add("down")
                    }
                    if ([3,5,7].includes(num)){
                        square.classList.add("up")
                    }

                    square.addEventListener("click",()=>updateBoard(square), { once: true })
                    container.appendChild(square)
                    
                    //increment num
                    num++
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
                    DisplayController.changeTexttoInput("X")
                    DisplayController.changeTexttoInput("O")
                    document.querySelector(".newGame").disabled = false
                }
            }
        })
        hand = hand==="X"? "O":"X"
        
    }

    const endGame = (c)=>{
        if (breakLoop) return
        const domClass = board[c]

        //check win, must bbe placed previous of draw
        if (domClass.length===3){
            if (domClass[0] === domClass[1] && domClass[0] === domClass[2]) {
                if (domClass[0]==="X"){
                    players.X.win()
                } else {players.O.win()}
                breakLoop = true
                DisplayController.win([...document.querySelectorAll("."+ c)])
                
                return true
            }
        }
        
        if (turns === 0){
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

    const changeInputToText = (el)=>{
        const input = document.querySelector("."+ el)
        const text = document.createElement("div")
        text.classList.add(el)
        text.classList.add("inputText")
        text.textContent = input.value
        input.replaceWith(text)
    }

    const changeTexttoInput = (el)=>{
        const text = document.querySelector("."+ el)
        const input = document.createElement("input")
        input.classList.add(el)
        text.replaceWith(input)
    }

    return {win, draw, changeInputToText, changeTexttoInput}
})()

Gameboard.newBoard()