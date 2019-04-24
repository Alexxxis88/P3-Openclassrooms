class Reservation {
    // Code pour définir la sation sélectionnée
    constructor(apiURL, stationNumber, contractName, apiKey, allstations){
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        this.stationNumber = stationNumber;
        
        
        
        
        this.allstations = allstations; // récupère toutes les stations de stations.js
//        this.selectedStation = this.allstations.stationNumber; //PROBLEME   récupère bien le numéro de station défini dans stations.js MAIS le numéro de station this.stationNumber = [] doit changer DANS L'URL DU AJAXGET CI DESSOU à chaque clic sur un marker, avec le numéro de la station associée au lieu de [] . 
////        this.testbuttonvalue = "test"
        
        
        // A SUPPRIMER bouton de control this.selectedStation
        document.getElementById("testbtnselectedStation").addEventListener("click", () =>{
                console.log( this.stationNumber)
                });
        
        
        
        ajaxGet(this.apiURL + "/" + this.stationNumber + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let currentStation = JSON.parse(data);
            
            
            
            
            //Si on a déja une réservation en cours dans sessionStorage
                    if (sessionStorage.getItem("SSstationName") && 
                        sessionStorage.getItem("SSavailableBike") &&
                        localStorage.getItem("LSfirstName") &&
                        localStorage.getItem("LSlastName")){  
                        
                        //Ajout des infos de sessionStorage dans la section "Ma réservation"
                        document.getElementById("resaName").innerHTML = "";
                        document.getElementById("resaName").innerHTML = "Bonjour " + localStorage.getItem("LSfirstName").toUpperCase().bold() + " " + localStorage.getItem("LSlastName").toUpperCase().bold() //rajouter.bold() a checker  sur autre navigateurs
                        document.getElementById("resaStation").innerHTML = "";
                        document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + sessionStorage.getItem("SSstationName").bold();
                        document.getElementById("resaTimerText").innerHTML = "";
                        document.getElementById("resaTimerText").innerHTML = "Votre réservation expirera dans &nbsp;"; //rajouter.bold() a checker  sur autre navigateurs
                        $(".footerBtn").css("display", "block");       
                    }
            
            
            
            //Actions quand on clique sur le bouton Réserver    
                document.getElementById("reservationBtn").addEventListener("click", function(){
                        
                //Si une réservation est déja présent, on alerte le visiteur    
                    if (sessionStorage.getItem("SSstationName") && 
                    sessionStorage.getItem("SSavailableBike") &&
                    localStorage.getItem("LSfirstName") &&
                    localStorage.getItem("LSlastName")){
                        alert("Attention, vous avez déjà une réservation en cours à la station " + sessionStorage.getItem("SSstationName") + "." +
                              "\n" + "\nCette nouvelle réservation annule l'ancienne.")
                    }

                    let firstName = $( "#first_name" ).val();
                    let lastName = $( "#last_name" ).val()
                    let correctFormat = /^[a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+([-'\s][a-zA-ZçÇñÑàâäãÀÂÁÄÃéëêèÉÈÊûÛôÔÖÕöõÎÏîï]+){0,}$/i
                    //^ = début de chaine, $ = fin de chaine, {0,} de zero fois a l'infini, i = insenssible à la casse

                    //Empèche les champs vides
                    if ( firstName.length === 0 || lastName.length === 0){ 
                        alert("Merci de remplir les champs PRENOM et NOM")
                    } 
                    //Empèche les champs non conformes (tous les caractères autres que lettres, espace et tirets) 
                    else if ( firstName.length < 2 || lastName.length < 2 ||
                            !correctFormat.test(firstName) || !correctFormat.test(lastName)){   
                            alert("Vérifiez les champs NOM et PRENOM")
                    }

                    else{
                                        
                        
                        $(".cancelBtn").css("display", "block");
                        document.getElementById("reservationBtn").disabled = true;

                        currentStation.available_bikes--; // je retire a la station en cours. reste à voir comment la définir dans le 1er paramète de cet ajaxGet
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += currentStation.available_bikes;

                        //Désactive les inputs & remerciements
                        $(":text" ).css("display", "none");
                        $("#thanksText").css("display", "block");

                        //Ajout du texte dans la section "Ma réservation"
                        document.getElementById("resaName").innerHTML = "";
                        document.getElementById("resaName").innerHTML = "Bonjour " + localStorage.getItem("LSfirstName").toUpperCase().bold() + " " + localStorage.getItem("LSlastName").toUpperCase().bold() //rajouter.bold() a checker  sur autre navigateurs
                        document.getElementById("resaStation").innerHTML = "";
                        document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + currentStation.name.split("-")[1].bold();
                        document.getElementById("resaTimerText").innerHTML = "";
                        document.getElementById("resaTimerText").innerHTML = "Votre réservation expirera dans &nbsp;"; 
                       

                        //Sauvegarde de la réservation dans sessionStorage
                        sessionStorage.setItem("SSstationName", currentStation.name.split("-")[1]);
                        sessionStorage.setItem("SSavailableBike", currentStation.available_bikes); // ne marche pas ?                

                    }
                });
                
            //Actions quand on clique sur le bouton Annuler
                $(".cancelBtn").on( "click", function(){
                    $(".cancelBtn").css("display", "none");
                    document.getElementById("reservationBtn").disabled = false;

                    currentStation.available_bikes++; // j'ajoute a la station en cours. reste à voir comment la définir dans le 1er paramète de cet ajaxGet
                    document.getElementById("station-dispo").innerHTML = "";
                    document.getElementById("station-dispo").innerHTML += currentStation.available_bikes;


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
//                      currentStation.available_bikes++; //pas sur que ça marche car peut etre pas la bonne station, peut etre mettre un last station ? 
                });         
        }.bind(this))
        
        
        
        
        
        
        
        
        
    }
}