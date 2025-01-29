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

/*window.addEventListener('DOMContentLoaded', (event) => {
    console.log("Running something");   
    const commitElement = document.createElement('div');
    commitElement.innerHTML = `Commit: ` + COMMIT_HASH.slice(-8);
    commitElement.style.position = 'fixed';
    commitElement.style.top = '0';
    commitElement.style.right = '0';
    commitElement.style.color = 'gray';
    document.body.appendChild(commitElement);
});*/

$(document).ready(function () {
    
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var textChunks = {};

    var x = 0;
    var y = 0;
    var touch = new TextChunk(true, Type.RevealAfterLink, x, y, false, '<a href="#" id="they_call">touch</a>');
    textChunks["touch"] = touch;

    x += -5.7;
    //var they_call = new TextChunk(true, Type.RevealVertical, 0, 0, true, '<span class="text-to-fade"><a href="#" id="they">They</a> call this </span>');
    var they_call = new TextChunk(false, Type.RevealAfterLink, x, y, false, '<span class="text-to-fade"><a href="#" id="they">They</a> call this&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp.');
    textChunks["they_call"] = they_call;

    y += 2.0;
    var they = new TextChunk(false, Type.RevealVertical, x, y, true, 'call\nthis\nintimacy.\nBut <a href="#" id="you1">you</a>…');
    textChunks["they"] = they;

    x += 4.4;
    y += 6.9;
    var you1 = new TextChunk(false, Type.RevealAfterLink, x, y, true, '<span class="text-to-fade">You call it, “the <a href="#" id="back">back</a>.” You believe you’ve always been <a href="#" id="inside">inside</a> out.');
    textChunks["you1"] = you1;
    
    var x1 = x + 6.55;
    var y1 = y - 16.1;
    var back = new TextChunk(false, Type.RevealVertical, x1, y1, true, '<a href="#" id="sound">You</a>\nhave\nmemorised\nthe way\nit feels\nto have\nthe\n&nbsp\nof\nyour skin\nagainst the back\nof\nsomeone\nelse’s.');
    textChunks["back"] = back;

    var x2 = x + 22.6;
    var y2 = y - 25.3;
    var inside = new TextChunk(false, Type.RevealVertical, x2, y2, true, '<a href="#" id="theworld">The</a>\ntruest\nface\nof\n<a href="#" id="you2">you</a>\nhas always\nbeen\nhidden,\nsquished\nagainst\nyour\n&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp,\n\n<a href="#" id="yours">yours</a>\nalone.');
    textChunks["inside"] = inside;

    var theworldx2 = x2 - 16.35;
    var theworldy2 = y2;
    var theworld = new TextChunk(false, Type.RevealAfterLink, theworldx2, theworldy2, true, '<span class="text-to-fade">You must find another way to call out to &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp world. You must create a new mode of shouting what you are.');
    textChunks["theworld"] = theworld;

    var yoursx = x2 - 8.45;
    var yoursy = y2 + 27.6;
    var yours = new TextChunk(false, Type.RevealAfterLink, yoursx, yoursy, true, '<span class="text-to-fade">The last time you let &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp elf fall apart you were alone in a bathroom stall. You remember <a href="#" id="wanting">wanting</a> to cry.');
    textChunks["yours"] = yours;

    var wantingx = yoursx+36.2;
    var wantingy = yoursy+2;
    var wanting = new TextChunk(false, Type.RevealVertical, wantingx, wantingy, true, 'to bleed,\nvomit,\nrupture from the pain\nof being in\n<a href="#" id="yourlimbs">your</a>\nbody but\n<a href="#" id="youwill">you</a>\njust sat there.')
    textChunks["wanting"] = wanting;

    var yourlimbsx = wantingx+2.1;
    var yourlimbsy = wantingy+9.21;
    var yourlimbs = new TextChunk(false, Type.RevealAfterLink, yourlimbsx, yourlimbsy, true, '<span class="text-to-fade">limbs are precisely the length it takes to wrap around my frame and hold onto yourself.')
    textChunks["yourlimbs"] = yourlimbs;

    var youwillx = wantingx+1.73;
    var youwilly = wantingy+13.80;
    var youwill = new TextChunk(false, Type.RevealAfterLink, youwillx, youwilly, true, '<span class="text-to-fade">will always weigh exactly how much <a href="#" id="soeven">I</a> can carry.')
    textChunks["youwill"] = youwill;

    var soevenx = youwillx+15.1;
    var soeveny = youwilly-2.25;
    var soeven = new TextChunk(false, Type.RevealVertical, soevenx, soeveny, true, 'So, even as\n&nbsp\npick\n<a href="#" id="careful">you</a>\nup,\nmove\n<a href="#" id="scream">you</a>\naround,\nstill, you are the thing\nsecuring you.')
    textChunks["soeven"] = soeven;

    var carefulx = soevenx+1.8;
    var carefuly = soeveny+6.9;
    var careful = new TextChunk(false, Type.RevealAfterLink, carefulx, carefuly, true, '<span class="text-to-fade">are careful not to kick me. Careful not to interrupt <a href="#" id="thiscommunity">this</a> connection.')
    textChunks["careful"] = careful;

    var thiscommunityx = carefulx+20.4;
    var thiscommunityy = carefuly-4.6;
    var thiscommunity = new TextChunk(false, Type.RevealVertical, thiscommunityx, thiscommunityy, true, '<a href="#" id="thisgod">They</a>\n<a href="#" id="final">call</a>\n&nbsp\ncommunity.')
    textChunks["thiscommunity"] = thiscommunity;

    
    var finalx = thiscommunityx-2.3;
    var finaly = thiscommunityy+2.3;
    var final = new TextChunk(false, Type.RevealAfterLink, finalx, finaly, true, '<span class="text-to-fade">They &nbsp &nbsp &nbsp&nbsp this trust, vulnerability, confidence, stupidity, recklessness, independence, faith, autonomy, love, lust, dependence, family, freedom.')
    textChunks["final"] = final;

    var thisgodx = thiscommunityx+2.3;
    var thisgody = thiscommunityy;
    var thisgod = new TextChunk(false, Type.RevealAfterLink, thisgodx, thisgody, true, '<span class="text-to-fade">call this God.')
    textChunks["thisgod"] = thisgod;

    var screamx = soevenx-5.05;
    var screamy = soeveny+13.82;
    var scream = new TextChunk(false, Type.RevealAfterLink, screamx, screamy, true, '<span class="text-to-fade"><a href="#" id="outside">This</a> is how &nbsp &nbsp &nbsp &nbsp scream.')
    textChunks["scream"] = scream;

    var outsidex = screamx;
    var outsidey = screamy+2;
    var outside = new TextChunk(false, Type.RevealVertical, outsidex, outsidey, true, 'is\nhow\nyou\nturn\n<a href="#" id="makingsure">outside</a>\nin.\n')
    textChunks["outside"] = outside;

    var makingsurex = outsidex-16.05;
    var makingsurey = outsidey+9.2;
    var makingsure = new TextChunk(false, Type.RevealAfterLink, makingsurex, makingsurey, true, '<span class="text-to-fade">By making sure there is enough of you, &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp of and apart from you, to find you, evidence you, hear you, keep you.')
    textChunks["makingsure"] = makingsure;

    var you2x = x2 + 1.8;
    var you2y = y2 + 9.2;
    var you2 = new TextChunk(false, Type.RevealAfterLink, you2x, you2y, true, '<span class="text-to-fade">have never known when or how <a href="#" id="to">to<\a> scream.');
    textChunks["you2"] = you2;

    var tox = you2x + 13.1;
    var toy = you2y - 6.8;
    var to = new TextChunk(false, Type.RevealVertical, tox, toy, true, 'Leaving mind,\nentering mouth,\nonly\n&nbsp\nbe swallowed\nback down heavy, rock bottom\nbefore ever reaching,\nexiting teeth.');
    textChunks["to"] = to;

    var soundx = x1 - 13.0;
    var soundy = y1;
    var sound = new TextChunk(false, Type.RevealAfterLink, soundx, soundy, false, '<span class="text-to-fade">Sound travels the wrong way in');
    textChunks["sound"] = sound;
    
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

        const newWidth = width + window.innerWidth + 600;
        const newHeight = height + window.innerHeight + 200;
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
                let delayIncrement = 100;//todo go back to 100
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
                                wordSpan.addClass('animate__animated animate__fadeIn animate__slow');
                            }, delay);

                            delay += delayIncrement; // 100ms delay between each word
                        });
                        $(this).remove();
                    } else if (this.nodeType === 1) { // HTML element
                        $(this).css('opacity', 0);
                        setTimeout(() => {
                            $(this).addClass('animate__animated animate__fadeIn animate__slow');
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
                let delayIncrement = 300; //todo 1 second delay increment for each line

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
        $(`a[id='${tagId}']`).addClass('visited');
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

    // Reveal all chunks initially
    /*for (var tag in textChunks) {
        revealChunk(tag, textChunks[tag]);
        updateContentSize();
    }*/

    window.addEventListener("scroll", updateScroll, false);

    updateContentSize();
    updateScroll();
    const { width: contentWidth, height: contentHeight } = getContentSize();
    $(window).scrollLeft(contentWidth);
    $(window).scrollTop(contentHeight);


    //$('.body').on('scroll', updateScroll);
});
