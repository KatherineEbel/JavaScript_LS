document.addEventListener('DOMContentLoaded', function() {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  let cursorInterval;

  textField.onclick = function(event) {
    event.stopPropagation();
    textField.classList.add('focused');
    cursorInterval = setInterval(function() {
      textField.classList.toggle('cursor');
    }, 500);
  };

  document.onclick = function(event) {
    clearInterval(cursorInterval);
    if (textField.classList.contains('focused')) {
      textField.classList.remove('focused', 'cursor');
    }
  };

  document.onkeyup = function(event) {
    if (textField.classList.contains('focused')) {
      if (event.key === 'Backspace') {
        content.textContent = content.textContent
                                         .substring(0, content.textContent.length - 1);
      } else if (event.key.length === 1) {
        content.textContent += event.key;
      }
    }
  }
});