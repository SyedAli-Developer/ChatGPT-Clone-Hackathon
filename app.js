

// Dropdown function started
const dropBtn = document.querySelector(".Dropdown-title");
const droplist = document.querySelector(".list");

dropBtn.addEventListener('click', checkDisplay)

displayNone()
function checkDisplay() {
    if(droplist.style.display == 'none'){
        displayBlock()
    }else{
        displayNone()
    }
}
function displayNone() {
    droplist.style.display = 'none'
}
function displayBlock() {
    droplist.style.display = 'block'
}
// Dropdown function ended

// Temperary Text Started 
const theading = document.querySelector("#temp-heading");

function randomQ() {
    let num = Math.floor(Math.random() * 6);
    
    if (num === 0) {
        theading.textContent = "How can I help you?";
    } else if (num === 1) {
        theading.textContent = "What’s in your mind today?";
    } else if (num === 2) {
        theading.textContent = "What’s on the agenda today?";
    } else if (num === 3) {
        theading.textContent = "Where should we begin?";
    } else if (num === 4) {
        theading.textContent = "What can I help with?";
    } else if (num === 5) {
        theading.textContent = "Ready when you are.";
    } else {
        theading.textContent = "What are you working on?";
    }
}
randomQ()
// Temperary Text Ended 



// call and mic function started here 
const input = document.getElementById('user-input');
const submit = document.getElementById('sent-or-call');
setInterval(() => {
    if (input.value == '') {
        submit.innerHTML = `<img src="./Assets/images/call.png" alt="">`
    } else {
        submit.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
        submit.style.color = 'Black'
    }

}, 1);
// call and mic function eneded here 




