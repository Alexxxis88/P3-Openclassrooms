// ------------------------------------- //
// ------------ Reservation  ----------- //
// ------------------------------------- //

class Reservation {
    constructor(apiURL, contractName, apiKey, allstations){
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        this.allstations = allstations;
        this.delayedThanks = [];
        

        //Reservation Button Eventlistener  
        document.getElementById("reservationBtn").addEventListener("click", function(){
            
            //First and Last Name conformity check
            let firstName = $("#first_name").val();
            let lastName = $("#last_name").val()
            let correctFormat = /^[a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+([-'\s][a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+){0,}$/i
           

            //Prevent empty fields
            if (firstName.length === 0 || lastName.length === 0){ 
                alert("Merci de remplir les champs PRENOM et NOM")
            } 

            //Prevent non-conform names
            else if (firstName.length < 2 || lastName.length < 2 || !correctFormat.test(firstName) || !correctFormat.test(lastName)){   
                    alert("Vérifiez les champs NOM et PRENOM")
            }

            //If names are correct
            else{
                $("#canvas").css("display", "block");
                $("#reservationBtn").css("display", "none");
                $("#signBtn").css("display", "block");
                $("#eraseBtn").css("display", "block");
            }
         }.bind(this));    
        
   
        //Sign Button Eventlistener     
        document.getElementById("signBtn").addEventListener("click", function(){
            
            //Signature length check
            if(myCanvas.counter <= 40){
                alert("Votre signature est trop courte. Merci de la compléter ")
            }
            
            else{
                //Starting Timer
                if(timer.flag === "running"){
                    timer.stopTimer()
                    timer.startTimer();
                }
                else{ 
                     timer.startTimer();
                }

            //Cancel "votre réservation a expiré" fade out to prevent display bugs
            clearTimeout(timer.delayedExpired);

                
            //Reservation validation for the selected station  
            ajaxGet(this.apiURL + "/" + this.allstations.selectedStationNumber + "?contract=" + this.contractName + "&apiKey=" + this.apiKey,               function(data) {
                    let currentStation = JSON.parse(data);

                    //If there is already a reservation, user is alerted   
                    if (sessionStorage.getItem("SSstationName") &&  
                    sessionStorage.getItem("SSavailableBike") &&
                    localStorage.getItem("LSfirstName") &&
                    localStorage.getItem("LSlastName")){
                        alert("Attention, vous avez déjà une réservation en cours à la station " + sessionStorage.getItem("SSstationName") + "." +
                              "\n" + 
                              "\nCette nouvelle réservation annule l'ancienne.")
                    }

                    $(".cancelBtn").css("display", "block");
                    currentStation.available_bikes--;
                    document.getElementById("station-dispo").innerHTML = "";
                    document.getElementById("station-dispo").innerHTML += currentStation.available_bikes;

                    //Hide inputs, labels, thanks, canvas, sign / clear buttons
                    $("label" ).css("display", "none");
                    $(":text" ).css("display", "none");
                    $("#thanksText").css("display", "block");
                    $("#canvas").css("display", "none");
                    $("#signBtn").css("display", "none");
                    $("#eraseBtn").css("display", "none");


                    // Hide "merci pour votre réservation" after 3 seconds
                    this.delayedThanks = setTimeout(this.hideThanks.bind(this), 3000);


                    //Display reservation information in "Ma réservation"
                    document.getElementById("resaName").innerHTML = "";
                    document.getElementById("resaName").innerHTML = "Bonjour " + localStorage.getItem("LSfirstName").toUpperCase().bold() + " " + localStorage.getItem("LSlastName").toUpperCase().bold();
                    document.getElementById("resaStation").innerHTML = "";
                    document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + currentStation.name.split("-")[1].bold();
                    document.getElementById("resaTimerText").innerHTML = "";
                    document.getElementById("resaTimerText").innerHTML = "Votre réservation expirera dans&nbsp;"; 

                    //Store reservation in sessionStorage
                    sessionStorage.setItem("SSstationName", currentStation.name.split("-")[1]);
                    sessionStorage.setItem("SSavailableBike", currentStation.available_bikes--);            
                }.bind(this))
            }
        }.bind(this))    
       
        
        //Erase Button Eventlistener
        $("#eraseBtn").on( "click", function(){
            myCanvas.clear();
        });
        
        //Cancel Button Eventlistener
        $(".cancelBtn").on( "click", function(){
            myCanvas.clear();
            $("#canvas").css("display", "none");
            timer.stopTimer();
            $("#signBtn").css("display", "none");
            $(".cancelBtn").css("display", "none");

            //Hack to display correct expected available bikes number since we are not sending the reservation to the server
            document.getElementById("station-dispo").innerHTML = Number(document.getElementById("station-dispo").innerHTML) + 1;

            //Display inputs and text, hide thanks
            $("label" ).css("display", "block");
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
        }); 
    }
    
    // Hide "merci pour votre réservation" after 3 seconds
    hideThanks(){
        $("#thanksText").css("display", "none");
    } 
}