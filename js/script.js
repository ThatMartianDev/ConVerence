const home = document.getElementById("home")
const header = document.getElementById("header");
const logo = document.querySelector(".logo")

const headerFuncs = ()=>{
    document.documentElement.style.setProperty("--window-height", window.innerHeight + 'px')
    window.addEventListener("resize", ()=>{
        document.documentElement.style.setProperty("--window-height", window.innerHeight + 'px')
    })

    const headerObserverOptions = {
        rootMargin: "-20% 0% 0% 0%",
    }

    const headerObserver = new IntersectionObserver(function(entries, headerObserver){
        entries.forEach(entry => {
            if (!entry.isIntersecting){
                header.classList.add("fill")
                logo.classList.add("fill")
            } else {
                header.classList.remove("fill")
                logo.classList.remove("fill")
            }
        })
    }, headerObserverOptions)

    headerObserver.observe(home)
}

const slideTextAnimation = function(){
    const paragraphs = document.querySelectorAll(".slide-out-text")
    paragraphs.forEach(paragraph => {

        // Split the paragraph into words and return them as a Span tag inside a div tag
        paragraph.innerHTML = paragraph.innerHTML.split(' ').map(function(word){
            return '<span><span>'+word+'</span></span>';
        }).join(' ');

        // Add the transition delay to each span
        const paragraphDivs = Array.from(paragraph.children)
        paragraphDivs.forEach((div, index) => {
            let userAgent = navigator.userAgent;

            if (userAgent.match(/firefox|fxios/i)){
                div.firstChild.style['-moz-transition-delay'] = index * 10 + "ms";
            }  else if (userAgent.match(/safari/i)) {
                div.firstChild.style['-webkit-transition-delay'] = index * 10 + "ms";
            } else if (userAgent.match(/opr\//i)) {
                div.firstChild.style['-o-transition-delay'] = index * 10 + "ms";
            } else {
                div.firstChild.style['transition-delay'] = index * 10 + "ms";
            }
        })
    })
}

const fadersObserver = function(){
    const faders = document.querySelectorAll(".fader");
    const fadersOptions = {
        threshold: 0.3,
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add("fade-in");
                }, 100)
            }
        });
    }, fadersOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

headerFuncs()
fadersObserver()
slideTextAnimation()