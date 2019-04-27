// ------------------------------------- //
// --------------- Timer  -------------- //
// ------------------------------------- //

class Timer{
    constructor(id,counter){
        this.idTimer = id;
        this.counter = counter;
        this.timeInterval = [];
        this.flag = [];
        this.delayedExpired = []; //pour faire disparaitre "Votre réservation a expiré" après 3 secondes        
        this.minutes = [];
        this.secondes = [];
        this.remainingTime = []; // voir plus bas pour explication
    }
    

    startTimer(){
        sessionStorage.setItem("SSinitialTimer", this.counter); // on récupère la valeur du counter initial défini en paramètre lors de d'instanciation de l'objet dans mains.js --- voir suite dans stopTimer()
        this.timeInterval = setInterval(this.runTimer.bind(this), 1000);
    }
     
    runTimer(){  
        if (this.counter >= 0) {
            this.flag = "running"
            this.counter--;
            this.minutes = Math.floor(this.counter / 60);
            this.secondes = this.counter - this.minutes * 60;
            
            if(this.secondes < 10){
               this.secondes = "0" + this.secondes
            }
            
            if(this.minutes < 10){
               this.minutes = "0" + this.minutes
            }
            
            this.remainingTime = this.minutes + ":" + this.secondes; // voir plus bas pour explication je rajoute cette étape au lieu de mettre directement this.minutes + ":" + this.secondes; a la ligne d'en dessous pour éviter que après avoir rechargé la page, seul les deux points ":" s'affichent avant que les valeurs this.minutes et this.secondes soit récupérer. C'est purement esthétique.
            document.getElementById("resaTimer").innerHTML = this.remainingTime;
            sessionStorage.setItem("SStimer", this.counter);
        }
        
        if (this.counter === 0) {
            clearInterval(this.timeInterval);
            
            ///tout le bloc suivant *** *** même action que le bouton annuler. On peut peut être regrouper les actions sur le bouton annuler dans une méthode dans la classe réservation et plutot que copier / coller le code ici on appelle juste cette méthode cancelReservation() ?
            
            ///***
            $(".cancelBtn").css("display", "none");
            document.getElementById("reservationBtn").disabled = false;

            //vu que l'on est plus dans l'ajaxGet on ne peut plus utiliser currentStation.available_bikes pour mettre à jour la valeur donc on récupère la valeur html du champ "velo disponible", on le converti en nombre et on lui ajoute 1
            document.getElementById("station-dispo").innerHTML = Number(document.getElementById("station-dispo").innerHTML) + 1;

            //Active les inputs
            $( ":text" ).css("display", "block");
            $("#thanksText").css("display", "none");

            //Retire le texte de "Ma réservation"
            document.getElementById("resaName").innerHTML = "";
            document.getElementById("resaName").innerHTML = "Vous n'avez aucune réservation en cours";
            document.getElementById("resaStation").innerHTML = "";
            document.getElementById("resaTimerText").innerHTML = "";


            //Supprimer de la réservation du sessionStorage
            sessionStorage.clear();
            
            //***
            
            
            document.getElementById("resaTimer").innerHTML = "";
            document.getElementById("resaTimerText").innerHTML = "Votre réservation a expiré.";
            
            // Fait disparaitre "Votre réservation a expiré" après 3 secondes
            this.delayedExpired = setTimeout(this.hideExpired.bind(this), 3000);
        }
    }
    
    stopTimer(){
        clearInterval(this.timeInterval);
        this.flag = "stopped"
        this.counter = sessionStorage.getItem("SSinitialTimer"); // on récupère la valeur du counter initial défini a l'instanciation de l'objet et on le réinjecte ici pour relancer le compteur a 1200 secondes. Fonctionne en métant directement this.counter = 1200 mais perd son coté réutilisable en objet car si je veux un autre timer c'est hard codé ici. 
        document.getElementById("resaTimer").innerHTML = "";
        document.getElementById("resaTimerText").innerHTML = "";
    }
    
    // Methode pour faire disparaitre "Votre réservation a expiré" après 3 secondes
    hideExpired(){
        document.getElementById("resaTimerText").innerHTML = "";
    }  
}





