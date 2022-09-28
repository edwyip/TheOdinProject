const Gameboard = (function() {
    const render = () => {
        const container = document.querySelector(".container")
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div")
            square.classList.add("square")
            container.appendChild(square)
        }

    }

    return { render }
})()

const DisplayController = (function() {

})()

const Player = () => {
    const squares = [...document.querySelectorAll("square")]
    const play = (player) => {
        squares.forEach((square) => {
            square.addEventListener("click", (e) => {
                e.textContent = player
            })
        })
    }

    return { play }
}