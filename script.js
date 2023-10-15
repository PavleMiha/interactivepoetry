class TextChunk {
    constructor(linkShowing, animationProgress, text) {
        this.linkShowing = linkShowing;
        this.animationProgress = 0.0;
        this.text = text;
    }
}

$(document).ready(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var lorem = new TextChunk(true, 0.0, '<a href="#" id="lorem">Lorem</a><span class="text-to-fade"> ipsum dolor sit <a href="#" id="amet">amet</a>, consectetur adipiscing elit.</span>');
    var textChunks = {};
    textChunks["lorem"] = lorem;

    // Populate text in the divs
    function setContentSize(width, height) {
        document.documentElement.style.setProperty('--content-width', `${width}px`);
        document.documentElement.style.setProperty('--content-height', `${height}px`);
    }

    function getContentSize() {
        const rootStyles = getComputedStyle(document.documentElement);
        const width = parseInt(rootStyles.getPropertyValue('--content-width'), 10);
        const height = parseInt(rootStyles.getPropertyValue('--content-height'), 10);

        return { width, height };
    }

    var previousWidth = -1;
    var previousHeight = -1;

    function updateContentSize() {
        const wrapper = $(".wrapper");

        const divElement = document.querySelector('.text-content');
        if (divElement === null) return;
        const textWidth = divElement.clientWidth;
        const textHeight = divElement.clientHeight;

        //console.log(`Width: ${textWidth}px, Height: ${textHeight}px`);

        const newWidth = textWidth + window.innerWidth * 0.8;
        const newHeight = textHeight + window.innerHeight * 0.8;
        setContentSize(newWidth, newHeight);
        if (previousWidth != -1 && previousHeight != -1) {
            if (previousWidth != newWidth) {
                console.log("Width changed", previousWidth, newWidth, $(window).scrollLeft());
                $(window).scrollLeft((newWidth - previousWidth) + $(window).scrollLeft());
            }
        }
        previousWidth = newWidth;
        previousHeight = newHeight;
    }

    // Set the start position to the center
    const wrapper = $(".wrapper");
    wrapper.scrollTop(window.innerHeight);
    wrapper.scrollLeft(window.innerWidth);

    window.addEventListener("resize", function () {
    });

    const textContainer = document.getElementsByClassName('.content');
    let count = 1;

    /*function updateText() {
        $(".text-content").html(text.split(" ").slice(0, 10).join(" "));

        count++;
        if (count > 100) count = 1;
        updateContentSize();
        // Call the function again on the next animation frame
        setTimeout(() => {
            // Call the function again on the next animation frame after the delay
            requestAnimationFrame(updateText);
        }, 100);


    }

    // Start the animation
    updateText();*/

    for (var tag in textChunks) {
        if (textChunks[tag].linkShowing) {
            console.log("Showing link: ", tag);
            newdiv = document.createElement("div");
            newdiv.setAttribute("id", tag);

            const parser = new DOMParser();
            const doc = parser.parseFromString(textChunks[tag].text, 'text/html');
            const aElement = doc.querySelector('a');
            // Convert the aElement back to string
            newdiv.innerHTML = textChunks[tag].text;
            $(".text-content").append(newdiv);
        }
        updateContentSize();
    }

    $('a').click(function (event) {
        event.preventDefault();
    
        const tagId = $(this).attr('id');
    
        if (tagId === undefined) return;
        if (tagId in textChunks) {
            $(`div[id="${tagId}"] .text-to-fade`).each(function () {
                const $parentDiv = $(this).parent();
                const $textToFade = $parentDiv.find('.text-to-fade');
                $textToFade.css('display', 'inline'); // Make the text visible
    
                let delay = 0;
    
                $textToFade.contents().each(function() {
                    if (this.nodeType === 3) { // Text node
                        const words = this.nodeValue.split(' ');
                        words.forEach(word => {
                            const wordSpan = $('<span>')
                                .text(word + ' ')
                                .css('opacity', 0)
                                .insertBefore(this);
    
                            setTimeout(() => {
                                wordSpan.css('opacity', 1).addClass('animate__animated animate__fadeIn');
                            }, delay);
    
                            delay += 100; // 100ms delay between each word
                        });
                        $(this).remove();
                    } else if (this.nodeType === 1) { // HTML element
                        $(this).css('opacity', 0);
                        setTimeout(() => {
                            $(this).css('opacity', 1).addClass('animate__animated animate__fadeIn');
                        }, delay);
                        delay += 100;
                    }
                });
            });
            updateContentSize();
        }
    });

    updateContentSize();

    function updateScroll() {
        const { width: contentWidth, height: contentHeight } = getContentSize();

        console.log("Scroll: ", $(this).scrollLeft(), $(this).scrollTop());
        console.log("Window: ", window.innerWidth, window.innerHeight);
        console.log("Content ", contentWidth, contentHeight);
        if ($(this).scrollLeft() + window.innerWidth / 2.0 < contentWidth) {
            $(this).scrollLeft($(this).scrollLeft() + contentWidth);
        }

        else if ($(this).scrollLeft() + window.innerWidth / 2.0 > 2 * contentWidth) {
            $(this).scrollLeft($(this).scrollLeft() - contentWidth);
        }

        if ($(this).scrollTop() + window.innerHeight / 2.0 < contentHeight) {
            $(this).scrollTop($(this).scrollTop() + contentHeight);
        }

        else if ($(this).scrollTop() + window.innerHeight / 2.0 > 2 * contentHeight) {
            $(this).scrollTop($(this).scrollTop() - contentHeight);
        }
    };

    window.addEventListener("scroll", updateScroll, false);

    updateScroll();
    //$('.body').on('scroll', updateScroll);

    $("a").click(function (event) {
        event.preventDefault();
    });
});
