$(document).ready(function() {
  todoList.init();
});

var todoList = {
  init: function() {
    todoList.events();
  },

  events: function() {
    // submit on new todo form, add new todo to data array and DOM
    $("form.new").on("submit", function(event) {
      event.preventDefault();
      if ($(this).find('input').val()) {
        todoList.addTodo(todoList.grabNewTodo());
        todoList.addTodosToDom(todoList.getAllTodos());
        todoList.displayItemsLeft();
      }
    });

    // submit on todo item form, edit item in data array and reset DOM
    $("span").on("submit", "form", function(event) {
      event.preventDefault();
      var newText = $(this).find('input').val();
      var idx = $(this).children('.todo-box').attr('data-idx');
      todoList.editTodo(idx, newText);
      todoList.addTodosToDom(todoList.getAllTodos());
      todoList.displayItemsLeft();
    });

    // click check circle, toggle completed in CSS and data
    $('span').on('click', '.check-circle', function(event) {
      $thisTodo = $(this).closest('.todo-box');
      thisIdx = $thisTodo.attr('data-idx');
      if ($thisTodo.hasClass('completed')) {
        $thisTodo.removeClass('completed');
        todoList.getAllTodos()[thisIdx].completed = false;
      }
      else {
        $thisTodo.addClass('completed');
        todoList.getAllTodos()[thisIdx].completed = true;
      }
      todoList.displayItemsLeft();
    });

    // filter todo items by all/active/completed
    $('nav').on('click', 'li', function(event) {
      if (!$(this).hasClass('current')) {
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
        if ($(this).hasClass("view-all")) {
          todoList.addTodosToDom(todoList.getAllTodos());
        }
        else if ($(this).hasClass("view-active")) {
          todoList.addTodosToDom(todoList.getActiveTodos());
        }
        else {
          todoList.addTodosToDom(todoList.getCompletedTodos());
        }
      }
    });

    // clear completed items from data and DOM
    $('.clear-completed').on('click', function(event) {
      todos = todoList.getActiveTodos();
      todoList.addTodosToDom(todoList.getAllTodos());
      todoList.displayItemsLeft();
    });
  },

  // get all todo items
  getAllTodos: function() {
    return todos;
  },

  // filter all todo items by active
  getActiveTodos: function() {
    var activeTodos = _.filter(todoList.getAllTodos(), function(todo) {
      return todo.completed === false;
    });
    return activeTodos;
  },

  // filter all todo items by completed
  getCompletedTodos: function() {
    var completedTodos = _.filter(todoList.getAllTodos(), function(todo) {
      return todo.completed === true;
    });
    return completedTodos;
  },

  // grab new todo item object from new todo input
  grabNewTodo: function() {
    var newTodo = $('input[name="newTodo"]').val();
    $('input[name="newTodo"]').val("");
    return {
      text: newTodo,
      completed: false,
    };
  },

  // replace todo item text at given index with new text
  editTodo: function(idx, newText) {
    todoList.getAllTodos()[idx].text = newText;
  },

  // add given todo item to data
  addTodo: function(newTodo) {
    todos.push(newTodo);
  },

  // remove todo item at given index from data
  deleteTodo: function(idx) {
    todos.splice(idx, 1);
  },

  // DOES NOT WORK
  // remove all completed todo items from data
  clearCompletedTodos: function() {
    _.each(todoList.getCompletedTodos(), function(completedTodo) {
      todoList.deleteTodo(completedTodo.idx);
    });
    todoList.addTodosToDom(todoList.getAllTodos());
},

  // create HTML string for active todo item
  createActiveTodoStr: function(todo) {
    var todoTempl = _.template(templates.activeTodo);
    return todoTempl(todo);
  },

  // create HTML string for completed todo item
  createComplTodoStr: function(todo) {
    var complTodoTempl = _.template(templates.complTodo);
    return complTodoTempl(todo);
  },

  // add given todo item to target HTML element
  addTodoToDom: function(todo, $target) {
    if (todo.completed === true) {
      $target.append(todoList.createComplTodoStr(todo));
    }
    else {
      $target.append(todoList.createActiveTodoStr(todo));
    }
  },

  // add given todo items to DOM
  addTodosToDom: function(todos) {
    $('span').html('');
    _.each(todos, function (todo, idx) {
      todo.idx = idx;
      todoList.addTodoToDom(todo, $('span'));
    });
  },

  // display items left HTML
  displayItemsLeft: function() {
    var itemsLeft = todoList.getActiveTodos().length;
    if (todoList.getAllTodos().length === 0){
      $('.items-left').html("");
    }
    else if (itemsLeft === 0) {
      $('.items-left').html("<p>All complete</p>");
    }
    else {
      $('.items-left').html("<p>" + itemsLeft + (itemsLeft === 1 ? " item left</p>" : " items left</p>"));
    }
  }
};
