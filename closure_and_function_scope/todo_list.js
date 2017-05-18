/* We'll build a simple todo list program using the techniques we've seen in
this assignment. Write a makeList function that returns a new function that
implements a todo list. The returned function should have the following behavior:

When called with an argument that is not already on the list, it adds that
argument to the list.
When called with an argument that is already on the list, it removes the
element from the list.
When called without arguments, it logs all items on the list. If the list
is empty, it logs an appropriate message. */

function makeList() {
  let list = [];
  return function(todo){
    if (!todo) {
      if (list.length == 0) {
        console.log('The list is empty');
      } else {
        for (let item of list) {
          console.log(item)
        }
      }
      return;
    }
    let todo_index = list.indexOf(todo);
    if (todo_index == -1) {
      list.push(todo)
      console.log(todo + ' added!');
    } else {
      list.splice(todo_index, 1);
      console.log(todo + ' removed!')
    }
  }
}

let list = makeList();
list();
list('make breakfast');
list('read book');
list();
list('make breakfast')
list();