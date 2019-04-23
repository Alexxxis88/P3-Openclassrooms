//var timeInMinutes = 1;
//var currentTime = Date.parse(new Date());
////var deadline = new Date(currentTime + timeInMinutes*60*1000);


class Timer{
    
    constructor(){

            // if there's a cookie with the name myClock, use that value as the deadline
        if(sessionStorage.getItem("clock")){
          // get deadline value from cookie
          var deadline = sessionStorage.getItem("clock");
        }

        // otherwise, set a deadline 10 minutes from now and 
        // save it in a cookie with that name
        else{
          // create deadline 10 minutes from now
          var timeInMinutes = 59;
          var currentTime = Date.parse(new Date());
          var deadline = new Date(currentTime + timeInMinutes*60*1000);

          // store deadline in cookie for future reference
          sessionStorage.setItem("clock", deadline);
        }



        function getTimeRemaining(endtime){
          var t = Date.parse(endtime) - Date.parse(new Date());
          var seconds = Math.floor( (t/1000) % 60 );
          var minutes = Math.floor( (t/1000/60) % 60 );
          return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
          };
        }


        function initializeClock(id, endtime){
          var clock = document.getElementById(id);
          var timeinterval = setInterval(function(){
            var t = getTimeRemaining(endtime);
            clock.innerHTML = ('0' + t.minutes).slice(-2) +  ':' + ('0' + t.seconds).slice(-2)
            if(t.total<=0){
              clearInterval(timeinterval);
              document.getElementById("resaTimer").innerHTML = "";
              document.getElementById("resaTimerText").innerHTML = "Votre réservation a expiré.";   
            }
          },1000);
        }



        //Actions quand on clique sur le bouton Réserver    
            document.getElementById("reservationBtn").addEventListener("click", function(){
                initializeClock('resaTimer', deadline);})

        //Actions quand on clique sur le bouton Annuler
            $(".cancelBtn").on( "click", function(){ 
                
            })                                      

    }
}

let timer = new Timer("resaTimer");
