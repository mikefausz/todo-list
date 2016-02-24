// get all todo items
function getAllTodos() {
  return todos;
}

// filter all todo items by active
function getActiveTodos() {
  var activeTodos = _.filter(getAllTodos(), function(todo) {
    return todo.completed === false;
  });
  return activeTodos;
}

// filter all todo items by completed
function getCompletedTodos() {
  var completedTodos = _.filter(getAllTodos(), function(todo) {
    return todo.completed === true;
  });
  return completedTodos;
}

// grab new todo item object from new todo input
function grabNewTodo() {
  var newTodo = $('input[name="newTodo"]').val();
  $('input[name="newTodo"]').val("");
  return {
    text: newTodo,
    completed: false,
  };
}

// replace todo item text at given index with new text
function editTodo(idx, newText) {
  getAllTodos()[idx].text = newText;
}

// add given todo item to data
function addTodo(newTodo) {
  todos.push(newTodo);
}

// remove todo item at given index from data
function deleteTodo(idx) {
  todos.splice(idx, 1);
}

// DOES NOT WORK?
// remove all completed todo items from data
function clearCompletedTodos() {
  _.each(getCompletedTodos(), function(completedTodo) {
    deleteTodo(completedTodo);
  });
  addTodosToDom(getAllTodos());
}

// create HTML string for active todo item
function createTodoStr(todo) {
  var todoTempl = _.template($('#todoTempl').html());
  return todoTempl(todo);
};

// create HTML string for completed todo item
function createComplTodoStr(todo) {
  var complTodoTempl = _.template($('#complTodoTempl').html());
  return complTodoTempl(todo);
};

// add given todo item to target HTML element
function addTodoToDom(todo, $target) {
  if (todo.completed === true) {
    $target.append(createComplTodoStr(todo));
  }
  else {
    $target.append(createTodoStr(todo));
  }
}

// add given todo items to DOM
function addTodosToDom(todos) {
  $('span').html('');
  _.each(todos, function (todo, idx) {
    todo.idx = idx;
    addTodoToDom(todo, $('span'));
  })
}

// display items left HTML
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

// submit on new todo form, add new todo to data array and DOM
$("form.new").on("submit", function(event) {
  event.preventDefault();
  addTodo(grabNewTodo());
  addTodosToDom(getAllTodos());
  displayItemsLeft();
});

// submit on todo item form, edit item in data array and reset DOM
$("span").on("submit", "form", function(event) {
  event.preventDefault();
  var newText = $(this).find('input').val();
  var idx = $(this).children('.todo-box').attr('data-idx');
  editTodo(idx, newText);
  addTodosToDom(getAllTodos());
  displayItemsLeft();
});

// click check circle, toggle completed in CSS and data
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

// filter todo items by all/active/completed
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

// clear completed items from data and DOM
$('.clear-completed').on('click', function(event) {
  todos = getActiveTodos();
  addTodosToDom(getAllTodos());
  displayItemsLeft();
});
