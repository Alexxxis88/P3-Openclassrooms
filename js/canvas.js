// ------------------------------------- //
// --------------- Canvas  ------------- //
// ------------------------------------- //

class Canvas{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.canvas.width = 240;
        this.painting = false;
        this.counter = 0;
        this.increaseCounter = false;
    }
    
    //METHODS
    //Drawing the line
    draw(x,y){
        if(this.painting === true){
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }  
    }
    
    //Clearing the canvas
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.counter = 0;
    }
    
    init(){
    //Eventlisteners
        //Enable drawing capability
        $(this.canvas).on("mousedown touchstart", function(){
            this.ctx.beginPath(); 
            this.painting = true; 
            this.increaseCounter = true; 
        }.bind(this))
        
        //Disable drawing capability
        $(this.canvas).on("mouseup mouseout touchend", function(){
            this.painting = false;
            this.increaseCounter = false;
        }.bind(this));
        
        //Draw
        $(this.canvas).on("mousemove", function(e){
            this.draw(e.offsetX, e.offsetY);
            if (this.increaseCounter === true){
                    this.counter++;
                } 
        }.bind(this));
        
        $(this.canvas).on("touchmove", function(e){            
            let rect = this.canvas.getBoundingClientRect();
            let touchX = e.touches[0].clientX - rect.left;
            let touchY = e.touches[0].clientY - rect.top;
        
            this.draw(touchX, touchY);
            if (this.increaseCounter === true){
                    this.counter++;
                } 
        }.bind(this));
        
        //Avoiding scroll when using a touchpad
        $(this.canvas).on("scroll touchmove mousewheel ", function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        })  
    }
}



