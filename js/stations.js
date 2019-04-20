// ------------------------------------- //
// -------------- Stations ------------- //
// ------------------------------------- //


class Stations {
    constructor(apiURL, contractName, apiKey, myMap){
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        this.myMap = myMap;
        this.markersCluster = new L.MarkerClusterGroup();
        this.greenIcon  = L.icon({
                    iconUrl: 'img/marker-green.png',
                    iconSize:     [45, 45],
                    iconAnchor:   [0, 0]
                    });
        this.orangeIcon  = L.icon({
                    iconUrl: 'img/marker-orange.png',
                    iconSize:     [45, 45],
                    iconAnchor:   [0, 0]
                    });            
        this.redIcon  = L.icon({
                    iconUrl: 'img/marker-red.png',
                    iconSize:     [45, 45],
                    iconAnchor:   [0, 0]
                    });
//        this.markerColor = "";
//        this.icon  = L.icon({
//                    iconUrl: "img/marker" + this.markerColor + ".png",
//                    iconSize: [45, 45]
//                    });
        this.marker = [];
        // Code pour récupérer les informations de toutes les stations 
        ajaxGet(this.apiURL + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let allStations = JSON.parse(data);
            allStations.forEach((station) => {
                
                
            //Couleur des marqueurs en fonction du nb de vélos 
                if(station.available_bikes === 0 || station.status === "CLOSED" ) { // 0 vélo disponible ou station fermée
//                    this.markerColor = "-red";

                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.redIcon });//logo rouge
                    this.markersCluster.addLayer(this.marker)
                }
                else if(station.available_bikes < station.bike_stands / 2){ // moins de la moitié des vélos sont disponibles
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.orangeIcon});//logo orange
                    this.markersCluster.addLayer(this.marker)                   
                }
                else { // plus de la moitié des vélos disponibles
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.greenIcon}); //logo vert
                    this.markersCluster.addLayer(this.marker)
                } 
                this.myMap.mapTemplate.addLayer(this.markersCluster); //ajout des marqueurs au layer markersCluster
                
                
            //Affichage des infos dans le panneau Détails
                this.marker.addEventListener("click", function(){
                    if( station.status === "CLOSED" ){
                        $(".infoColor").css('background-color','red');
                        document.getElementById("station-status").innerHTML = "";
                        document.getElementById("station-status").innerHTML += "Station fermée";
                        document.getElementById("reservationBtn").style.display = "none" ;
                        document.getElementById("cancelBtn").style.display = "none" ;

                    }
                    else if(station.available_bikes <= 0 ){
                        $(".infoColor").css('background-color','red');
                        document.getElementById("reservationBtn").style.display = "none" ;
                        document.getElementById("cancelBtn").style.display = "none" ;
                    }
                    
                    else if(station.available_bikes < station.bike_stands / 2){
                        $(".infoColor").css('background-color','orange');
                        document.getElementById("reservationBtn").style.display = "block" ;
                        document.getElementById("cancelBtn").style.display = "none" ;
                        
                    }
                    else{
                         $(".infoColor").css('background-color','green');
                        document.getElementById("reservationBtn").style.display = "block" ;
                        document.getElementById("cancelBtn").style.display = "none" ;

                    }
                        document.getElementById("reservationBtn").disabled = false;
                    
                        document.getElementById("station-status").innerHTML = "";
                        document.getElementById("station-status").innerHTML += "Station ouverte";
                    
                        document.getElementById("station-nom").innerHTML = "";
                        document.getElementById("station-nom").innerHTML += station.name.split('-')[1];
                        
                        document.getElementById("station-adresse").innerHTML = "";
                        document.getElementById("station-adresse").innerHTML += station.address;
                        
                        document.getElementById("station-capacite").innerHTML = "";
                        document.getElementById("station-capacite").innerHTML += station.bike_stands;
                    
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += station.available_bikes;  
                });
                
                
             
                
                
            })
        }.bind(this));
        
        
        
                // Code pour définir la sation sélectionnée

        ajaxGet(this.apiURL + "/" + "5" + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let currentStation = JSON.parse(data);
            
            
            //Actions quand on clique sur le bouton Réserver    
                    document.getElementById("reservationBtn").addEventListener("click", function(){
                        document.getElementById("cancelBtn").style.display = "block";
                        document.getElementById("reservationBtn").disabled = true;
                        
                        currentStation.available_bikes--; // je retire a la station en cours. reste à voir comment la définir dans le 1er paramète de cet ajaxGet
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += currentStation.available_bikes;
                        
                        //Ajout du texte dans la section "Ma réservation"
                        document.getElementById("resaName").innerHTML = "";
                        document.getElementById("resaName").innerHTML = " Bonjour <strong>« prénom » + « nom »</strong>"; //rajouter.bold() a checker  sur autre navigateurs
                        document.getElementById("resaStation").innerHTML = "";
                        document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + currentStation.name.split('-')[1].bold();
                        document.getElementById("resaTimer").innerHTML = "";
                        document.getElementById("resaTimer").innerHTML = " Votre réservation expirera dans <strong>« temps du timer »</strong>"; //rajouter.bold() a checker  sur autre navigateurs

                    
                });
                
            //Actions quand on clique sur le bouton Annuler
                    document.getElementById("cancelBtn").addEventListener("click", function(){
                        document.getElementById("cancelBtn").style.display = "none";
                        document.getElementById("reservationBtn").disabled = false;

                        currentStation.available_bikes++; // j'ajoute a la station en cours. reste à voir comment la définir dans le 1er paramète de cet ajaxGet
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += currentStation.available_bikes;
                        
                        document.getElementById("resaName").innerHTML = "";
                        document.getElementById("resaName").innerHTML = "Vous n'avez aucune réservation en cours";
                        document.getElementById("resaStation").innerHTML = "";
                        document.getElementById("resaTimer").innerHTML = "";

                });     
                
                })
        
    }  
}

//Récupérer la liste des stations d'un contrat 
//https://api.jcdecaux.com/vls/v1/stations?contract={contract_name} 


//Récupérer les infos d'une station
//https://api.jcdecaux.com/vls/v1/stations/{station_number}?contract={contract_name} 