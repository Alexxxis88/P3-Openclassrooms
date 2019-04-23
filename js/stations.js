// ------------------------------------- //
// -------------- Stations ------------- //
// ------------------------------------- //


class Stations {
    constructor(apiURL, contractName, apiKey, myMap){
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        this.myMap = myMap;
        this.marker = [];
        
        
        
        
        //sert a envoyer le numéro de stations dans reservation.js
        this.stationNumber = []; //PROBLEME : ne se rempli pas comme je le voudrai a chaque fois qu'on click sur un marquer (ligne 105). est ce que ce                              this.stationNumber est le même que celui ligne 105?
        
        
        
        
        
        
        
        this.markersCluster = new L.MarkerClusterGroup();
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
//        this.markerColor = "";
//        this.icon  = L.icon({
//                    iconUrl: "img/marker" + this.markerColor + ".png",
//                    iconSize: [45, 45]
//                    });
        
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
                        $(".infoColor").css("background-color", "red");
                        document.getElementById("station-status").innerHTML = "";
                        document.getElementById("station-status").innerHTML += "Station fermée";
                        document.getElementById("reservationBtn").style.display = "none" ;
                        $(".infoResaBtn").css("display", "none"); ;
                        $("#thanksText").css("display", "none");
                    }
                    else if(station.available_bikes <= 0 ){
                        $(".infoColor").css("background-color", "red");
                        document.getElementById("reservationBtn").style.display = "none" ;
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                    }
                    
                    else if(station.available_bikes < station.bike_stands / 2){
                        $(".infoColor").css("background-color", "orange");
                        document.getElementById("reservationBtn").style.display = "block" ;
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                        $( ":text" ).css("display", "block");

                        
                    }
                    else{
                         $(".infoColor").css("background-color", "green");
                        document.getElementById("reservationBtn").style.display = "block" ;
                        $(".infoResaBtn").css("display", "none");
                        $("#thanksText").css("display", "none");
                        $( ":text" ).css("display", "block");


                    }
                    
                    
                    
                    
                    
 //PROBLEME          //sauvegarde du numéro de station sélectionné  this.stationNumber pour l'appeler dans reservation.js via this.selectedStation
                        this.stationNumber = station.number;
//                        console.log(this.stationNumber);
                    
                    
                    
                    
                    
                    
                        document.getElementById("reservationBtn").disabled = false;
                    
                        document.getElementById("station-status").innerHTML = "";
                        document.getElementById("station-status").innerHTML += "Station ouverte";
                    
                        document.getElementById("station-nom").innerHTML = "";
                        document.getElementById("station-nom").innerHTML += station.name.split("-")[1];
                        
                        document.getElementById("station-adresse").innerHTML = "";
                        document.getElementById("station-adresse").innerHTML += station.address;
                        
                        document.getElementById("station-capacite").innerHTML = "";
                        document.getElementById("station-capacite").innerHTML += station.bike_stands;
                    
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += station.available_bikes;  
                });           
            })
        }.bind(this));
              
        
    }  
}


