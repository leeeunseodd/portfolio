$(document).ready(function () { 


    $(window).on('scroll' , function () {
        var scrollY = $(this).scrollTop() + $(this).height();
        console.log(scrollY);

        $('.cnt').each(function(idx) {
          if (scrollY > $(this).offset().top) {
            $(this).addClass('fade');
          } else {
            $(this).removeClass('fade');
          }
        });
    });

    $(window).trigger('scroll');
});
