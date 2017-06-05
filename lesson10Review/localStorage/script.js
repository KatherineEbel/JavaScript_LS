$(function() {

  $('nav li').on('click', function(e) {
    e.preventDefault();
    let $li = $(this);
    setActiveContentFor($li);
  });

  $(':radio').on('change', function(e) {
    e.preventDefault();
    let color = $(this).val();
    $(document.body).css({background: color})
    localStorage.setItem('backgroundColor', color)
  });
  
  $(window).on('unload', function() {
    let message = $('textarea').val().trim();
    localStorage.setItem('message', message);
  });

  function setActiveContentFor($li) {
    $('nav').find('.active').toggleClass('active');
    $li.toggleClass('active');
    $('article').hide().eq($li.index()).show();
    localStorage.setItem('activeTab', $li.index());
  }

  function setActiveTab() {
    let activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
      $('nav li').eq(activeTab).click();
    }
  }

  function setMessage() {
    let message = localStorage.getItem('message') || '';
    $('textarea').text(message);
  }

  function setBackgroundColor() {
    let backgroundColor = localStorage.getItem('backgroundColor');
    $('input[type=radio]').filter(function() {
      return $(this).val() === backgroundColor;
    }).prop('checked', true);
    $(document.body).css({background: backgroundColor});
  }

  setActiveTab();
  setMessage();
  setBackgroundColor();
});
