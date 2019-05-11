// ------------------------------------- //
// --------------- Timer  -------------- //
// ------------------------------------- //

class Timer{
    constructor(id,counter){
        this.idTimer = id;
        this.counter = counter;
        this.timeInterval = [];
        this.flag = [];
        this.delayedExpired = [];      
        this.minutes = [];
        this.secondes = [];
        this.remainingTime = [];
        sessionStorage.setItem("SSinitialTimer", this.counter);
    }
    
    //METHODS
    startTimer(){
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
            
            //Hack to prevent a display bug when reloading the page with a slow internet connection (only for aesthetic purpose)
            this.remainingTime = this.minutes + ":" + this.secondes;
            document.getElementById("resaTimer").innerHTML = this.remainingTime;
            sessionStorage.setItem("SStimer", this.counter);
        }
        
        if (this.counter === 0) {
            clearInterval(this.timeInterval);
            $(".cancelBtn").css("display", "none");
            $("#canvas").css("display", "none");

            //vu que l'on est plus dans l'ajaxGet on ne peut plus utiliser currentStation.available_bikes pour mettre à jour la valeur donc on récupère la valeur html du champ "velo disponible", on le converti en nombre et on lui ajoute 1
            //Hack to display correct expected available bikes number since we are not sending the reservation to the server
            document.getElementById("station-dispo").innerHTML = Number(document.getElementById("station-dispo").innerHTML) + 1;

            //Display text and thanks
            $( ":text" ).css("display", "block");
            $("#thanksText").css("display", "none");

            //Clear "Ma réservation" information
            document.getElementById("resaName").innerHTML = "";
            document.getElementById("resaName").innerHTML = "Vous n'avez aucune réservation en cours";
            document.getElementById("resaStation").innerHTML = "";
            document.getElementById("resaTimerText").innerHTML = "";


            //Clear sessionStorage except SSinitialTimer
            sessionStorage.removeItem("SSstationName");
            sessionStorage.removeItem("SSavailableBike");
            sessionStorage.removeItem("SSavailableBike")
            
         
            //Display a message to alert the user reservation is over
            document.getElementById("resaTimer").innerHTML = "";
            document.getElementById("resaTimerText").innerHTML = "Votre réservation a expiré.";
            
            // Hide "Votre réservation a expiré" after 3 seconds
            this.delayedExpired = setTimeout(this.hideExpired.bind(this), 3000);
        }
    }
    
    stopTimer(){
        clearInterval(this.timeInterval);
        this.flag = "stopped"
        this.counter = sessionStorage.getItem("SSinitialTimer"); //Reset timer with intial counter (1200s)
        document.getElementById("resaTimer").innerHTML = "";
        document.getElementById("resaTimerText").innerHTML = "";
    }
    
    // Method to hide "Votre réservation a expiré"
    hideExpired(){
        document.getElementById("resaTimerText").innerHTML = "";
    }  
}





