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
        this.selectedStationNumber = [];
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
        
        
        // Get information for all stations
        ajaxGet(this.apiURL + "?contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let allStations = JSON.parse(data);
            allStations.forEach((station) => {
                
                //Display marker color depending on station status
                if(station.status === "CLOSED"){
                    this.markerColor = "red";
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.redIcon });
                    this.markersCluster.addLayer(this.marker)
                }
                else if(station.available_bikes < station.bike_stands / 2){
                    this.markerColor = "orange";
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.orangeIcon});
                    this.markersCluster.addLayer(this.marker)                   
                }
                else { // plus de la moitié des vélos disponibles
                    this.markerColor = "green";
                    this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.greenIcon}); 
                    this.markersCluster.addLayer(this.marker)
                } 
                
                //Add the markersCluster layer containing all the makers to the map template
                this.myMap.mapTemplate.addLayer(this.markersCluster);
                
              
                
                //Display selected station information in the side pannel
                this.marker.addEventListener("click", () => {
                    
                    //On mobile & tablets, a clic on a marker scrolls to Information Pannel
                    if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)){
                        let speed = 750;
                        $("html, body").animate( { scrollTop: $("#infoStation").offset().top }, speed );
                    }
                        
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
                    
                    //Hide Reservation button and whatnot if no bikes left or if already a reserved bike on the station we clicked on AND no bike left
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
                    
                    document.getElementById("station-status").innerHTML = "";
                    document.getElementById("station-status").innerHTML += "Ouverte";
                    document.getElementById("station-nom").innerHTML = "";
                    document.getElementById("station-nom").innerHTML += station.name.split("-")[1];
                    document.getElementById("station-address").innerHTML = "";
                    document.getElementById("station-address").innerHTML += station.address;
                    document.getElementById("station-capacity").innerHTML = "";
                    document.getElementById("station-capacity").innerHTML += station.bike_stands;
                    
                    
                    //Hack to display correct expected available bikes number since we are not sending the reservation to the server
                    if(station.name.split("-")[1] == sessionStorage.getItem("SSstationName")){
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += sessionStorage.getItem("SSavailableBike");  
                    }else{
                        document.getElementById("station-dispo").innerHTML = "";
                        document.getElementById("station-dispo").innerHTML += station.available_bikes;
                    }
                    
                    //Get the selected Station number to be used in Reservation class
                    this.selectedStationNumber = station.number; 
                });           
            })
        }.bind(this));  
    }  
}


