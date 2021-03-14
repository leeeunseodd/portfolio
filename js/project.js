$(document).ready(function () {
    
        $('#bg1').delay(1000).stop().fadeOut(1000);

    // 1) 변수 설정
    var _slider = $('.slider');
    var _pageEle = _slider.find('.pagination li');
    var _itemWrap = _slider.find('.item_wrap');
    var _item = _itemWrap.children();
    var total = _item.length;   //_item의 개수
    var current = 0;  //현재 보여지는 _item의 인덱스 번호
    var timer;        //setInterval()을 참조하는 참조변수명=>clearInter()에서 호출
    var visualWid;    //.visual의 가로 너비
    //console.log(total); //3
  
    $(window).on('resize', function () {
      visualWid = _slider.find('.visual').width();
      _itemWrap.css('width', visualWid * total).children().css('width', visualWid);
      //console.log(visualWid);
    });
    $(window).trigger('resize');
  
    // 2) 기초 설정 : play버튼 숨기기, 페이징 첫번째 li.on, 접근성(aria-hidden, inert)
    // _slider.find('.play').hide();
    _pageEle.eq(0).addClass('on');
    _item.eq(0).siblings().attr({'aria-hidden': true, inert: ''}).find('a').attr('tabIndex', -1);
  
    // 3) pagination 버튼 클릭 이벤트
    _pageEle.children().on('click', function () {
      current = $(this).parent().index();
      console.log(current);
      // 자동실행 멈추기, .play보이고 .pause숨기기, aria-live="polite"변경
      clearInterval(timer);
      _slider.find('.play').show().siblings().hide();
      _slider.find('.visual').attr('aria-live', 'polite');
  
      // 움직임을 function 호출
      sliderActive();
    });
  
    // 움직임을 function 생성
    function sliderActive() {
      // 인디케이터 li.on 제어
      _pageEle.eq(current).addClass('on').siblings().removeClass('on');
  
      // _itemWrap의 left좌표값을 animate() 시켜서 움직이기
      _itemWrap.stop().animate({left: visualWid * current * -1}, function () {
        // 접근성 추가 제어: 현재 item(접근 가능), 나머지 item들(접근 불가능)
        _item.eq(current).removeAttr('aria-hidden inert').find('a').removeAttr('tabIndex');
        _item.eq(current).siblings().attr({'aria-hidden': true, inert: ''}).find('a').attr('tab-index', -1);
      });

    }

    // 5) 자동실행 (setInterval: next 버튼을 연속으로 누르기와 동일) - 페이지 로딩시 자동실행 => function 생성
    function playSlider() {
      timer = setInterval(function () {
        current++;
        if (current === total) current = 0;
        sliderActive();
        _slider.find('.visual').attr('aria-live', 'off');
      }, 2000);
    }
    playSlider();
  
   
        
 });