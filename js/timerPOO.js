//var timeInMinutes = 1;
//var currentTime = Date.parse(new Date());
////var deadline = new Date(currentTime + timeInMinutes*60*1000);


class Timer{
    constructor(id){
        this.idTimer = id;
        this.endtime = "20:00";
        
        this.deadline = [];
        this.getClock = sessionStorage.getItem("clock");
        this.setClock = sessionStorage.setItem("clock", this.deadline);
        this.timeInMinutes = [];
        this.currentTime = Date.parse(new Date());
        this.t = [];
        this.seconds = Math.floor( (this.t/1000) % 60 );
        this.minutes = Math.floor( (this.t/1000/60) % 60 );
        this.clock = document.getElementById(id);
//        this.timeInterval = setInterval(this.NOMDELAFONCTION.bind(this),1000);
        
    }

//        clockCheck(){
//            // if there's a cookie with the name myClock, use that value as the deadline
//            if(this.getClock){
//              // get deadline value from cookie
//              this.deadline = this.getClock;
//            }
//
//            // otherwise, set a deadline 10 minutes from now and 
//            // save it in a cookie with that name
//            else{
//              // create deadline 10 minutes from now
//              this.timeInMinutes = 1;
//              this.currentTime;
//              this.deadline = new Date(this.currentTime + this.timeInMinutes*60*1000);
//
//              // store deadline in cookie for future reference
//               this.setClock;
//            }
//        }

        getTimeRemaining(endTime){
            this.t = Date.parse(this.endTime) - Date.parse(new Date());
            this.seconds
            this.minutes
            return {
                'total': this.t,
                'minutes': this.minutes,
                'seconds': this.seconds
            };
        };


        initializeClock(idTimer, endTime){
          this.clock;
          var timeinterval = setInterval(function(){
            this.t = this.getTimeRemaining(this.endTime);
            this.clock.innerHTML = ('0' + this.t.minutes).slice(-2) +  ':' + ('0' + this.t.seconds).slice(-2)
            if(this.t.total<=0){
              clearInterval(timeinterval);
              document.getElementById("resaTimer").innerHTML = "";
              document.getElementById("resaTimerText").innerHTML = "Votre réservation a expiré.";   
            }
          }.bind(this),1000);
        }



//        //Actions quand on clique sur le bouton Réserver    
//                        document.getElementById("reservationBtn").addEventListener("click", function(){
//                            this.initializeClock('resaTimer', this.deadline);})
//        
//        //Actions quand on clique sur le bouton Annuler
//                            $(".cancelBtn").on( "click", function(){
//
//                            })

}

let timer = new Timer("resaTimer");
//timer.clockCheck();
timer.getTimeRemaining();
timer.initializeClock()