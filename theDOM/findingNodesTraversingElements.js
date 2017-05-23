// 1. Write JS code to retrieve a word count for each h2 heading on the page
const getH2WordCount = () => {
  let headers = Array.from(document.querySelectorAll('h2'));
  return headers.map(header => header.textContent.split(' ').length)
};

let count = getH2WordCount();
console.log(count);

// 2. Use three dieferent DOM methods to retrieve a reference to the div
// element that contained the table of contents.

//document.getElementById("toc");
//document.querySelectorAll(".toc")[0];
//document.querySelector("#toc")

// 3. Write code to change the color for every other link in the table of
  // contents green.
  let targetLinks = Array.from(document.querySelectorAll('#toc a'));
  targetLinks.forEach( (link, index) => {
    if (index % 2 !== 0) {
      link.style.color = 'green';
    }
  });

// 4. Write code to retrieve the text of every thumbnail caption on the page.

//const thumbCaptions = Array.from(document.querySelectorAll('.thumbcaption'));
//const captionTextValues = thumbCaptions.map(caption => caption.textContent.trim());
//console.log(captionTextValues);

// 5. create a function that extracts key value pairs for the scientific
// classification of the polar bear. Group by Kingdom, Phylum, Class, Order,
// Family, Genus, Species
function getClassification() {
  // Get the table with class "infobox biota"
  let rows = Array.from(document.querySelectorAll('.infobox.biota tbody tr'));
  let classificationRows = rows.filter((row, index) => index > 4 && index <= 12);
  return classificationRows.map(row => row.innerText)
                    .reduce( (obj, text) => {
                      let index = text.indexOf(':');
                      let key = text.slice(0, index);
                      let value = text.slice(index + 1).trim();
                      obj[key] = value;
                      return obj;
                    }, {});
}

let sciClass = getClassification()
console.log(sciClass);
