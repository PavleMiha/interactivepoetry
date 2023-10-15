const Type = {
    RevealAfterLink: 'RevealAfterLink',
    RevealVertical: 'RevealVertical',
    RevealRight: 'RevealRight',
};

class TextChunk {
    constructor(linkShowing, type, x_offset, y_offset, originalDirection, text) {
        this.linkShowing = linkShowing;
        this.type = type;
        this.text = text;
        this.x_offset = x_offset;
        this.y_offset = y_offset;
        this.originalDirection = originalDirection;
    }
}

$(document).ready(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var textChunks = {};

    var lorem = new TextChunk(true, Type.RevealAfterLink, 0, 0, true, '<a href="#" id="lorem">Lorem</a><span class="text-to-fade"> bipsum dolor sit <a href="#" id="amet">amet</a>, consectetur adipiscing elit.</span>');
    textChunks["lorem"] = lorem;

    var amet = new TextChunk(false, Type.RevealVertical, 9.65, 2, true, 'first line test\nsecond line test\nthird line test\nfourth line <a href="#" id="test">test</a>');
    textChunks["amet"] = amet;

    var test = new TextChunk(false, Type.RevealAfterLink, 15.7, 8.9, true, '<span class="text-to-fade">and so on and so on and on and on and so on and so <a href="#" id="on1">on</a> and on and on and so on and so on and on and on and so <a href="#" id="on2">on</a> and so on and on and on and so on and so on and on and <a href="#" id="on3">on</a> and so on and so on and on and on</span>');
    textChunks["test"] = test;

    var on1 = new TextChunk(false, Type.RevealVertical, 36.7, 2.4, false, 'a small poem\nemerges\nupwards');
    textChunks["on1"] = on1;

    var on2 = new TextChunk(false, Type.RevealVertical, 60.7, 10.9, true, 'a small poem\nemerges\ndownwards');
    textChunks["on2"] = on2;

    var on3 = new TextChunk(false, Type.RevealVertical, 84.7, 0.1, false, '<a href="#" id="pavle">I<\a> love you loads\nthank you\nfor my baby\nthis is a secret');
    textChunks["on3"] = on3;

    var pavle = new TextChunk(false, Type.RevealAfterLink, 69.3, 0.1, false, '<span class="text-to-fade">My name is Pavle and I\'m here to say');
    textChunks["pavle"] = pavle;

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

    function revealChunk(tag, textChunk) {
        console.log("revealChunk", textChunk);
        if (textChunk.revealed) return;
        textChunk.revealed = true;
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
                let delayIncrement = 100;
                if (!textChunk.originalDirection) {
                    let count = 0;
                    $textToFade.contents().each(function () {
                        if (this.nodeType === 3) { // Text node
                            const words = this.nodeValue.split(' ');
                            words.forEach(word => {
                                count++;
                            });
                        } else if (this.nodeType === 1) { // HTML element
                            count++;
                        }
                    });

                    console.log("Count: ", count);
                    console.log("Delay: ", delay, " DelayIncrement: ", delayIncrement);
                    
                    delay = (count - 1) * delayIncrement;
                    delayIncrement *= -1;
                }

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

                            delay += delayIncrement; // 100ms delay between each word
                        });
                        $(this).remove();
                    } else if (this.nodeType === 1) { // HTML element
                        $(this).css('opacity', 0);
                        setTimeout(() => {
                            $(this).css('opacity', 1).addClass('animate__animated animate__fadeIn');
                        }, delay);
                        delay += delayIncrement;
                    }
                });
            });
        }
        if (textChunk.type === Type.RevealVertical) {
            $(`.text-content`).each(function () {
                newdiv = document.createElement("div");
                //newdiv.style.addClass("absolute-text")
                newdiv.setAttribute("id", tag);
                newdiv.style.position = "absolute";
                newdiv.style.top = textChunk.y_offset + "em";
                newdiv.style.left = textChunk.x_offset + "em";

                const lines = textChunk.text.split('\n'); // Assuming text is split by '<p>'

                let delay = 0; // Initialize delay
                let delayIncrement = 800; // 1 second delay increment for each line

                if (!textChunk.originalDirection) {
                    delay = (lines.length - 1) * delayIncrement;
                    delayIncrement *= -1;
                }

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
        $(this).addClass('visited');
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

    
    $(document).keydown(function (event) {
        if (event.key === 'p') {
            for (var tag in textChunks) {
                revealChunk(tag, textChunks[tag]);
                updateContentSize();
            }
        }
    });

    $(document).click(function (event) {
        const div = $(".content.bottom-right .text-content")[0];
        console.log(div);
        const rect = div.getBoundingClientRect();
        console.log(rect);
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
      
        const style = window.getComputedStyle(div, null).getPropertyValue('font-size');
        console.log(style);
        const fontSize = parseFloat(style);
        console.log(fontSize);
      
        console.log(`X: ${x / fontSize}em, Y: ${y / fontSize}em`);
    });

    window.addEventListener("scroll", updateScroll, false);

    updateContentSize();
    updateScroll();
    const { width: contentWidth, height: contentHeight } = getContentSize();
    $(window).scrollLeft(contentWidth);
    $(window).scrollTop(contentHeight);

    //$('.body').on('scroll', updateScroll);
});
