// Modify makeList to return an object
function makeList() {
  let list = [];
  return {
    add(todo) {
      if (list.indexOf(todo) !== 0) {
        list.push(todo);
        console.log(todo + ' added!')
      }
    },
    remove(todo) {
      let index = list.indexOf(todo);
      if (index !== -1) {
        let deletedItem = list.splice(index, 1)
        console.log(deletedItem + ' removed!');
      }
    },
    list() {
      if (list.length === 0) {
        console.log('The list is empty');
      } else {
        for (let todo of list) {
          console.log(todo);
        }
      }
    }
  };
}

let list = makeList();
list.add("peas");
// peas added!
list.list();
// peas
list.add("corn");
// corn added!
list.list();
// peas
// corn
list.remove("peas");
// peas removed!
list.list();
// corn