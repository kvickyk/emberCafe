import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('todo');
  },

  actions: {
    addTodoAction: function(newTodoItem) {
      console.log("New Todo: " + newTodoItem);

      let todosList = this.store.peekAll('todo');

      let alreadyExists = false;
      todosList.forEach(function(todo) {
        if (todo.get('name') === newTodoItem) {
          alreadyExists = true;
        }
      });

      if (!alreadyExists) {
        this.controller.set('alreadyExists', false);
        console.log('Adding record...');
        // Add record
        let todoRecord = this.store.createRecord('todo', {
          name: newTodoItem,
          isComplete: false
        });

        //save to server
        todoRecord.save();

        //reset field
        this.controller.set('addTodoInput', '');
      } else {
        this.controller.set('alreadyExists', true);
        console.log('record already exists');
      }
    },

    onTodoComplete: function(itemTodo) {
      itemTodo.set('isComplete', !itemTodo.get('isComplete'));
      itemTodo.save();
      console.log ('Saved: ' + itemTodo.get('name'));
    }
  }
});
