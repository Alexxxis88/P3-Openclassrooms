
// ------------------------------------- //
// ------------- Header ---------------- //
// ------------------------------------- //

//scroll fluide

$(document).ready(function() {
		$(".js-scrollTo").on("click", function() { // Au clic sur un élément
			let section = $(this).attr("href"); // Section cible
			let speed = 750; // Durée de l'animation (en ms)
			$("html, body").animate( { scrollTop: $(section).offset().top }, speed ); // le défilement s'opère
			return;
		});
	});



// Menu burger
function myFunction(x) {   // changer l'affichage du bouton
  x.classList.toggle("change");  
}

$("#burgerMenu").on("click", () => { // afficher / masquer le menu
   $("#burgerNav").toggle();
});


// ------------------------------------- //
// -------------Diaporama -------------- //
// ------------------------------------- //

// Instanciation du Diaporama
let Slider = new Diaporama("imagesCarousel",[
        "img/pic1.jpg",
        "img/pic2.jpg",
        "img/pic3.jpg",
        "img/pic4.jpg",
        "img/pic5.jpg"
        ]);


// ------------------------------------- //
// ---------------- Map ---------------- //
// ------------------------------------- //

// Instanciation de la Map

let biclooMap = new Map("biclooMap",[47.2172500, -1.5533600],"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png");


// ------------------------------------- //
// -------------- Station -------------- //
// ------------------------------------- //


// Instanciation de l'objet Stations

let biclooStations = new Stations("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooMap);

// ------------------------------------- //
// ------------ Reservation ------------ //
// ------------------------------------- //


// Instanciation de l'objet Reservation

let reservation = new Reservation("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81")


// ------------------------------------- //
// --------- Gestion du Storage -------- //
// ------------------------------------- //

//Sauvegarde du prénom et nom
$("#first_name" ).keyup( function() {
 localStorage.setItem("LSfirstName", $("#first_name" ).val());
});


if (localStorage.getItem("LSfirstName")){
     document.getElementById("first_name").value = localStorage.getItem("LSfirstName"); 
    //pour $("#first_name" ).val() ne marche pas a la place de document.getElementById("first_name").value
}



$("#last_name" ).keyup( function() {
 localStorage.setItem("LSlastName", $("#last_name").val());
});


if (localStorage.getItem("LSlastName") ){
     document.getElementById("last_name").value = localStorage.getItem("LSlastName"); 
    //pour $("#first_name" ).val() ne marche pas a la place de document.getElementById("first_name").value
}


