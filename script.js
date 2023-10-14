$(document).ready(function() {
    // Set the start position to the center
    const wrapper = $(".wrapper");
    wrapper.scrollTop(window.innerHeight);
    wrapper.scrollLeft(window.innerWidth);

    window.addEventListener("scroll",function() {
        console.log($(this).scrollLeft(), $(this).scrollTop());
        if ($(this).scrollLeft() <= 0) {
            $(this).scrollLeft(window.innerWidth);
        }
        else if ($(this).scrollLeft() >= 2 * window.innerWidth) {
            $(this).scrollLeft(window.innerWidth);
        }

        if ($(this).scrollTop() <= 0) {
            $(this).scrollTop(window.innerHeight);
        }
        else if ($(this).scrollTop() >= 2 * window.innerHeight) {
            $(this).scrollTop(window.innerHeight);
        }
    }, false);

    // Check the position after dragging
    $('.body').on('scroll', function() {
        console.log($(this).scrollLeft(), $(this).scrollTop());
        if ($(this).scrollLeft() <= 0) {
            $(this).scrollLeft(window.innerWidth);
        }
        else if ($(this).scrollLeft() >= 2 * window.innerWidth) {
            $(this).scrollLeft(window.innerWidth);
        }

        if ($(this).scrollTop() <= 0) {
            $(this).scrollTop(window.innerHeight);
        }
        else if ($(this).scrollTop() >= 2 * window.innerHeight) {
            $(this).scrollTop(window.innerHeight);
        }
    });
});
