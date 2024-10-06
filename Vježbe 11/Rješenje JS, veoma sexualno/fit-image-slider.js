let slideIndex = 0;

let plusSlides=(n)=>{
    slideIndex += n;
    if(slideIndex>3) slideIndex=3;
    if(slideIndex<0) slideIndex=0;
    showSlides();
}

let currentSlide=(newPosition)=>{
    slideIndex = newPosition;
    showSlides();
}

let showSlides=()=>{
    document.querySelector(".slideshow-slides").style.left=-(slideIndex*100)+"%";
}

