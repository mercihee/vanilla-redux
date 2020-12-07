import { createStore } from "redux";

// count
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const reducer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const store = createStore(reducer);

const onchange = () => {
  number.innerText = store.getState();
};

store.subscribe(onchange);

const handleAdd = () => {
  store.dispatch({ type: ADD });
};

const handleMinus = () => {
  store.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// to do
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const toDoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};

const toDoStore = createStore(toDoReducer);

const paintToDos = () => {
  const toDos = toDoStore.getState();
  ul.innerText = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

toDoStore.subscribe(paintToDos);

const dispatchAddToDo = text => {
  toDoStore.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  toDoStore.dispatch(deleteToDo(id));
};

const onSubmit = e => {
  e.preventDefault();
  let toDo = "";
  if (input.value) {
    toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
  }
};

form.addEventListener("submit", onSubmit);
