const gallery = (function() {
  let currentPhotoId = 1;
  let templates = {};
  let photos;

  function bindEvents() {
      $('.next').click(function(e) {
        e.preventDefault();
        getNextPhoto();
      });

      $('.prev').click(function(e) {
        e.preventDefault();
        getPreviousPhoto();
      });

      $('section > header').on('click', '.actions a', function(e) {
        e.preventDefault();
        let $target = $(this);
        // let $target = $(e.target);
        let index = $('#slideshow').find('figure:visible').index();
        let currentPhoto = photos[index];
        let data = 'photo_id=' + $target.attr('data-id');
        $.post($target.attr('href'), data, function(json) {
          let text = $target.text();
          $target.text(text.replace(/\d+/, json.total));
          currentPhoto[$target.attr('data-property')] = json.total;
        });
      });

      $('form').submit(function(e) {
        e.preventDefault();
        let formData = $('form').serialize();
        $('form').get(0).reset();
        postCommentFor(formData);
      });
  }

  function postCommentFor(data) {
    $.post('/comments/new', data, function(json) {
      $('#comments ul').append(templates.comment(json));
    });
  }

  function getCurrentPhoto() {
    return  $(`figure[data-id="${currentPhotoId}"]`);
  }

  function getPreviousPhoto() {
    let $currentPhoto = getCurrentPhoto();
    let $prev = $currentPhoto.prev();
    if ($prev.length !== 1) {
      $prev = $('#slides figure:last');
      currentPhotoId = 3;
    } else {
      currentPhotoId = +$prev.attr('data-id');
    }
    $currentPhoto.fadeOut(500);
    $prev.fadeIn(500);
    renderPhotoInfo(photoIndexFor(currentPhotoId));
    getComments($prev.attr('data-id'));
  }

  function getNextPhoto() {
    let $currentPhoto = getCurrentPhoto();
    let $next = $currentPhoto.next();
    if ($next.length !== 1) {
      $next = $('#slides figure:first');
      currentPhotoId = +$next.attr('data-id');
    } else {
      currentPhotoId = +$next.attr('data-id');
    }
    $currentPhoto.fadeOut(500);
    $next.fadeIn(500);
    renderPhotoInfo(photoIndexFor(currentPhotoId));
    getComments($next.attr('data-id'));
  }

  function loadTemplates() {
    $('script[type="text/x-handlebars"]').each(function() {
        templates[$(this).attr('id')] = Handlebars.compile($(this).html());
    });
    Handlebars.registerPartial('comment', templates.comment);
  }

  function loadPhotos() {
      $.get("/photos", function(json) {
        photos = json;
        renderPhotos();
        renderPhotoInfo(photoIndexFor(currentPhotoId));
        getComments(json[photoIndexFor(currentPhotoId)].id);
      });
  }

  function photoIndexFor(photoId) {
    return photoId - 1;
  }

  function renderPhotos() {
      $('#slides').html(templates.photos({photos: photos}));
  }

  function renderPhotoInfo(index) {
    $('form input:hidden').val(currentPhotoId);
    $('section > header').html(templates.photo_information(photos[index]));
  }

  function getComments(photoId) {
    let data = "photo_id=" + photoId
    $.get('/comments', data, function(json) {
        $("#comments ul").html(templates.comments({comments: json}));
    });
  }
  return {
    init() {
      bindEvents();
      loadTemplates();
      loadPhotos();
    }
  };
})();

$(gallery.init.bind(gallery));
