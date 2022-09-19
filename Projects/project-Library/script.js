class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    info() {
        return `${this.title} by ${author}, ${this.pages}, ${this.read}`
    }
}

let mylibrary = []

function addBookToLibrary(book) {
    mylibrary.push(book)
}

const OMATS = new Book("Old Man and the Sea", "Ernest Hemingway", 292, true)
const ONE984 = new Book("1984", "George Orwell", 199, false)
const METAMORPHOSIS = new Book("Metamorphosis", "Franz Kafka", 377, true)
const SUTTREE = new Book("Suttree", "Cormac McCarthy", 577, true)

addBookToLibrary(OMATS)
addBookToLibrary(ONE984)
addBookToLibrary(METAMORPHOSIS)
addBookToLibrary(SUTTREE)

const books = document.querySelector(".books")

function addBook(book) {
    const newBook = document.createElement("div")
    newBook.classList.add("book")

    //make a delete cross button
    const del = document.createElement("div")
    del.classList.add("delete-book")
    const delBtn = document.createElement("button")
    delBtn.textContent = "x"
    del.appendChild(delBtn)
    delBtn.addEventListener("click", () => {
        books.removeChild(newBook)
    })

    //make the info section
    const info = document.createElement("div")
    info.classList.add("info")
    for (let attr in book) {
        let newDiv = document.createElement("div")
        newDiv.classList.add(attr)
        switch (attr) {
            case "pages":
                newDiv.textContent = "Total Pages: " + book[attr]
                break
            case "read":
                newDiv.textContent = (book[attr] === true) ? "Already read" : "Not read yet"
                break
            default:
                newDiv.textContent = book[attr]
        }
        info.appendChild(newDiv)
    }

    newBook.appendChild(del)
    newBook.appendChild(info)

    const books = document.querySelector(".books")
    books.appendChild(newBook)

}

function displayBooks(library) {
    for (let book of library) {
        addBook(book)
    }
}

displayBooks(mylibrary)