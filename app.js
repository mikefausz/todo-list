function getAllTodos() {
  return todos;
}

function getActiveTodos() {
  var activeTodos = _.filter(getAllTodos(), function(todo) {
    return todo.completed === false;
  });
  return activeTodos;
}

function getCompletedTodos() {
  var completedTodos = _.filter(getAllTodos(), function(todo) {
    return todo.completed === true;
  });
  return completedTodos;
}

function grabNewTodo() {
  var newTodo = $('input[name="newTodo"]').val();
  $('input[name="newTodo"]').val("");
  return {
    text: newTodo,
    completed: false,
  };
}

function addTodo(newTodo) {
  todos.push(newTodo);
}

function deleteTodo(idx) {
  todos.splice(idx, 1);
}

function clearCompletedTodos() {
  _.each(getCompletedTodos(), function(completedTodo) {
    deleteTodo(completedTodo);
  });
  addTodosToDom(getAllTodos());
}

function createTodoStr(todo) {
  var todoTempl = _.template($('#todoTempl').html());
  return todoTempl(todo);
};

function createComplTodoStr(todo) {
  var complTodoTempl = _.template($('#complTodoTempl').html());
  return complTodoTempl(todo);
};

function addTodoToDom(todo, $target) {
  if (todo.completed === true) {
    $target.append(createComplTodoStr(todo));
  }
  else {
    $target.append(createTodoStr(todo));
  }
}

function addTodosToDom(todos) {
  $('span').html('');
  _.each(todos, function (todo, idx) {
    todo.idx = idx;
    addTodoToDom(todo, $('span'));
  })
}

function displayItemsLeft() {
  var itemsLeft = getActiveTodos().length;
  if (getAllTodos() === 0){
    $('.items-left').html("");
  }
  else if (itemsLeft === 0) {
    $('.items-left').html("<p>All items completed</p>");
  }
  else {
    $('.items-left').html("<p>" + itemsLeft + (itemsLeft === 1 ? " item left</p>" : " items left</p>"));
  }
}

$('form').on("submit", function(event) {
  event.preventDefault();
  addTodo(grabNewTodo());
  addTodosToDom(getAllTodos());
  displayItemsLeft();
});

$('span').on('click', '.check-circle', function(event) {
  $thisTodo = $(this).parent()
  thisIdx = $thisTodo.attr('data-idx');
  if ($thisTodo.hasClass('completed')) {
    $thisTodo.removeClass('completed');
    getAllTodos()[thisIdx].completed = false;
  }
  else {
    $thisTodo.addClass('completed');
    getAllTodos()[thisIdx].completed = true;
  }
  displayItemsLeft();
});

$('nav').on('click', 'li', function(event) {
  if (!$(this).hasClass('current')) {
    $(this).addClass('current');
    $(this).siblings().removeClass('current');
    if ($(this).hasClass("view-all")) {
      addTodosToDom(getAllTodos());
    }
    else if ($(this).hasClass("view-active")) {
      addTodosToDom(getActiveTodos());
    }
    else {
      addTodosToDom(getCompletedTodos());
    }
  }
  else {
  }
});

$('.clear-completed').on('click', function(event) {
  todos = getActiveTodos();
  addTodosToDom(getAllTodos());
  displayItemsLeft();
});
