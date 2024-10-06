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
    for (let i = 0; i < 4; i++) {
        if(i===slideIndex)
        document.getElementById("slajd"+i).style.display="block";
        else 
        document.getElementById("slajd"+i).style.display="none";
    }
}

