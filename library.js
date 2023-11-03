const myLibrary = [];

const form = document.getElementById("form_container");

const table_container = document.getElementById("table_container");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author
        this.pages = pages
        this.title = read
    }
}

function addBookToLibrary() {
    // Object to array handler
    const book = new Book();



    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    if (title.value == " " || author.value == "" || pages.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        // perform operation with form input
        book.title = title.value;
        book.author = author.value;
        book.pages = pages.value;
        book.read = read.options[read.selectedIndex].value;
        myLibrary.push(book);
    }

    // -----------------------

    // Book to client handler
    const info_container = document.createElement("div");

    info_container.classList.add("information-element-container");
    table_container.append(info_container);

    for (let i = 0; i < 3; i++) {
        const field_text = document.createElement("div");
        field_text.classList.add("field-text");

        info_container.append(field_text);
        field_text.textContent = Object.values(book)[i];
        if (i == 2) {
            const field_text = document.createElement("div");
            field_text.classList.add("field-text");

            info_container.append(field_text);

            const read_button = document.createElement("button");
            read_button.classList.add("read-button");
            if (book.read == "Read") { read_button.classList.add("green-button"); } else { read_button.classList.remove("green-button"); }
            read_button.textContent = book.read;


            const buttons_container = document.createElement("div");
            buttons_container.classList.add("buttons-container");

            field_text.append(buttons_container);

            buttons_container.append(read_button);

            const delete_button = document.createElement("button");
            delete_button.classList.add("close-button");

            let devImage = new Image();
            devImage.src = "images/trash-can-outline.svg";
            devImage.classList.add("delete-icon")
            delete_button.append(devImage);

            buttons_container.append(delete_button);

            console.log(Object.keys(myLibrary));

            delete_button.addEventListener("mouseup", (e) => {
                console.log(myLibrary);
                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i] == book) {
                        myLibrary.splice(i, 1);
                        document.querySelectorAll(".information-element-container")[i].remove();
                    }
                }
            })

            read_button.addEventListener("mouseup", (e) => {
                if (book.read == "Read") {
                    read_button.textContent = "Not Read";
                    book.read = "Not Read";
                    read_button.classList.remove("green-button");
                } else {
                    read_button.textContent = "Read";
                    book.read = "Read";
                    read_button.classList.add("green-button");
                }
            })
        }
    }
}



form.addEventListener("submit", (event) => {
    event.preventDefault();

    addBookToLibrary();
    form.reset();
})