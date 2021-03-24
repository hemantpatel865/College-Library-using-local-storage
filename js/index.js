

// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function () {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let tableBody = document.getElementById('tableBody');
    let uiString = "";
    notesObj.forEach(function (element, index) {
        uiString += `<tr>
                        
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button  id="${index}" onClick="deleteNote(this.id)" class="btn btn-outline-danger btn-sm">Delete Book</button></td>
                        
                    </tr>`
    })
    
    tableBody.innerHTML = uiString
}

// Implementing display clear function 
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// Implement the validate function
Display.prototype.validate = function(book){
    if (book.name.length<2 || book.author.length<2){
         return false;
    }else {
        return true;
    }
}

Display.prototype.show = function(type, displayMsg){
    let message = document.getElementById('message');
    message.innerHTML =`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message: </strong> ${displayMsg}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    setTimeout(function(){
        message.innerHTML = '';
    }, 2000)
}



// Add submit event_listener to library form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');


    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    
    
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {

        notesObj = JSON.parse(notes);
    }
    let book = new Book(name, author, type);
    notesObj.push(book);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    let display = new Display();

    if(display.validate(book)){

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully submitted');
    } else{
        display.show('danger', 'Sorry! You cannot add this book');
    }
    
    

    e.preventDefault();
}



// Display books while refreshing browser //
let display = new Display();
display.add();


function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {

        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    display.add();

}

