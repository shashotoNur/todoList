//----------------------------------Select DOM--------------------------------------
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//--------------------------------Event Listeners-----------------------------------
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//-----------------------------------Functions--------------------------------------
function addTodo(event)
{
  // prevent natural behaviour
  event.preventDefault();

  // create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  // save to local storage
  saveLocalTodos(todoInput.value);
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  // create completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // add final Todo
  todoList.appendChild(todoDiv);
}


function deleteTodo(event)
{
  const item = event.target;

  // check class of button
  if (item.classList[0] === "trash-btn")
  {
    const todo = item.parentElement;

    // animation before removing
    todo.classList.add("fall");

    // finally removing
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () =>
      {todo.remove();});
  }

  // add class completed to the todo
  if (item.classList[0] === "complete-btn")
  {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

}


function filterTodo(event)
{
  const todos = todoList.childNodes;

  todos.forEach((todo) =>
  {
    // adding respective class
    switch (event.target.value)
    {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed"))
          todo.style.display = "flex";
        else
          todo.style.display = "none";
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed"))
          todo.style.display = "flex";
        else
          todo.style.display = "none";
        break;
    }
  });
}


function saveLocalTodos(todo)
{
  let todos;

  // finding todos
  if (localStorage.getItem("todos") === null)
    todos = [];
  else
    todos = JSON.parse(localStorage.getItem("todos"));

  // saving todos as json string
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function removeLocalTodos(todo)
{
  let todos;

  // finding todos
  if (localStorage.getItem("todos") === null)
    todos = [];
  else
    todos = JSON.parse(localStorage.getItem("todos"));

  // removing todos
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos()
{
  let todos;

  // finding todos
  if (localStorage.getItem("todos") === null)
    todos = [];
  else
    todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach(function(todo)
  {
    // create a todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // add todo in list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    // create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // add todo at last
    todoList.appendChild(todoDiv);
  });
}