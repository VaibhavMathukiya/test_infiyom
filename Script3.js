const white = document.getElementById("white");
const aqua = document.getElementById("aqua");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const red = document.getElementById("red");

const lorem = document.getElementById("lorem");

aqua.addEventListener("click", (e) => {
  e.preventDefault();
  //   debugger;
  lorem.style.backgroundColor = "aqua";
  lorem.style.color = "white";
});

white.addEventListener("click", (e) => {
  e.preventDefault();
  //   debugger;
  lorem.style.backgroundColor = "white";
  lorem.style.color = "blue";
});

blue.addEventListener("click", (e) => {
  e.preventDefault();
  //   debugger;
  lorem.style.backgroundColor = "blue";
  lorem.style.color = "green";
});

green.addEventListener("click", (e) => {
  e.preventDefault();
  //   debugger;
  lorem.style.backgroundColor = "green";
  lorem.style.color = "red";
});

red.addEventListener("click", (e) => {
  e.preventDefault();
  // debugger;
  lorem.style.backgroundColor = "red";
  lorem.style.color = "aqua";
});
