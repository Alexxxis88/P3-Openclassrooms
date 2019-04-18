
// ------------------------------------- //
// ---------------- Map ---------------- //
// ------------------------------------- //


class Map {
    constructor(id, coordinates, osmTemplate){
        this.mapId = id; // Là où la carte sera implémentée
        this.coordinates = coordinates; //Coordonées centrale de la map
        this.osmTemplate = osmTemplate; //template OpenStreetMap pour la map à instancier
        
        //Code à suivre fourni par la doc JCdecaux
        this.mymap = L.map(this.mapId).setView(this.coordinates, 15);
        this.tileLayer = L.tileLayer(this.osmTemplate, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,}).addTo(this.mymap);
        
         // a dégager, mais ici pour comprendre pourquoi ça marche dans map et pas dans stations au même endroit
//        let marker = L.marker([47.2172500, -1.5533600]).addTo(this.mymap);
    }
}




let biclooMap = new Map("biclooMap",[47.2172500, -1.5533600],"http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png");
