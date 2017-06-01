
$(function() {
  const items = [{
    "title": "The Legend of Zelda: Majora's Mask 3D",
    "id": 1,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 2,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 3,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 4,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 5,
    "category": "Xbox One"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 6,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 7,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 8,
    "category": "Xbox One"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 9,
    "category": "PlayStation 4"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 10,
    "category": "Xbox One"
  }];

  let $gameList = $('.game-list');
  let $categoryList = $('.category-list');
  let gameTitles = items.map(item => {
    return `<li data-id="${item.id}">${item.title} for ${item.category}</li`;
  });
  let categories = items.reduce((arr, item) => {
    if (!arr.includes(item.category)) {
      arr.push(item.category);
      return arr;
    } else {
      return arr;
    }
  }, []).map(category => `<li>${category}</li>`);
  gameTitles.forEach(title => $gameList.append(title));
  categories.forEach(category => $categoryList.append(category));

  $('aside li').each(function() {
    let $el = $(this);
    $el.prepend(`<input type="checkbox" checked/>`);
  });

  $(':checkbox').change(function(event) {
    let category = $(this).parent('li').text();
    toggleItemsFor(category);
  });

  function toggleItemsFor(category) {
    let selectedItems = items.filter((item) => item.category === category)
                             .map(item => item.id);
    $('.game-list li').filter(function() {
      return selectedItems.includes(+$(this).attr('data-id'));
    }).toggle();
  }
});
