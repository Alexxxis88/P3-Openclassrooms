// ------------------------------------- //
// -------------- Stations ------------- //
// ------------------------------------- //


class Stations {
    constructor(id, apiURL, contractName, apiKey, mymap){
        this.stationsId = id;
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
        this.mymap = mymap;
       
        
        // Code pour récupérer les informations de toutes les stations 
        ajaxGet(this.apiURL + "contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data) { 
            let allStations = JSON.parse(data); 
            for (let station of allStations){
                 name = station.name; // pourquoi ça marche quand je ne mets pas let ? 
                let address = station.address;
                 status = station.status; // pourquoi ça marche quand je ne mets pas let ? 
                let bikeStands = station.bike_stands;
                let availableBikes = station.available_bikes;
                let latitude = station.position.lat;
                let longitude = station.position.lng;
                
                
                let marker = L.marker([47.2172500, -1.5533600]).addTo(this.mymap)
                
//                //code de test pour voir que je récupère bien les infos des stations depuis l'API
//                 console.log( `La station ${name} située ${address} (coordonées : lat = ${latitude} - long = ${longitude}) est ${status}. 
//                      \n Elle dispose de ${bikeStands} rangements et ${availableBikes} vélo(s) sont disponible(s).`)
                
            }   console.log(this.mymap)
        }.bind(this));
    }  
}


let biclooStations = new Stations("biclooMap", "https://api.jcdecaux.com/vls/v1/stations?", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooMap);

