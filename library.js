class Book {

    static #isInternalConstructing = false;

    static form = document.getElementById("form_container");

    static titleInput = document.getElementById("title");
    static authorInput = document.getElementById("author");
    static pagesInput = document.getElementById("pages");
    static readInput = document.getElementById("read");

    static #library = [];

    constructor(title, author, pages, read) {
        if (!Book.#isInternalConstructing) {
            throw new TypeError("Book is not constructable");

        }
        Book.#isInternalConstructing = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static #checkForm() {
        if (this.titleInput.value == "" || this.authorInput.value == "" || this.pagesInput.value == "") {
            alert("Ensure you input a value in all fields!");
            return false;
        } else {
            return true;
        }
    }

    static addBookToLibrary(title, author, pages, read) {
        if (!Book.#checkForm()) { return; };
        Book.#isInternalConstructing = true;
        const book = new Book(title, author, pages, read);
        this.#library.push(book);
        console.log(`Added Book: ${title}`);
        Book.#displayBooks(book);
    }

    static #displayBooks(book) {
        const table_container = document.getElementById("table_container");

        const info_container = document.createElement("div");
        info_container.classList.add("information-element-container");
        table_container.append(info_container);

        for (const prop in book) {
            const field_text = document.createElement("div");
            field_text.classList.add("field-text");
            field_text.textContent = book[prop];
            info_container.append(field_text);

            if (book[prop] == book.read) {
                this.#readButton(book, info_container);
                field_text.remove();
            }
        }
    }

    static #readButton(book, info) {
        const info_container = info;
        const field_container = document.createElement("div");
        const button_container = document.createElement("div");
        const read_button = document.createElement("button");

        field_container.classList.add("field-text");
        button_container.classList.add("buttons-container");
        read_button.classList.add("read-button");

        info_container.append(field_container);
        field_container.append(button_container);
        button_container.append(read_button);

        read_button.textContent = book.read;

        switch (book.read) {
            case "Read":
                read_button.classList.add("green-button");
                break;
            case "Not Read":
                read_button.classList.remove("green-button");
                break;
        }

        const delete_button = document.createElement("button");
        delete_button.classList.add("close-button");
        button_container.append(delete_button);
        let devImage = new Image();
        devImage.src = "images/trash-can-outline.svg";
        devImage.classList.add("delete-icon");
        delete_button.append(devImage);

        delete_button.addEventListener("mouseup", () => {
            info_container.remove();
            for (let i = 0; i < this.#library.length; i++) {
                if (this.#library[i] == book) {
                    this.#library.splice(i, 1);
                    console.log(`Removed book: ${book.title}`);
                }
            }
        });

        read_button.addEventListener("mouseup", () => {
            switch (book.read) {
                case "Read":
                    read_button.textContent = "Not Read";
                    book.read = "Not Read";
                    read_button.classList.remove("green-button");
                    break;
                case "Not Read":
                    read_button.textContent = "Read";
                    book.read = "Read";
                    read_button.classList.add("green-button");
                    break;
            }
        });

    }

}

Book.form.addEventListener("submit", (event) => {
    event.preventDefault();
    Book.addBookToLibrary(Book.titleInput.value, Book.authorInput.value, Book.pagesInput.value, Book.readInput.options[Book.readInput.selectedIndex].value);
    Book.form.reset();
});