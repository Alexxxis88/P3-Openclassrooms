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
        this.selectedStationNumber = []; //récupère le numéro de la sation sélectionnée (utilisé dans reservation.js pour définir l'url de l'API)
        this.greenIcon  = L.icon({
                    iconUrl: "img/marker-green.png",
                    iconSize:     [45, 45],
                    iconAnchor:   [0, 0]
                    });
        this.orangeIcon  = L.icon({
                    iconUrl: "img/marker-orange.png",
                    iconSize:     [45, 45],
                    iconAnchor:   [0, 0]
                    });            
        this.redIcon  = L.icon({
                    iconUrl: "img/marker-red.png",
                    iconSize:     [45, 45],
                    iconAnchor:   [0, 0]
                    });
//        this.markerColor = [];
//        this.Icon  = L.icon({
//                    iconUrl: "img/marker-" + this.markerColor + ".png",
//                    iconSize:     [45, 45],
//                    iconAnchor:   [0, 0]
//                    });
        
        
        
        // Code pour récupérer les informations de toutes les stations 
        ajaxGet(this.apiURL + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let allStations = JSON.parse(data);
            allStations.forEach((station) => {
                
                //Couleur des marqueurs en fonction du nb de vélos 
                
                //permet d'afficher le maqueur de la station en rouge si la station est fermée
                if(station.status === "CLOSED"){ // 0 vélo disponible ou station fermée
//                    this.markerColor = "red";
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.redIcon });//logo rouge
                    this.markersCluster.addLayer(this.marker)
                }
                
                else if(station.available_bikes < station.bike_stands / 2){ // moins de la moitié des vélos sont disponibles
//                    this.markerColor = "orange";
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.orangeIcon});//logo orange
                    this.markersCluster.addLayer(this.marker)                   
                }
                else { // plus de la moitié des vélos disponibles
//                    this.markerColor = "green";
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.greenIcon}); //logo vert
                    this.markersCluster.addLayer(this.marker)
                } 
                this.myMap.mapTemplate.addLayer(this.markersCluster); //ajout des marqueurs au layer markersCluster
                
          
                
                //Affichage des infos dans le panneau Détails
                this.marker.addEventListener("click", () => { //savoir expliquer pourquoi fonction fléchée plutot que function(), joue sur la valeur de this et le fait d'utiliser ou non .bind(this)
                        
                     if( station.status === "CLOSED" ){
                        $(".infoColor").css("background-color", "red");
                        document.getElementById("station-status").innerHTML = "";
                        document.getElementById("station-status").innerHTML += "Fermée";
                        $("#reservationBtn").css("display", "none");
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                        myCanvas.clear();
                        $("#canvas").css("display", "none");
                    }
                    
                    //si le nombre de vélo dispo est égal a zéro OU si le nom de la station associé au marker sur lequel je clic = celui de la réservation en cours ET que le nombre de vélo dans sessionStorage = 0, alors on désactive le bouton de réservation etc
                    else if(station.name.split("-")[1] == sessionStorage.getItem("SSstationName") && 
                       sessionStorage.getItem("SSavailableBike") == 0 || station.available_bikes === 0 ){
                        $(".infoColor").css("background-color", "orange");
                        $("#reservationBtn").css("display", "none");
                        $("#signBtn").css("display", "none");
                        $("#eraseBtn").css("display", "none");
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                        myCanvas.clear();
                        $("#canvas").css("display", "none");
                    }
                    else if(station.available_bikes < station.bike_stands / 2){
                        $(".infoColor").css("background-color", "orange");
                        $("#reservationBtn").css("display", "block");
                        $("#signBtn").css("display", "none");
                        $("#eraseBtn").css("display", "none");
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                        $( ":text" ).css("display", "block");
                        myCanvas.clear();
                        $("#canvas").css("display", "none");
                    }
                    else{
                        $(".infoColor").css("background-color", "green");
                        $("#reservationBtn").css("display", "block");
                        $("#signBtn").css("display", "none");
                        $("#eraseBtn").css("display", "none");
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                        $( ":text" ).css("display", "block");
                        myCanvas.clear();
                        $("#canvas").css("display", "none");
                    }
                    
                    document.getElementById("reservationBtn").disabled = false; //inutile ??
                    document.getElementById("station-status").innerHTML = "";
                    document.getElementById("station-status").innerHTML += "Ouverte";
                    document.getElementById("station-nom").innerHTML = "";
                    document.getElementById("station-nom").innerHTML += station.name.split("-")[1];
                    document.getElementById("station-adresse").innerHTML = "";
                    document.getElementById("station-adresse").innerHTML += station.address;
                    document.getElementById("station-capacite").innerHTML = "";
                    document.getElementById("station-capacite").innerHTML += station.bike_stands;
                    
                    
                    
                    //Si station name du marker = station name du sessionStorage alors station-dispo =  nb de vélo du sessionStorage
                    //fait en sorte de "garder en mémoire" le nouveau nombre de vélo (availablebikes-1). Si on résa un vélo puis reclique sur le marker de la station (qu'on recharge la page ou non), le bon nombre dé vélo s'affiche. 
                    //sert a contourner le fait qu'on envoi aucune info au serveur
                    if(station.name.split("-")[1] == sessionStorage.getItem("SSstationName")){
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += sessionStorage.getItem("SSavailableBike");  
                    }else{
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += station.available_bikes;
                    }
                    
                      
                    
                    this.selectedStationNumber = station.number; // sert a récupérer le numéro de la sation sélectionné
                });           
            })
        }.bind(this));  
    }  
}


