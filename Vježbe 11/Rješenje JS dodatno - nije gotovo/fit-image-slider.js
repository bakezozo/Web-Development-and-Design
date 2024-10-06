let slideIndex = 0;

let inicijalno=(nizSlika)=>{
    document.querySelector(".slideshow-container").innerHTML=
    `
    <div class="slideshow-slides">
      <!-- Full-width images with number and caption text -->
      <div class="mySlides">
        <div class="numbertext">1 / 4</div>
        <img src="images/img1.jpg">
        <div class="text">Caption One</div>
      </div>

      <div class="mySlides">
        <div class="numbertext">2 / 4</div>
        <img src="images/img2.jpg">
        <div class="text">Caption Two</div>
      </div>

      <div class="mySlides">
        <div class="numbertext">3 / 4</div>
        <img src="images/img3.jpg">
        <div class="text">Caption Three</div>
      </div>

      <div class="mySlides">
        <div class="numbertext">4 / 4</div>
        <img src="images/img4.jpg"">
        <div class=" text">Caption Four
      </div>
    </div>
    `;

}

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

