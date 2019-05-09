
// ------------------------------------- //
// ------------- Header ---------------- //
// ------------------------------------- //

//Scroll fluide

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
        ],
        [
        "Bicloo - Réservez votre vélo à Nantes !",
        "Naviguez sur la carte et choisissez une station",
        "Vérifiez le nombre de vélos disponibles",
        "Réservez, signez...",
        "Roulez !"
        ]
                          );


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

let reservation = new Reservation("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooStations)



// ------------------------------------- //
// --------------- Canvas --------------- //
// ------------------------------------- //


// Instanciation de l'objet Canvas

let myCanvas = new Canvas(); 
myCanvas.init();


// ------------------------------------- //
// --------------- Timer --------------- //
// ------------------------------------- //


// Instanciation de l'objet Timer

let timer = new Timer("resaTimer", 1200); 




// ------------------------------------- //
// --------- Gestion du Storage -------- //
// ------------------------------------- //

//Sauvegarde du prénom et nom
$("#first_name" ).keyup( function() {
 localStorage.setItem("LSfirstName", $("#first_name" ).val());
});


if (localStorage.getItem("LSfirstName")){
     document.getElementById("first_name").value = localStorage.getItem("LSfirstName"); 
    //pourquoi $("#first_name" ).val() ne marche pas a la place de document.getElementById("first_name").value
}


$("#last_name" ).keyup( function() {
 localStorage.setItem("LSlastName", $("#last_name").val());
});


if (localStorage.getItem("LSlastName") ){
     document.getElementById("last_name").value = localStorage.getItem("LSlastName"); 
    //pourquoi $("#first_name" ).val() ne marche pas a la place de document.getElementById("first_name").value
}


//Si on a déja une réservation en cours dans sessionStorage
if (sessionStorage.getItem("SSstationName") && 
    sessionStorage.getItem("SSavailableBike") &&
    localStorage.getItem("LSfirstName") &&
    localStorage.getItem("LSlastName") &&
    sessionStorage.getItem("SStimer")){  

    
    //le timer continue à décompter a partir de sa dernier valeur
    timer.counter = sessionStorage.getItem("SStimer"); // le timer prends la dernière valeur enregistré dans le SS
    document.getElementById("resaTimer").innerHTML =  timer.remainingTime // on affiche cette valeur comme valeur intial pour relancer le décompte
    timer.startTimer(); // on relance le décompte

    
    //Ajout des infos de sessionStorage dans la section "Ma réservation"
    document.getElementById("resaName").innerHTML = "";
    document.getElementById("resaName").innerHTML = "Bonjour " + localStorage.getItem("LSfirstName").toUpperCase().bold() + " " + localStorage.getItem("LSlastName").toUpperCase().bold() //rajouter.bold() a checker  sur autre navigateurs
    document.getElementById("resaStation").innerHTML = "";
    document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + sessionStorage.getItem("SSstationName").bold();
    document.getElementById("resaTimerText").innerHTML = "";
    document.getElementById("resaTimerText").innerHTML = "Votre réservation expirera dans&nbsp;"; //rajouter.bold() a checker  sur autre navigateurs
    $(".footerBtn").css("display", "block");       
}




// ------------------------------------- //
// ----- Modal Box Mentios Légales ----- //
// ------------------------------------- //

//pas de Jquerry car WINDOW n'est pas selectionnable en Jquery
const modal = document.getElementById("myModal");
const btn = document.getElementById("legalNotice");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
