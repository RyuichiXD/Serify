$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        },
        navText: ['<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>']
    });
});

$(document).ready(function() {

    if(window.location.href.indexOf('#login') != -1) {
        $('#login').modal('show');
    }

});