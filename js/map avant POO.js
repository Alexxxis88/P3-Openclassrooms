
// ------------------------------------- //
// ---------------- Map ---------------- //
// ------------------------------------- //


// Code type fourni par tuto Leaflet

let mymap = L.map('biclooMap').setView([47.2172500, -1.5533600], 15);

L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png	', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
    
}).addTo(mymap);






// Code pour récupérer les informations de toutes les stations 

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=ddcc1734e8c4df93e09e6924487d563bce7edc81", function (data) { 
	let stations = JSON.parse(data); 
    for (let station of stations){
        name = station.name;
        address = station.address;
        status = station.status;
        bikeStands = station.bike_stands;
        availableBikes = station.available_bikes;
        latitude = station.position.lat;
        longitude = station.position.lng;
           
    // Créé les marqueurs    
        marker = L.marker([latitude, longitude]).addTo(mymap);
        
//    // Vérification des informations récupérer. A SUPPRIMER    
//        console.log( `La station ${name} située ${address} (coordonées : lat = ${latitude} - long = ${longitude}) est ${this.status}. 
//                      \n Elle dispose de ${bikeStands} rangements et ${availableBikes} vélo(s) sont disponibles.`)
    }    
});















// ----------- tuto leaflet création d'un marker
// Marker type pour nantes
// let markerNantes = L.marker([47.2172500, -1.5533600]).addTo(mymap);


// l'objet market doit ête du type ?
// let marker = L.marker([this.lat, this.lng]).addTo(mymap);




/* code pour chaque station gérée une par une

// Accès a lat et lng de la station 10 PICASSO ( lat 47.216207 - lng -1.533796)

ajaxGet("https://api.jcdecaux.com/vls/v1/stations/10?contract=Nantes&apiKey=ddcc1734e8c4df93e09e6924487d563bce7edc81", function (data) { 
	let station10 = JSON.parse(data); 
	// Récupération de lat et lng 
	let latitude = station10.position.lat; 
	let longitude = station10.position.lng; 
 	// Affichage des résultats 
	console.log(latitude);
	
    let marker10 = L.marker([latitude, longitude]).addTo(mymap);
   
});


// Accès a lat et lng de la station 38 RICORDEAU ( lat 47.2121084631418 - lng -1.55304912932047)

ajaxGet("https://api.jcdecaux.com/vls/v1/stations/38?contract=Nantes&apiKey=ddcc1734e8c4df93e09e6924487d563bce7edc81", function (data) { 
	let station38 = JSON.parse(data); 
	// Récupération de lat et lng 
	let latitude = station38.position.lat; 
	let longitude = station38.position.lng; 
 	// Affichage des résultats 
	console.log(latitude);
	
    let marker38 = L.marker([latitude, longitude]).addTo(mymap);

    
});
*/
