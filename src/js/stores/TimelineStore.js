const Fluxxor = require('fluxxor');
const constants = require('js/constants/AppConstants');

const TodoStore = Fluxxor.createStore({
  initialize() {
    this.timelines = [
      {
        text: 'this is *some* markdown',
        date: '2014-12-31T16:00:00.000Z'
      }
    ];

    this.bindActions(
      constants.ADD_TODO, this.onAddTodo,
      constants.TOGGLE_TODO, this.onToggleTodo,
      constants.CLEAR_TODOS, this.onClearTodos
    );
  },

  onAddTodo(payload) {
    this.todos.push({text: payload.text, complete: false});
    this.emit('change');
  },

  onToggleTodo(payload) {
    payload.todo.complete = !payload.todo.complete;
    this.emit('change');
  },

  onClearTodos() {
    this.todos = this.todos.filter(function(todo) {
      return !todo.complete;
    });
    this.emit('change');
  },

  getState() {
    return {
      todos: this.todos
    };
  }
});

module.exports = TodoStore;
