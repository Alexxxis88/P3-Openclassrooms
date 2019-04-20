class Map{
    constructor(id, coordinates, osmTemplate, apiURL, contractName, apiKey){
        
        //Info de la map
        this.mapId = id; // Là où la carte sera implémentée
        this.coordinates = coordinates; //Coordonées centrale de la map
        this.osmTemplate = osmTemplate; //template OpenStreetMap pour la map à instancier
        this.apiURL = apiURL;
        this.contractName = contractName;
        this.apiKey = apiKey;
           
        this.mymap = L.map(this.mapId).setView(this.coordinates, 15);
        this.tileLayer = L.tileLayer(this.osmTemplate, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,}).addTo(this.mymap);
        
       
        
                
          ajaxGet(this.apiURL + "contract=" + this.contractName + "&apiKey=" + this.apiKey, function (data){
            let allStations = JSON.parse(data);
            allStations.forEach((station) => {
                    let marker = L.marker([station.position.lat, station.position.lng]).addTo(this.mymap)   
                })               
        }.bind(this));
    }
}


let biclooMap = new Map("biclooMap",[47.2172500, -1.5533600],"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://api.jcdecaux.com/vls/v1/stations?", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81");
