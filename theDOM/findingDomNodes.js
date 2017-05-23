function walk(node, callback) {
  callback(node); // do something with node
  for (let i = 0; i < node.childNodes.length; i++) {  // for each child node
    walk(node.childNodes[i], callback); // recursively call walk
  }
}
// Exercises Group 1
  // 1. Write a Javascript function that returns the p Elements in this DOM
    // represented by this HTML (domNodes.html):
  function getParagraphElements() {
    let paragraphs = [];
    walk(document, (node) => {
      if (node.tagName === 'P') {
        paragraphs.push(node);
      }
    });
    return paragraphs;
  }
  // let pTags = document.getElementsByTagName('p');
  // console.log(pTags);
  //let pTags = getParagraphElements();
  //console.log(pTags);

// 2. Write a JavaScript Function that adds the CSS class "article-text" to
    // every p tag in this HTML
function addClass(className, toElements) {
  return toElements.map(element => {
    element.classList.add(className)
    return element;
  });
}
//let pTags = getParagraphElements();
// console.log(pTags);
// let articles = addClass('article-text', pTags);
// 3. Write a function getElementsByName that returns an Array of all elements
  // with a given tagName. Use that function to add a CSS class of article-text for
  // each paragraph.

  function getElementsByTagName(name) {
    let nodes = Array.from(document.body.childNodes)
    return  nodes.filter(node => node.tagName === name.toUpperCase());
  }
  //getElementsByTagName('p').forEach(p => p.classList.add('article-text'));

// Exercises Group 2

  // 1. Update the code in above exercise to use the built-in getElementsByTagName
    // method on document
  //let paragraphs = Array.from(document.getElementsByTagName('p'));
  //paragraphs.forEach(p => p.classList.add('article-text'));

  //2. Update the code from exercise 1 to add the article-text class to paragraphs
    // inside <div class="intro"> and nowhere else.
    let divs = Array.from(document.getElementsByClassName('intro'));
    divs.forEach(div => {
      let paragraphs = Array.from(div.childNodes).filter(node => node.tagName === 'P');
      paragraphs.forEach(p => p.classList.add('article-text'));
    });

