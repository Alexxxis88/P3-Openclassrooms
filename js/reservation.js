// ------------------------------------- //
// ------------ Reservation  ----------- //
// ------------------------------------- //

class Reservation {
    // Code pour définir la sation sélectionnée
    constructor(apiURL, contractName, apiKey, allstations){
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        this.allstations = allstations; // correspond à l'objet biclooStations de la classe Stations
        this.delayedThanks = []  //pour faire disparaitre "merci pour votre réservation" après 3 secondes
        

        //Actions quand on clique sur le bouton Réserver    
        document.getElementById("reservationBtn").addEventListener("click", function(){
            
            //Vérification de la conformité du Prénom et Nom
            let firstName = $("#first_name").val();
            let lastName = $("#last_name").val()
            let correctFormat = /^[a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+([-'\s][a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+){0,}$/i
            //^ = début de chaine, $ = fin de chaine, {0,} de zero fois a l'infini, i = insenssible à la casse

            //Empèche les champs vides
            if (firstName.length === 0 || lastName.length === 0){ 
                alert("Merci de remplir les champs PRENOM et NOM")
            } 

            //Empèche les champs non conformes (tous les caractères autres que lettres, espaces, apostrophes et tirets) 
            else if (firstName.length < 2 || lastName.length < 2 || !correctFormat.test(firstName) || !correctFormat.test(lastName)){   
                    alert("Vérifiez les champs NOM et PRENOM")
            }


            else{
                $("#canvas").css("display", "block");
                $("#reservationBtn").css("display", "none");
                $("#signBtn").css("display", "block");
                $("#eraseBtn").css("display", "block");
                document.getElementById("reservationBtn").disabled = true; //inutile ???
            }
         }.bind(this));    
        
   
        //Actions quand on clique sur le bouton Signer    
        document.getElementById("signBtn").addEventListener("click", function(){
            
            
            if(myCanvas.counter <= 40){ // si la signature est trop courte, on bloque la réservation
                alert("Votre signature est trop courte. Merci de la compléter ")
            }
            
            else{
                //Lancement du le timer
                if(timer.flag === "running"){ //si le timmer est déja en cours, on le stop puis on le relance
                    timer.stopTimer()
                    timer.startTimer();
                }
                else{ //s'il n'est pas déja en cours, on le lance
                     timer.startTimer();
                }

               //On annule la disparition retardé de "votre réservation a expiré" car sinon cela fera disparaitre le texte "Votre réservation expirera dans " et laissera juste le timer si on clique sur réserver à nouveau avant que "votre résa a expiré" ait disparru (3secs)
               clearTimeout(timer.delayedExpired);


                ajaxGet(this.apiURL + "/" + this.allstations.selectedStationNumber + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function(data) {
                    let currentStation = JSON.parse(data);

                    //Si une réservation est déja présent, on alerte le visiteur    
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

                    //Désactive les inputs, labels active remerciements, canvas et les boutons signer / effacer
                    $("label" ).css("display", "none");
                    $(":text" ).css("display", "none");
                    $("#thanksText").css("display", "block");
                    $("#canvas").css("display", "none");
                    $("#signBtn").css("display", "none");
                    $("#eraseBtn").css("display", "none");


                    // Fait disparaitre "merci pour votre réservation" après 3 secondes
                    this.delayedThanks = setTimeout(this.hideThanks.bind(this), 3000);


                    //Ajout du texte dans la section "Ma réservation"
                    document.getElementById("resaName").innerHTML = "";
                    document.getElementById("resaName").innerHTML = "Bonjour " + localStorage.getItem("LSfirstName").toUpperCase().bold() + " " + localStorage.getItem("LSlastName").toUpperCase().bold() //rajouter.bold() a checker  sur autre navigateurs
                    document.getElementById("resaStation").innerHTML = "";
                    document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + currentStation.name.split("-")[1].bold();
                    document.getElementById("resaTimerText").innerHTML = "";
                    document.getElementById("resaTimerText").innerHTML = "Votre réservation expirera dans&nbsp;"; 

                    //Sauvegarde de la réservation dans sessionStorage
                    sessionStorage.setItem("SSstationName", currentStation.name.split("-")[1]);
                    sessionStorage.setItem("SSavailableBike", currentStation.available_bikes--);  //sauvegarde le nombre de vélo - 1 pour palier au fait que l'on ne puisse pas envoyer d'info au serveur, donc on récupère ensuite via getItem(SSavailableBike) la "vraie" valeur théorique et non celle de l'API JC decaux qui n'a pas pris en compte la réservation (-1)            

                }.bind(this))
            }
        }.bind(this))    
       
        
        //Actions quand on clique sur le bouton effacer
        $("#eraseBtn").on( "click", function(){
            
            //on nettoie le canvas
            myCanvas.clear();
        });
        
        //Actions quand on clique sur le bouton Annuler
        $(".cancelBtn").on( "click", function(){
            
            //on nettoie et cache le canvas
            myCanvas.clear();
            $("#canvas").css("display", "none");

            //on stop le timer 
            timer.stopTimer();
            
            $("#signBtn").css("display", "none");
            $(".cancelBtn").css("display", "none");
            document.getElementById("reservationBtn").disabled = false; //inutile ??

            //vu que l'on est plus dans l'ajaxGet on ne peut plus utiliser currentStation.available_bikes pour mettre à jour la valeur donc on récupère la valeur html du champ "velo disponible", on le converti en nombre et on lui ajoute 1
            document.getElementById("station-dispo").innerHTML = Number(document.getElementById("station-dispo").innerHTML) + 1;

            //Active les inputs, désactive texte remerciement et canvas
            $("label" ).css("display", "block");
            $( ":text" ).css("display", "block");
            $("#thanksText").css("display", "none");
//          $("canvas").css("display", "none");

            //Retire le texte de "Ma réservation"
            document.getElementById("resaName").innerHTML = "";
            document.getElementById("resaName").innerHTML = "Vous n'avez aucune réservation en cours";
            document.getElementById("resaStation").innerHTML = "";
            document.getElementById("resaTimerText").innerHTML = "";


            //Supprimer de la réservation du sessionStorage !! // on utilise pas un sessionStorage.clear() car sinon SSinitialTimer est supprimée également et cela cause un bug dans stopTimer() puisque this.counter = sessionStorage.getItem("SSinitialTimer") ne vaut pas 1200 mais 0/null/[]
//          sessionStorage.clear();
            sessionStorage.removeItem("SSstationName");
            sessionStorage.removeItem("SSavailableBike");
            sessionStorage.removeItem("SSavailableBike")
        }); 
    }
    
    // Methode pour faire disparaitre "merci pour votre réservation" après 3 secondes
    hideThanks(){
        $("#thanksText").css("display", "none");
    }
    
}