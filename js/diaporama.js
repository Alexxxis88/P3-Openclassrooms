// ------------------------------------- //
// ------------- Diaporama  ------------ //
// ------------------------------------- //

class Diaporama {   
    constructor(id, imagesSlider){
        this.idSlide = id;
        this.imagesSlider = imagesSlider;
        this.imgNumber = 0;
        this.currentSlide = this.imagesSlider[this.imgNumber];
        this.intervalTime = setInterval(this.forwardSlide.bind(this), 5000);
        this.playing = true;
        
        this.prevBtn = document.querySelector("#prevBtn");
        this.nextBtn = document.querySelector("#nextBtn");
        this.pauseBtn = document.querySelector("#pauseBtn");
        
        // Création de l'élément <img> qui va accueillir le slider
        this.newImage = document.createElement("img")
        this.newImage.id = "js-newImage";
        this.newImage.src = this.currentSlide;
        document.getElementById(this.idSlide).appendChild(this.newImage);
        
        
        // Event listeners sur les boutons et clavier
        document.addEventListener("keydown",  this.keyboard.bind(this));
        this.nextBtn.addEventListener("click", this.nextPress.bind(this));
        this.prevBtn.addEventListener("click", this.prevPress.bind(this));
        this.pauseBtn.addEventListener("click", this.playPause.bind(this));
        this.newImage.addEventListener("click", this.playPause.bind(this));
    }

    
    // ---- Fonctions slide, forwardslide et reverseSlide ----
        
    forwardSlide(){
        this.imgNumber++;
        if (this.imgNumber > (this.imagesSlider.length - 1) ){
            this.imgNumber = 0;
        }
        this.currentSlide = this.imagesSlider[this.imgNumber];
        this.newImage.src = this.currentSlide;
    }

    reverseSlide(){
        this.imgNumber--;
        if (this.imgNumber < 0) {
            this.imgNumber = this.imagesSlider.length-1
        }
        this.currentSlide = this.imagesSlider[this.imgNumber];
        this.newImage.src = this.currentSlide; 
    }


    // ---- Fonctions pause, play et play-pause ----

    pause(){
        this.pauseBtn.innerHTML = "&#9658;"; // Code du logo play
        this.playing = false;
        clearInterval(this.intervalTime); // Stop l'auto slide
    }

    play(){
        this.pauseBtn.innerHTML = "&#10074;&#10074;"; // Code du logo pause
        this.playing = true;
        this.forwardSlide(); // On rajoute la fonction slide pour ne pas attendre 5 secondes avant de relancer le déroulement du slider
        this.intervalTime = setInterval(this.forwardSlide.bind(this), 5000); // Après appuis sur Play on redéfini l'interval du slider 
    }

    playPause(){
        if(this.playing === true){ 
                this.pause(); 
        }else{ 
            this.play(); 
        }
    }

    
    // Fonctions pour mettre en pause et changer d'image

    nextPress(){
        this.pause();
        this.forwardSlide();
    }

    prevPress(){
        this.pause();
        this.reverseSlide();
    }
        
    
    // ---- Fonctionalités clavier (keypress) ----

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


