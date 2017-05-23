// update x on mouse click
document.onclick = (event) => {
  let x = document.querySelector('.x');
  x.style.left = `${event.clientX}px`;
  x.style.top = `${event.clientY}px`;
};

document.onmousemove = (event) => {
  let x = document.querySelector('.x');
  x.style.left = `${event.clientX}px`;
  x.style.top = `${event.clientY}px`;
};

// Update the code to change the color of the red X to blue
// if the b key is pressed, green if the g key is pressed.
// or back to red if the r key is pressed
document.onkeypress = (event) => {
  let horizontal = document.querySelector('.horizontal');
  let vertical = document.querySelector('.vertical');
  let key = event.key;
  if(key === 'b') {
    horizontal.style.background = 'blue';
    vertical.style.background = 'blue';
  } else if (key === 'r') {
    horizontal.style.background = 'red';
    vertical.style.background = 'red';
  } else if (key === 'g') {
    horizontal.style.background = 'green';
    vertical.style.background = 'green';
  }
};

