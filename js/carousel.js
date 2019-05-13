// ------------------------------------- //
// ------------- Carousel  ------------ //
// ------------------------------------- //

class Carousel {   
    constructor(id, imagesSlider, textsSlider){
        this.idSlide = id;
        this.imagesSlider = imagesSlider;
        this.textsSlider = textsSlider;
        this.imgNumber = 0;
        this.currentSlide = this.imagesSlider[this.imgNumber];
        this.currentText = this.textsSlider[this.imgNumber];
        this.intervalTime = setInterval(this.forwardSlide.bind(this), 5000);
        this.playing = true;
        
        //Buttons
        this.prevBtn = document.querySelector("#prevBtn");
        this.nextBtn = document.querySelector("#nextBtn");
        this.pauseBtn = document.querySelector("#pauseBtn");
        
        // Create the <img> element that will carry the slider
        this.newImage = document.createElement("img");
        this.newImage.id = "js-newImage";
        this.newImage.src = this.currentSlide;
        document.getElementById(this.idSlide).appendChild(this.newImage);
        
        
        // Create the <p> element that will carry the text
        this.newText = document.createElement("p");
        this.newText.id = "js-newText";
        this.newText.src = this.currentText;
        document.getElementById(this.idSlide).appendChild(this.newText);
        document.getElementById(this.newText.id).innerHTML = this.currentText;

        
        // Eventlisteners - Mouse & Keyoard
        document.addEventListener("keydown",  this.keyboard.bind(this));
        this.nextBtn.addEventListener("click", this.nextPress.bind(this));
        this.prevBtn.addEventListener("click", this.prevPress.bind(this));
        this.pauseBtn.addEventListener("click", this.playPause.bind(this));
        this.newImage.addEventListener("click", this.playPause.bind(this));
    }

    //METHODS
    // ---- Slide, forwardslide and reverseSlide ----
    forwardSlide(){
        this.imgNumber++;
        if (this.imgNumber > (this.imagesSlider.length - 1) ){
            this.imgNumber = 0;
        }
         this.displayNewImage(); 
    }

    reverseSlide(){
        this.imgNumber--;
        if (this.imgNumber < 0) {
            this.imgNumber = this.imagesSlider.length-1;
        }
        this.displayNewImage();
    }
    
    
    // ---- Display the new image method ----
    displayNewImage(){
        this.currentSlide = this.imagesSlider[this.imgNumber];
        this.newImage.src = this.currentSlide;        
        this.currentText = this.textsSlider[this.imgNumber];
        document.getElementById(this.newText.id).innerHTML = this.currentText; 
    }

    // ---- Pause, play and play-pause ----
    pause(){
        this.pauseBtn.innerHTML = "&#9658;"; // Play logo code
        this.playing = false;
        clearInterval(this.intervalTime); // stop auto-slide
    }

    play(){
        this.pauseBtn.innerHTML = "&#10074;&#10074;"; // Pause logo code
        this.playing = true;
        this.forwardSlide(); // forwardSlide() added not to wait 5 seconds when the autoslide restarts
        this.intervalTime = setInterval(this.forwardSlide.bind(this), 5000);
    }

    playPause(){
        if(this.playing === true){ 
                this.pause(); 
        }else{ 
            this.play(); 
        }
    }


    // Pause and change images
    nextPress(){
        this.pause();
        this.forwardSlide();
    }

    prevPress(){
        this.pause();
        this.reverseSlide();
    }
        
    
    // ---- Keyboard actions (keypress) ----
    keyboard(event){
        switch(event.key){
            case "ArrowRight":    
                this.nextPress();
                break;

            case "ArrowLeft":
                this.prevPress();
                break;

            case "Space":
                this.playPause();
                break;
        }  
    }
}


