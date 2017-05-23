// walk() calls the Function 'callback' once for each node
function walk(node, callback) {
  callback(node); // do something with node
  for (let i = 0; i < node.childNodes.length; i++) {  // for each child node
    walk(node.childNodes[i], callback); // recursively call walk
  }
}

// Exercises

// 1.
walk(document, (node) => {
  if (node.tagName === 'H1') {
    node.style.color = 'red';
    node.style.fontSize = '48px';
  }
});

// 2. Count and log the paragraphs on the page
let count = 0;
walk(document, (node) => {
  if(node.tagName === 'P') {
    count++;
  }
});

console.log(count);

// 3. Retrieve the first word from each paragraph on the page and log the entire list.
let letters = [];
walk(document, (node) => {
  if(node.tagName === 'P') {
    letters.push(node.textContent.trim().split(' ')[0]);
  }
});
console.log(letters);

// 4. Add the class stanza to each paragraph except the first.

//walk(document, (node) => {
//    if(node.tagName === 'P') {
//    if (node.previousElementSibling.tagName !== 'H1') {
//      node.classList.add('stanza');
//    }
//  }
//});

// Next problems use a polar bear wiki web page
// 5. Count the images on the page, then count the PNG images.
    // log boh results

let imageCount = 0;
let pngCount = 0;
walk(document, (node) => {
  if (node.tagName === 'IMG') {
    imageCount++;
    if (node.getAttribute('src').endsWith('.png')) {
      pngCount++;
    }
  }
});

console.log('Images: ', imageCount, 'PNG\'s: ', pngCount);

// 6. Change the link color to red for every link on the page.

walk(document, (node) => {
  if (node.tagName === 'A') {
    node.style.color = 'red';
  }
});

