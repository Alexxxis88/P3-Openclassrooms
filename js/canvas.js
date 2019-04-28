// ------------------------------------- //
// --------------- Canvas  ------------- //
// ------------------------------------- //

class Canvas{
    constructor(){
        this.canvas = document.getElementById("canvas"); //on défini la zone de canvas
        this.ctx = canvas.getContext("2d"); //on défini le contexte du canvas : 2d
        this.canvas.width = 500 ; //a changer
        this.canvas.height = 200 ; //a changer
        this.painting = false;
    }
    
    //Methodes
   
    ///////modifications/////
    draw(x,y){ // x et y correspondent aux coordonées X et Y du pointer
        if(this.painting === true){ //si le bouton de la souris est enfoncé
            
            this.ctx.lineTo(x, y); //The lineTo() method adds a new point and creates a line TO that point FROM the last specified point in the canvas (this method does not draw the line). https://www.w3schools.com/TAgs/canvas_lineto.asp
            
            this.ctx.stroke(); //methode qui dessine / affiche EFFECTIVEMENT le tracé défini par le lineTo
        }  
    }
    
    
    
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // on efface le canvas en partant de la position (0,0) et sur toute sa largeur et hauteur
    }
    

    
    
    init(){
    //Eventlistners
        this.canvas.addEventListener("mouseup", function(){
            this.painting = false; //on désactive la posibilité de dessiner quand le bouton de la souris est relaché
            
        }.bind(this));
        
        
        
        this.canvas.addEventListener("mousedown", function(){
            this.ctx.beginPath(); // on (re)défini le point de départ du tracé : The beginPath() method begins a path, or resets the current path.
            this.painting = true; //on active la posibilité de dessiner quand le bouton de la souris est enfoncé
        }.bind(this))
        
        
        this.canvas.addEventListener("mousemove", function(e){
            this.draw(e.offsetX, e.offsetY); // x et y correspondent aux coordonées X et Y du pointer // on  utilise offset pour récupérer la position du pointer par rapport au point d'origine du canvas (0,0 = coin supérieur gauche) du canvas. Et non pas clientX car il donne la position du pointer par rapport à la page ???
            // La propriété en lecture seule offsetX de l'interface MouseEvent(e) fournit le décalage sur l'axe X du pointeur de la souris entre cet évènement(e) et la bordure de la marge intérieure du noeud cible(canvas).
            
            console.log(" Client " + e.clientX + "-" + e.clientY);         
            console.log(" Offset " + e.offsetX + "-" + e.offsetY);
            
        }.bind(this));
    }
}


let myCanvas = new Canvas(); 
myCanvas.init();
