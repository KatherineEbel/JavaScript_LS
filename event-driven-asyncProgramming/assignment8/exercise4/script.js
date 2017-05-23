// add a character-counter that updates as a user types
const maxCharacters = 140;
let textarea = document.querySelector('textarea');
let paragraph = document.querySelector('.counter');
let button = document.querySelector('button');

const updateCounter = () => {
  let charsRemaining = maxCharacters - textarea.value.length
  let invalid = charsRemaining < 0;
  paragraph.textContent = `${charsRemaining} characters remaining`;
  textarea.classList.toggle('invalid', invalid);
  button.disabled = invalid;
  // textarea.style.color = count > maxCharacters ? 'red' : 'black';
};

textarea.oninput = updateCounter;