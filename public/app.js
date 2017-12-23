$(() => {
  $.getJSON("/api/todos")
    .then(addTodos)
    .catch(err => alert(err))

  $('#todoInput').keypress(event => {
    if(event.which == 13) {
      createTodo();
    }
  })

  $('#todo-btn').click(createTodo)
})

function addTodos(todos) {
  // add todos to the page
  todos.forEach(addTodo);
}

function addTodo(todo) {
  let checkIcon = $('<span class="icon"><i class="fa fa-check"></i></span>')
  let crossIcon = $('<span class="icon"><i class="fa fa-times"></i></span>')
  let newTodo = $('<li><span class="text">' + todo.name + '</span></li>');
  newTodo.addClass("box")
  if(todo.completed) {
    newTodo.addClass("done")
    checkIcon.addClass("has-text-disabled")
    newTodo.append(checkIcon)
  } else {
    checkIcon.addClass("has-text-success")
    newTodo.append(checkIcon)
  }
  crossIcon.addClass("has-text-danger")
  newTodo.append(crossIcon)
  $(".list").append(newTodo)
}

function createTodo() {
  // send request to create new todo
  let usrInput = $('#todoInput').val();
  $.post('/api/todos', {name: usrInput})
    .then(newTodo => {
      addTodo(newTodo)
      $('#todoInput').val('');
    })
    .catch(err => console.log(err))
}