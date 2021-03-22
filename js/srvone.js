$(document).ready(function () { 
  // show 다음 사라지기
  $('#bg2').stop().fadeOut(1000).addClass('load');

  $(window).on('scroll' , function () {
      var scrollY = $(this).scrollTop() + $(this).height();
      console.log(scrollY);

      $('.cnt').each(function(idx) {
        console.log($(this).offset().top);
        if (scrollY > $(this).offset().top) {
          $(this).addClass('fade');
        } else {
          $(this).removeClass('fade');
        }
      });
  });

  $(window).trigger('scroll');

  var _slideWrap = $('#content_box #slide_box .slide_wrap'); 
  var oneSize = _slideWrap.children().outerWidth(true); 
  var total = _slideWrap.children().length; 

  $('#content_box').on('scroll' , function () {
    
  });


  /* 배너 페이지 banner page */

  var _itemWrap = $('#verSlider .item_container');
      var current = 0;
      var total = _itemWrap.children().length; 
      var timerWheel = 0;

      var movePos = $(window).height() / 3;

      _itemWrap.children().eq(0).addClass('active');

      $(document).on('keydown', function (e) {
        if (_itemWrap.is(':animated')) return false;
     
        var key = e.keyCode;
  
        if (key === 38 && current > 0) current--;
        else if (key === 40 && current < total - 1) current++;
        // console.log(current);

        sliderActive();
      });

      _itemWrap.on('mousewheel DOMMouseScroll', function (e) {
        clearTimeout(timerWheel);

        timerWheel = setTimeout(function () {
         
          if (_itemWrap.is(':animated')) return false;

          var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
        
          if (delta < 0 && current < total - 1) current++;
          else if (delta > 0 && current > 0) current--;

          sliderActive();
        }, 200);
      });

      function sliderActive() {
        _itemWrap.stop().animate({
          top: movePos * current * -1 + movePos
        }, 1000); 
        _itemWrap.children().eq(current).addClass('active').siblings().removeClass('active');

        _itemWrap.prev().find('.photo_wrap').stop().animate({
          top: 360 * current * -1
        }, 1000, 'easeInOutCirc'); 
      }
});







