const heading = document.querySelector(".responseh-heading");

let num = Math.floor(Math.random() * 6) + 1;
console.log(num);

if (num === 1) {
  heading.textContent = "Where should we begin?";
}
else if (num === 2){
    heading.textContent = "What’s on the agenda today?"
}
else if (num === 3){
    heading.textContent = "What are you working on?"
}
else if (num === 4)
