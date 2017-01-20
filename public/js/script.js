


$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        beforeMove: function(){


        },
        aftermoveMove: function(){

        },

        loop: true,
        nav: true,
        stagePadding: 5,
        center:true,
        margin:10,
        responsive: {
            0: {
                items: 1,
                nav: false,
                stagePadding: 10,
                margin:0,

            },
            300:{
                items:3,
                nav: false,
                margin:20,

            },
            600: {
                items: 3,
                margin:25,

            },
            1000: {
                items: 5
            }
        },
        navText: ['<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>']
    });
});

if ( ($(window).height() + 100) < $(document).height() ) {
    $('#goTop').removeClass('hidden')
}

$("#accordion").on("shown.bs.collapse", function () {
    var scrol = $(this).find('.collapse.in');

    $('html, body').animate({
        scrollTop: $(scrol).offset().top-120
    }, 500);
});


$(document).ready(function() {

    if(window.location.href.indexOf('#login') != -1) {
        $('#login').modal('show');
    }

});