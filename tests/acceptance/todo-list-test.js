import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-cafe/tests/helpers/start-app';

module('Acceptance | todo list', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /todos', function(assert) {
  visit('/todos');

  andThen(function() {
    assert.equal(currentURL(), '/todos');
  });
});

test('Initial load test', function(assert) {
  visit('/todos');

  server.createList('todo', 10);

  andThen(function() {
    let todoTasks = find('.todo-notComplete input');
    let count = 0;
    for (let i=0; i < todoTasks.length; ++i) {
      ++count;
      assert.equal(todoTasks[i].checked, false, 'isComplete is false');
    }

    let completedTodos = find('.todo-completed input');
    for (let i=0; i < completedTodos.length; ++i) {
      ++count;
      assert.equal(completedTodos[i].checked, true, 'isComplete is true');
    }
  });
});

test('add todo test and make sure it clears', function(assert) {
  visit('/todos');

  let todoText = 'todo test';

  fillIn('#addTodoInput', todoText);
  click('#addBt');

  andThen(function() {
    let todoInput = find ('#addTodoInput');
    assert.equal(todoInput.length, 1, 'Only one textInput is present');
    assert.equal(todoInput[0].value, '', 'text is empty after adding');
    let newTodo = find('.todo-notComplete');
    assert.equal(newTodo.text().trim(), todoText, 'text is correct');
  });
});

// test('complete todo test', function(assert) {
// visit('/todos');
// });
//
// test('uncomplete todo test', function(assert) {
// visit('/todos');
// });
//
// test('add the same todo again', function(assert) {
// visit('/todos');
// });
