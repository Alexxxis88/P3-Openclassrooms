// ------------------------------------- //
// --------------- Canvas  ------------- //
// ------------------------------------- //

class Canvas{
    constructor(){
        this.canvas = document.getElementById("canvas"); //on défini la zone de canvas
        this.ctx = canvas.getContext("2d"); //on défini le contexte du canvas : 2d
        this.canvas.width = 240;
        this.painting = false;
        this.counter = 0; //sert à compter le nombre de pixels pour vérifier la taille de la signature
        this.increaseCounter = false; //sert à permettre d'incrémenter this.counter uniquement si la souris est appuyée et en mouvement
    }
    
    //Methodes
   
    draw(x,y){ // x et y correspondent aux coordonées X et Y du pointer
        if(this.painting === true){ //si le bouton de la souris est enfoncé
            
            this.ctx.lineTo(x, y); //The lineTo() method adds a new point and creates a line TO that point FROM the last specified point in the canvas (this method does not draw the line). https://www.w3schools.com/TAgs/canvas_lineto.asp
            
            this.ctx.stroke(); //methode qui dessine / affiche EFFECTIVEMENT le tracé défini par le lineTo
        }  
    }
    
    
    
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // on efface le canvas en partant de la position (0,0) et sur toute sa largeur et hauteur
        this.counter = 0; //on reinitialise le compteur de pixel pour la signature
    }
    

    
    
    init(){
    //Eventlistners
        
        //Version ordinateur
        this.canvas.addEventListener("mouseup", function(){
            this.painting = false; //on désactive la posibilité de dessiner quand le bouton de la souris est relaché
            this.increaseCounter = false; //on arrête d'incrémenter le compteur pour la vérification de la longueur min de la signature
        }.bind(this));
        
        
        this.canvas.addEventListener("mouseout", function(){
            this.painting = false; //on désactive la posibilité de dessiner quand le pointer de la souris sort du cadre canvas. Permet d'éviter le bug : quand on dessine (mousedown), qu’on sort du cadre du canvas, relanche la souris (mouseup) et reviens sur le canvas alors le dessin continue alors que mouseup
            this.increaseCounter = false;
        }.bind(this));
        
        
        this.canvas.addEventListener("mousedown", function(){
            this.ctx.beginPath(); // on (re)défini le point de départ du tracé : The beginPath() method begins a path, or resets the current path.
            this.painting = true; //on active la posibilité de dessiner quand le bouton de la souris est enfoncé
            this.increaseCounter = true;  
        }.bind(this))
        
        
        this.canvas.addEventListener("mousemove", function(e){
            this.draw(e.offsetX, e.offsetY); // x et y correspondent aux coordonées X et Y du pointer // on  utilise offset pour récupérer la position du pointer par rapport au point d'origine du canvas (0,0 = coin supérieur gauche) du canvas. Et non pas clientX car il donne la position du pointer par rapport à la page ???
            // La propriété en lecture seule offsetX de l'interface MouseEvent(e) fournit le décalage sur l'axe X du pointeur de la souris entre cet évènement(e) et la bordure de la marge intérieure du noeud cible(canvas).
            
//            console.log(" Client " + e.clientX + "-" + e.clientY);         
//            console.log(" Offset " + e.offsetX + "-" + e.offsetY);
            if (this.increaseCounter === true){
                    this.counter++;
//            console.log(this.counter)
                } 
        }.bind(this));
        
        
        
        //Version mobile et tablette
        this.canvas.addEventListener("touchend", function(){
            this.painting = false; 
            this.increaseCounter = false;
            console.log(this.painting)
        }.bind(this));
        
                
        this.canvas.addEventListener("touchstart", function(){
            this.ctx.beginPath(); 
            this.painting = true; 
            this.increaseCounter = true;
                        console.log(this.painting)

        }.bind(this))
        
        
        
        this.canvas.addEventListener("touchmove", function(e){
            
            let rect = this.canvas.getBoundingClientRect(); //La méthode Element.getBoundingClientRect() renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage (viewport). --> on récupère les dimensions du canvas
            
            let touchX = e.touches[0].clientX - rect.left; //touches renvoi une list TouchList (liste des points de contacts touchés sur un touchpad). On selectionne le premier point de contact de la liste ( point de départ du toucher). On obtient la bonne coordonée avec clientX- Rect left car clientX donne la position par rapport au viewport et non a l'élément (ici canvas).
            let touchY = e.touches[0].clientY - rect.top;
            
            this.draw(touchX, touchY); // on dessine selon les position du doigts en X et Y
            
            if (this.increaseCounter === true){
                    this.counter++;
                } 
        }.bind(this));
        
        
        //Sert à éviter le déplacement de la fenêtre lors de la signature sur un touchpad, complément de touch-action : none (non supporté par Safari)
        //Jquerry utilisé ici au lieu de .addEventListener car pas possible de mettre plusieurs type d'évènement dans la list en JS ? 
        $(this.canvas).on("scroll touchmove mousewheel ", function(e){
            e.preventDefault();
            e.stopPropagation();
            return false; // a quoi sert le return false???
        })
        
        
    }
}



