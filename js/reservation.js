class Reservation {
    // Code pour définir la sation sélectionnée
    constructor(apiURL, contractName, apiKey){
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        
        ajaxGet(this.apiURL + "/" + "5" + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let currentStation = JSON.parse(data);
            
            
            //Actions quand on clique sur le bouton Réserver    
                    document.getElementById("reservationBtn").addEventListener("click", function(){
                        
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

                            //Désactive les inputs
                            $( ":text" ).css("display", "none");

                            //Récupération du nom et prénom
                            let lastName = document.getElementById("last_name").value;
                            let firstName = document.getElementById("first_name").value;

                            //Ajout du texte dans la section "Ma réservation"
                            document.getElementById("resaName").innerHTML = "";
                            document.getElementById("resaName").innerHTML = "Bonjour " + firstName.bold() + " " + lastName.bold() //rajouter.bold() a checker  sur autre navigateurs
                            document.getElementById("resaStation").innerHTML = "";
                            document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + currentStation.name.split("-")[1].bold();
                            document.getElementById("resaTimer").innerHTML = "";
                            document.getElementById("resaTimer").innerHTML = "Votre réservation expirera dans <strong>« temps du timer »</strong>"; //rajouter.bold() a checker  sur autre navigateurs
                        }

                        
                        
                });
                
            //Actions quand on clique sur le bouton Annuler
                    $(".cancelBtn").on( "click", function(){
                        $(".cancelBtn").css("display", "none");
                        document.getElementById("reservationBtn").disabled = false;

                        currentStation.available_bikes++; // j'ajoute a la station en cours. reste à voir comment la définir dans le 1er paramète de cet ajaxGet
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += currentStation.available_bikes;
                        
                        
                        //Désactive les inputs
                        $( ":text" ).css("display", "block");

                        
                        //Retire le texte de "Ma réservation"
                        document.getElementById("resaName").innerHTML = "";
                        document.getElementById("resaName").innerHTML = "Vous n'avez aucune réservation en cours";
                        document.getElementById("resaStation").innerHTML = "";
                        document.getElementById("resaTimer").innerHTML = "";

                });     
                
                })
    }
}