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