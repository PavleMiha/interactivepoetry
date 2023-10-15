const Type = {
    RevealAfterLink: 'RevealAfterLink',
    RevealDownwards: 'RevealDownwards',
    RevealRight: 'RevealRight',
};

class TextChunk {
    constructor(linkShowing, animationProgress, type, x_offset, y_offset, text) {
        this.linkShowing = linkShowing;
        this.animationProgress = 0.0;
        this.type = type;
        this.text = text;
        this.x_offset = x_offset;
        this.y_offset = y_offset;
    }
}

$(document).ready(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var textChunks = {};

    var lorem = new TextChunk(true, 0.0, Type.RevealAfterLink, 0, 0, '<a href="#" id="lorem">Lorem</a><span class="text-to-fade"> bipsum dolor sit <a href="#" id="amet">amet</a>, consectetur adipiscing elit.</span>');
    textChunks["lorem"] = lorem;

    var amet = new TextChunk(false, 0.0, Type.RevealDownwards, 9.2, 2, 'first line test\nsecond line test\nthird line test\nfourth line <a href="#" id="test">test</a>');
    textChunks["amet"] = amet;

    var test = new TextChunk(false, 0.0, Type.RevealAfterLink, 15.24, 8.41, '<span class="text-to-fade">and so on and so on and on and on and so on and so on and on and on and so on and so on and on and on and so on and so on and on and on and so on and so on and on and on and so on and so on and on and on</span>');
    textChunks["test"] = test;

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

    function getEffectiveContentDimensions(divElement) {
        let maxHeight = 0;
        let maxWidth = 0;

        // Loop through each child element of the div
        Array.from(divElement.children).forEach(child => {
            const rect = child.getBoundingClientRect();
            const position = window.getComputedStyle(child).position;
            const parentRect = divElement.getBoundingClientRect();

            // If the element is absolutely positioned, add its top and height for maxHeight
            // and left and width for maxWidth
            if (position === 'absolute') {
                maxHeight = Math.max(maxHeight, rect.top - parentRect.top + rect.height);
                maxWidth = Math.max(maxWidth, rect.left - parentRect.left + rect.width);
            } else {
                // For non-absolute elements, just consider their height and width as contributing to the parent div
                maxHeight = Math.max(maxHeight, rect.height);
                maxWidth = Math.max(maxWidth, rect.width);
            }
        });

        return { height: maxHeight, width: maxWidth };
    }

    var previousWidth = -1;
    var previousHeight = -1;

    function updateContentSize() {
        const wrapper = $(".wrapper");

        const divElement = document.querySelector('.text-content');
        if (divElement === null) return;
        const { height, width } = getEffectiveContentDimensions(divElement);

        //console.log(`Width: ${textWidth}px, Height: ${textHeight}px`);

        const newWidth = width + window.innerWidth;
        const newHeight = height + window.innerHeight;
        setContentSize(newWidth, newHeight);
        if (previousWidth != -1 && previousHeight != -1) {
            if (previousWidth != newWidth) {
                console.log("Width changed", previousWidth, newWidth, $(window).scrollLeft());
                $(window).scrollLeft((newWidth - previousWidth) + $(window).scrollLeft());
            }
            if (previousHeight != newHeight) {
                console.log("Height changed", previousHeight, newHeight, $(window).scrollTop());
                $(window).scrollTop((newHeight - previousHeight) + $(window).scrollTop());
            }
        }
        previousWidth = newWidth;
        previousHeight = newHeight;
    }

    window.addEventListener("resize", function () {
    });

    for (var tag in textChunks) {
        console.log(tag, textChunks[tag].type)
        if (textChunks[tag].linkShowing) {
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

    function addAnimatedLine(container, lineText, delay) {
        console.log("addAnimatedLine", container, lineText, delay);

        // Create a new jQuery element
        const $lineDiv = $('<div></div>');
        $lineDiv.html(lineText);
        $lineDiv.addClass('hidden');

        // Append the new element to the container
        $(container).append($lineDiv);

        // Check if the element is in the DOM
        console.log("Is element in DOM?", $.contains(document.body, $lineDiv[0]));

        // Delay the display of the line
        setTimeout(() => {
            console.log("Timeout executed. Applying styles...");

            // Check if the element is still in the DOM
            console.log("Is element still in DOM?", $.contains(document.body, $lineDiv[0]));

            // Remove the hidden class and add animation classes
            $lineDiv.removeClass('hidden').addClass('animate__animated animate__fadeIn');

            // Log the computed opacity
            const computedStyle = window.getComputedStyle($lineDiv[0]);
            console.log("Computed opacity: ", computedStyle.opacity);

        }, delay);
    }

    function revealChunk(tag, textChunk) {
        console.log("revealChunk", textChunk);
        if (textChunk.type === Type.RevealAfterLink) {
            if ($(`div[id="${tag}"] .text-to-fade`).length == 0) {

                newdiv = document.createElement("div");
                newdiv.style.position = "absolute";

                newdiv.style.top = textChunk.y_offset + "em";
                newdiv.style.left = textChunk.x_offset + "em";
                newdiv.style.textWrap = "none";
                newdiv.style.whiteSpace = "nowrap !important";  // Prevent text wrapping
                newdiv.style.overflowX = "auto";

                newdiv.setAttribute("id", tag);

                // Convert the aElement back to string
                newdiv.innerHTML = textChunks[tag].text;
                $(".text-content").append(newdiv);
            }

            $(`div[id="${tag}"] .text-to-fade`).each(function () {
                const $parentDiv = $(this).parent();
                const $textToFade = $parentDiv.find('.text-to-fade');
                $textToFade.css('display', 'inline'); // Make the text visible

                let delay = 0;

                $textToFade.contents().each(function () {
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
        }
        if (textChunk.type === Type.RevealDownwards) {
            $(`.text-content`).each(function () {
                newdiv = document.createElement("div");
                //newdiv.style.addClass("absolute-text")
                newdiv.setAttribute("id", tag);
                newdiv.style.position = "absolute";
                newdiv.style.top = textChunk.y_offset + "em";
                newdiv.style.left = textChunk.x_offset + "em";

                const lines = textChunk.text.split('\n'); // Assuming text is split by '<p>'

                let delay = 0; // Initialize delay
                const delayIncrement = 800; // 1 second delay increment for each line

                lines.forEach((line, index) => {
                    // Wrap textChunk in <p> tags if it's not the first line
                    const lineText = (index === 0) ? line : `<p>${line}`;
                    const $lineDiv = $('<div></div>');
                    $lineDiv.html(lineText);
                    $lineDiv.addClass('hidden');

                    // Append the new element to the container
                    $(newdiv).append($lineDiv);

                    // Delay the display of the line
                    setTimeout(() => {
                        // Remove the hidden class and add animation classes
                        $lineDiv.removeClass('hidden').addClass('animate__animated animate__fadeIn');
                    }, delay);
                    // Increment the delay for the next line
                    delay += delayIncrement;
                });

                $(this).append(newdiv);
            });
        }
    }

    if (false) {
        for (var tag in textChunks) {
            revealChunk(tag, textChunks[tag]);
            updateContentSize();
        }
    }

    $('body').on('click', 'a', function (event) {
        console.log("clicked something");
        event.preventDefault();

        const tagId = $(this).attr('id');
        console.log(tagId, "clicked");

        if (tagId === undefined) return;
        if (tagId in textChunks) {
            revealChunk(tagId, textChunks[tagId]);
            updateContentSize();
        }
    });

    updateContentSize();

    function updateScroll() {
        const { width: contentWidth, height: contentHeight } = getContentSize();

        //console.log("Scroll: ", $(this).scrollLeft(), $(this).scrollTop());
        //console.log("Window: ", window.innerWidth, window.innerHeight);
        //console.log("Content ", contentWidth, contentHeight);
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

    updateContentSize();
    updateScroll();
    const { width: contentWidth, height: contentHeight } = getContentSize();
    $(window).scrollLeft(contentWidth);
    $(window).scrollTop(contentHeight);

    //$('.body').on('scroll', updateScroll);

    $("a").click(function (event) {
        event.preventDefault();
    });
});
