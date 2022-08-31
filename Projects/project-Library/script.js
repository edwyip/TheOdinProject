const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read": "not read yet"}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary(hobbit)

const braveNewWorld = new Book("Brave New World", "Aldous Huxley", 311, true)
addBookToLibrary(braveNewWorld)

const one984 = new Book("1984", "George Orwell", 199, true)
addBookToLibrary(one984)

function displayBooks(library) {
    const bookshelf = document.querySelector(".bookshelf")
    for (let book of library) {
        const newBook = document.createElement("div")
        newBook.classList.add("book")
        const otherInfo = document.createElement("div")
        otherInfo.classList.add("otherInfo")
        newBook.appendChild(otherInfo)
        for (let attr in book) {
            let newDiv = document.createElement("div")
            newDiv.classList.add(attr)
            if (attr === "title") {
                newDiv.textContent = book[attr]
                newBook.insertBefore(newDiv, otherInfo)
            } else {
                switch (attr) {
                    case "author":
                        newDiv.textContent = "by " + book[attr]
                        break
                    case "pages":
                        newDiv.textContent = book[attr] + " pages"
                        break
                    case "read":
                        newDiv.textContent = (book[attr] === true) ? "Already read" : "Not read yet"
                }
                otherInfo.appendChild(newDiv)
            }
        }

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        newBook.appendChild(deleteButton)
        deleteButton.addEventListener("click", () => {
            bookshelf.removeChild(newBook)
        })

        const readButton = document.createElement("button")
        readButton.textContent = (book.read) ? "Not Read" : "Read"
        newBook.appendChild(readButton)
        readButton.addEventListener("click", () => {
            book.read = !(book.read)
            console.log(book)
            readButton.textContent = (book.read) ? "Not Read" : "Read"
        })


        bookshelf.appendChild(newBook)
    }
}

displayBooks(myLibrary)