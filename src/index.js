import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const reducer = (count = 0, action) => {
  if (action.type === "add") {
    return count + 1;
  } else if (action.type === "minus") {
    return count - 1;
  } else {
    return count;
  }
};

const store = createStore(reducer);

const onchange = () => {
  number.innerText = store.getState();
};

store.subscribe(onchange);

const handleAdd = () => {
  store.dispatch({ type: "add" });
};

const handleMinus = () => {
  store.dispatch({ type: "minus" });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
