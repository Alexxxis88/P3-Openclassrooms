
// ------------------------------------- //
// ---------------- Map ---------------- //
// ------------------------------------- //

class Map {
    constructor(id, coordinates, osmTemplate){
        this.mapId = id;
        this.coordinates = coordinates;
        this.osmTemplate = osmTemplate;
        
        //Code provided by JCDecaux documentation
        this.mapTemplate = L.map(this.mapId).setView(this.coordinates, 15);
        this.tileLayer = L.tileLayer(this.osmTemplate, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,}).addTo(this.mapTemplate);     
    }
}





