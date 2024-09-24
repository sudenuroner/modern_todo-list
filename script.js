const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

//local storege dan varolan görevleri kontrol et ve listeyi başlat
const savedTodosJSON = localStorage.getItem('todos');
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON): [];

for (const todo of savedTodos) {
   addTodoToList(todo);
}
     
console.log(Date.now());
// yeni bir görev eklemek için fonksiyon
function addTodo(){
    const todoText = todoInput.value.trim();
    if (todoText == "") return;

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };

    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
    addTodoToList(todo);
    todoInput.value = "";
}

// görevin tamamlandı durumunu değiştirmek için fonksiyon
function toggleComplete(id){
    const todo = savedTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed; // true = false, false = true yap.

    localStorage.setItem("todos", JSON.stringify(savedTodos));
    const todoElement = document.getElementById(id)
    todoElement.classList.toggle('completed', todo.completed);
}

// görevi düzenleme fonksiyonu
function editTodo(id){
    const todo = savedTodos.find((todo) => todo.id === id);
    const newText = prompt("Görevi Düzenleyin:", todo.text);
    if(newText !== null){
        todo.text = newText.trim();
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        const todoElement = document.getElementById(id);
        todoElement.querySelector("span").textContent = newText;
    }
}

// görevi listeden kaldırma fonksiyonu
function removeTodo(id){
    const todoElement = document.getElementById(id);
    todoElement.style.animation = 'fadeOut 0.3s ease';

    setTimeout(() => {
        savedTodos.splice(savedTodos.findIndex((todo) => todo.id === id), 1);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        todoElement.remove();
    }, 300);
}

// listeye ekleme fonksiyonu
function addTodoToList(todo){
    const li = document.createElement("li");
    li.setAttribute('id', todo.id);
    li.innerHTML = `
        <span title="${todo.text}">${todo.text}</span>
        <button onclick="toggleComplete(${todo.id})"><i class="fa-solid fa-check"></i></button>
        <button onclick="editTodo(${todo.id})"><i class="fa-regular fa-pen-to-square"></i></button>
        <button onclick="removeTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
    `;

    li.classList.toggle("completed", todo.completed);
    todoList.appendChild(li);
}