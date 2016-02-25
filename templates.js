var templates = [];

templates.activeTodo = [
  '<form class="">',
    '<div class="todo-box" data-idx="<%= idx %>">',
      '<div class="icon-box">',
        '<div class="check-circle"></div>',
      '</div>',
      '<div class="input-box">',
        '<input type="text" name="name" value="<%= text %>" readonly="true" onclick="this.readOnly=false">',
      '</div>',
    '</div>',
  '</form>'
].join("");

templates.complTodo = [
  '<form class="">',
    '<div class="todo-box completed" data-idx="<%= idx %>">',
      '<div class="icon-box">',
        '<div class="check-circle"></div>',
      '</div>',
      '<div class="input-box">',
        '<input type="text" name="name" value="<%= text %>" readonly="true" onclick="this.readOnly=false">',
      '</div>',
    '</div>',
  '</form>'
].join("");
