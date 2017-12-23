$(() => {
  $.getJSON("/api/todos")
    .then(addTodos)
    .catch(err => alert(err))

  $('#todoInput').keypress(event => {
    if(event.which == 13) {
      createTodo()
    }
  })

  $('#todo-btn').click(createTodo)

  $('.list').on('click', '.icon .fa-times', function(event) {
    event.stopPropagation()
    let liObj = $(this).parent().parent()
    removeTodo(liObj)
  })

  $('.list').on('click', '.icon .fa-check', function() {
    let liObj = $(this).parent().parent()
    checkTodo(liObj)
  })
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
  newTodo.data('id', todo._id)
  newTodo.data('completed', todo.completed)
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

function removeTodo(liObj) {
  // remove todo
  let liId = liObj.data('id')
  let deleteUri = '/api/todos/' + liId
  $.ajax({ method: 'DELETE', url: deleteUri })
    .then(data => {
      liObj.remove()
      console.log(data)
    })
    .catch(err => console.log(err))
}

function checkTodo(liObj) {
  // check off todo
  let liId = liObj.data('id')
  let liCompleted = liObj.data('completed')
  let updateData = {completed: !liCompleted}
  let checkUri = '/api/todos/' + liId
  $.ajax({ method: 'PUT', url: checkUri, data: updateData })
    .then(data => {
        liObj.toggleClass('done')
        liObj.data('completed', !liCompleted)
    })
}