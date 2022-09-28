const Gameboard = (function() {
    const newBoard = () =>{
        const newGameBtn = document.querySelector(".newGame")
        
        //render new board
        newGameBtn.addEventListener("click", () => {
            const container = document.querySelector(".container")
            while(container.firstChild){
                container.removeChild(container.lastChild)
            }
            //temp var
            let hand = "X"

            for (let i = 0; i < 9; i++) {
                const square = document.createElement("div")
                square.classList.add("square")
                
                //add click listener for marks
                square.addEventListener("click",()=>{
                    square.textContent = hand
                    hand = switchHand(hand)
                }, { once: true })

                container.appendChild(square)
            }
        })
    }

    const switchHand = (hand) => {
        hand = hand==="X"? "O":"X"
        return hand
    }

    return { newBoard }
})()

// const Player = (hand) => {
//     const name = prompt(`Who's playing ${hand}`?)

//     return { name, play }
// }

// const DisplayController = (function() {
//     Gameboard.newBoard()
//     const player1 = Player("X") //"X" plays first
//     const player2 = Player("O")
//     let player = "X"
//     const switchPlayer = player => {
//         player = (player===player1)? player2: player1
//         return player
//     }
// })()

Gameboard.newBoard()