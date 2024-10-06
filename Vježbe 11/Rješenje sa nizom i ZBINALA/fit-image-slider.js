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

    let niz = document.querySelectorAll(".mySlides");
    for (let i = 0; i < niz.length; i++) {
        if(i===slideIndex)
        niz[i].style.display="block";
        else 
        niz[i].style.display="none";
    }
}

